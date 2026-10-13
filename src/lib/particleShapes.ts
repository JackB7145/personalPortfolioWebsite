/**
 * Particle target-shape generation.
 *
 * The particle background keeps ONE persistent set of N particles and morphs
 * them between a series of "target" position buffers, one per page section.
 * Every target is a Float32Array of length N*3 (xyz per particle) laid out in
 * the same particle order, so morphing is a straight per-component lerp.
 *
 * Shapes live roughly within a [-6, 6] box on x/y with small z depth so they
 * read cleanly against the camera at z≈14.
 */

export type TargetBuffer = Float32Array;

/** Deterministic PRNG so shapes are stable across renders (no SSR mismatch). */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fill any leftover particles (beyond `used`) with a diffuse ambient cloud. */
function fillRemainder(
  buf: Float32Array,
  used: number,
  count: number,
  rng: () => number
) {
  for (let i = used; i < count; i++) {
    const i3 = i * 3;
    const r = 9 + rng() * 6;
    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(2 * rng() - 1);
    buf[i3] = r * Math.sin(phi) * Math.cos(theta);
    buf[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    buf[i3 + 2] = r * Math.cos(phi) - 4;
  }
}

/** A loose spherical cloud used as the ambient / intro state. */
export function makeCloud(count: number): TargetBuffer {
  const rng = mulberry32(1);
  const buf = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = 7 * Math.cbrt(rng());
    const theta = rng() * Math.PI * 2;
    const phi = Math.acos(2 * rng() - 1);
    buf[i3] = r * Math.sin(phi) * Math.cos(theta);
    buf[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    buf[i3 + 2] = r * Math.cos(phi);
  }
  return buf;
}

/**
 * Sample an image into a particle buffer. Pixels brighter than `threshold`
 * become candidate positions; we pick `count` of them (weighted by luminance)
 * and map image space to a centered square in world units.
 *
 * Must run in the browser (uses canvas). Returns a Promise.
 */
export function makeImageShape(
  src: string,
  count: number,
  worldSize = 9
): Promise<TargetBuffer> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Downscale to a manageable sampling grid.
      const SAMPLE = 120;
      const canvas = document.createElement('canvas');
      canvas.width = SAMPLE;
      canvas.height = SAMPLE;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        reject(new Error('no 2d context'));
        return;
      }
      // Cover-fit the (square-ish) image into the sample grid.
      ctx.drawImage(img, 0, 0, SAMPLE, SAMPLE);
      const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE);

      // Build a list of bright candidate pixels.
      const candidates: { x: number; y: number; w: number }[] = [];
      for (let y = 0; y < SAMPLE; y++) {
        for (let x = 0; x < SAMPLE; x++) {
          const p = (y * SAMPLE + x) * 4;
          const lum = (data[p] * 0.299 + data[p + 1] * 0.587 + data[p + 2] * 0.114) / 255;
          const alpha = data[p + 3] / 255;
          const w = lum * alpha;
          if (w > 0.18) candidates.push({ x, y, w });
        }
      }

      const buf = new Float32Array(count * 3);
      const rng = mulberry32(42);

      if (candidates.length === 0) {
        resolve(makeCloud(count));
        return;
      }

      const half = worldSize / 2;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Pick a random candidate (uniform is fine; dense areas have more
        // candidates so they naturally attract more particles).
        const c = candidates[(rng() * candidates.length) | 0];
        // Map pixel space → world. Flip Y (image y grows downward).
        const jitter = 0.04;
        const nx = (c.x / SAMPLE) * 2 - 1;
        const ny = (c.y / SAMPLE) * 2 - 1;
        buf[i3] = nx * half + (rng() - 0.5) * jitter;
        buf[i3 + 1] = -ny * half + (rng() - 0.5) * jitter;
        buf[i3 + 2] = (rng() - 0.5) * 0.8;
      }
      resolve(buf);
    };
    img.onerror = () => reject(new Error('image load failed: ' + src));
    img.src = src;
  });
}

/* ---------- Procedural line-art glyphs ------------------------------------
 * Each glyph is defined as a set of line segments in a [-4,4] space; we
 * distribute particles evenly along the total segment length so the outline
 * reads clearly, then scatter the remainder as ambient.
 * ------------------------------------------------------------------------ */

type Seg = [number, number, number, number]; // x1,y1,x2,y2

function makeFromSegments(count: number, segs: Seg[], seed: number): TargetBuffer {
  const rng = mulberry32(seed);
  const buf = new Float32Array(count * 3);
  const lengths = segs.map(([x1, y1, x2, y2]) => Math.hypot(x2 - x1, y2 - y1));
  const total = lengths.reduce((a, b) => a + b, 0) || 1;

  // ~85% of particles trace the glyph, rest become ambient halo.
  const used = Math.floor(count * 0.85);
  for (let i = 0; i < used; i++) {
    const i3 = i * 3;
    // Choose a segment proportional to its length.
    let r = rng() * total;
    let s = 0;
    while (s < segs.length - 1 && r > lengths[s]) {
      r -= lengths[s];
      s++;
    }
    const t = lengths[s] > 0 ? r / lengths[s] : 0;
    const [x1, y1, x2, y2] = segs[s];
    const jitter = 0.06;
    buf[i3] = x1 + (x2 - x1) * t + (rng() - 0.5) * jitter;
    buf[i3 + 1] = y1 + (y2 - y1) * t + (rng() - 0.5) * jitter;
    buf[i3 + 2] = (rng() - 0.5) * 0.6;
  }
  fillRemainder(buf, used, count, rng);
  return buf;
}

/** Briefcase outline (Experience). */
export function makeBriefcase(count: number): TargetBuffer {
  const segs: Seg[] = [
    // body
    [-3.4, -2.2, 3.4, -2.2],
    [3.4, -2.2, 3.4, 1.8],
    [3.4, 1.8, -3.4, 1.8],
    [-3.4, 1.8, -3.4, -2.2],
    // handle
    [-1.3, 1.8, -1.3, 2.8],
    [-1.3, 2.8, 1.3, 2.8],
    [1.3, 2.8, 1.3, 1.8],
    // latch line
    [-3.4, -0.1, 3.4, -0.1],
    [-0.5, -0.1, -0.5, 0.6],
    [0.5, -0.1, 0.5, 0.6],
    [-0.5, 0.6, 0.5, 0.6],
  ];
  return makeFromSegments(count, segs, 7);
}

/** Code brackets </> (Projects). */
export function makeCodeBrackets(count: number): TargetBuffer {
  const segs: Seg[] = [
    // left bracket  <
    [-1.6, 0, -3.6, 2.2],
    [-3.6, 2.2, -1.6, 0],
    [-1.6, 0, -3.6, -2.2],
    // right bracket  >
    [1.6, 0, 3.6, 2.2],
    [3.6, 2.2, 1.6, 0],
    [1.6, 0, 3.6, -2.2],
    // slash  /
    [0.9, -2.6, -0.9, 2.6],
  ];
  return makeFromSegments(count, segs, 11);
}

/** Network / constellation graph (Skills). */
export function makeNetwork(count: number): TargetBuffer {
  const rng = mulberry32(23);
  // Nodes on a loose ring + center.
  const nodes: [number, number][] = [[0, 0]];
  const ring = 7;
  for (let i = 0; i < ring; i++) {
    const a = (i / ring) * Math.PI * 2;
    nodes.push([Math.cos(a) * 3.4, Math.sin(a) * 3.0]);
  }
  // Edges: center to each node + a few along the ring.
  const segs: Seg[] = [];
  for (let i = 1; i < nodes.length; i++) {
    segs.push([nodes[0][0], nodes[0][1], nodes[i][0], nodes[i][1]]);
    const j = i === nodes.length - 1 ? 1 : i + 1;
    segs.push([nodes[i][0], nodes[i][1], nodes[j][0], nodes[j][1]]);
  }
  const buf = makeFromSegments(count, segs, 23);
  // Emphasize nodes: snap a handful of particles exactly onto node points.
  const nodeParticles = Math.min(count, nodes.length * 20);
  for (let i = 0; i < nodeParticles; i++) {
    const n = nodes[i % nodes.length];
    const i3 = i * 3;
    buf[i3] = n[0] + (rng() - 0.5) * 0.25;
    buf[i3 + 1] = n[1] + (rng() - 0.5) * 0.25;
    buf[i3 + 2] = (rng() - 0.5) * 0.4;
  }
  return buf;
}

/** Envelope outline (Contact). */
export function makeEnvelope(count: number): TargetBuffer {
  const segs: Seg[] = [
    // rectangle
    [-3.6, -2.2, 3.6, -2.2],
    [3.6, -2.2, 3.6, 2.2],
    [3.6, 2.2, -3.6, 2.2],
    [-3.6, 2.2, -3.6, -2.2],
    // flap
    [-3.6, 2.2, 0, -0.3],
    [0, -0.3, 3.6, 2.2],
  ];
  return makeFromSegments(count, segs, 31);
}
