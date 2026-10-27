'use client';

import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  useSectionMorphRef,
  usePrefersReducedMotion,
} from '../lib/useScroll';
import {
  makeCloud,
  makeImageShape,
  makeBriefcase,
  makeCodeBrackets,
  makeNetwork,
  makeEnvelope,
  type TargetBuffer,
} from '../lib/particleShapes';
import { useTime } from '../app/contexts/TimeContext';

// Ordered to match the page sections. Index i corresponds to sectionIds[i].
const SECTION_IDS = ['hero', 'experience', 'projects', 'skills', 'contact'];

/* ----------------------------------------------------------------------------
 * MorphingPoints
 * A single persistent point cloud. Each frame it eases its live positions
 * toward the target buffer selected by the current scroll "morph index", and
 * blends toward that section's accent color. A gentle idle drift + pointer
 * parallax keeps it alive between morphs.
 * ------------------------------------------------------------------------- */
function MorphingPoints({
  count,
  targets,
  colors,
  morphRef,
  reducedMotion,
  isMobile,
  light,
}: {
  count: number;
  targets: TargetBuffer[];
  colors: THREE.Color[];
  morphRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
  light: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const { viewport } = useThree();

  // Live (animated) positions — start at the first target so there is no jump.
  const live = useMemo(() => {
    const base = targets[0] ?? makeCloud(count);
    return Float32Array.from(base);
  }, [targets, count]);

  // Scratch target we lerp the live buffer toward each frame.
  const blendTarget = useMemo(() => new Float32Array(count * 3), [count]);

  const geomRef = useRef<THREE.BufferGeometry>(null);

  // Soft circular sprite so points read as glowing dots.
  const sprite = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const tmpColorA = useMemo(() => new THREE.Color(), []);
  const tmpColorB = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    const geom = geomRef.current;
    if (!pts || !geom || targets.length === 0) return;

    // Current morph position, e.g. 1.37 → 37% between section 1 and 2.
    const m = Math.max(0, Math.min(targets.length - 1, morphRef.current));
    const i0 = Math.floor(m);
    const i1 = Math.min(targets.length - 1, i0 + 1);
    const f = m - i0;
    // Smoothstep the blend fraction for a softer settle.
    const fs = f * f * (3 - 2 * f);

    const a = targets[i0];
    const b = targets[i1];

    // Build the blended target for this frame.
    for (let k = 0; k < blendTarget.length; k++) {
      blendTarget[k] = a[k] + (b[k] - a[k]) * fs;
    }

    // Ease live positions toward the blended target. Frame-rate independent.
    const ease = 1 - Math.pow(reducedMotion ? 0.0001 : 0.0009, delta);
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let k = 0; k < arr.length; k++) {
      arr[k] += (blendTarget[k] - arr[k]) * ease;
    }
    posAttr.needsUpdate = true;

    // Blend material color between the two sections' accents.
    if (matRef.current) {
      tmpColorA.copy(colors[i0]);
      tmpColorB.copy(colors[i1]);
      tmpColorA.lerp(tmpColorB, fs);
      matRef.current.color.copy(tmpColorA);
    }

    // --- Keep shapes OUT of the reading column -----------------------------
    // Push the formed shape into a side margin and shrink it so it reads as
    // an ambient accent next to the glass content rather than behind it.
    // Alternate sides per section for visual rhythm. On mobile there is no
    // gutter, so pull it toward the bottom and shrink further.
    const sideFor = (idx: number) => (idx % 2 === 0 ? 1 : -1); // +right / -left
    const baseShift = isMobile ? 0 : viewport.width * 0.26;
    const shiftA = sideFor(i0) * baseShift;
    const shiftB = sideFor(i1) * baseShift;
    const targetX = shiftA + (shiftB - shiftA) * fs;
    const targetY = isMobile ? -viewport.height * 0.22 : 0;
    const groupScale = isMobile ? 0.6 : 0.78;

    if (reducedMotion) {
      pts.rotation.set(0, 0, 0);
      pts.position.set(targetX, targetY, 0);
      pts.scale.setScalar(groupScale);
      return;
    }

    // Ease the group toward its side position so section changes glide.
    pts.scale.setScalar(groupScale);
    const settle = 1 - Math.pow(0.02, delta);

    // Subtle idle life: tiny rotation + pointer parallax layered on the side offset.
    const t = state.clock.getElapsedTime();
    pts.rotation.z = Math.sin(t * 0.15) * 0.03;
    const px = (state.pointer.x * viewport.width) / 90;
    const py = (state.pointer.y * viewport.height) / 90;
    pts.position.x += (targetX + px - pts.position.x) * settle;
    pts.position.y += (targetY + py - pts.position.y) * settle;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[live, 3]} />
      </bufferGeometry>
      {/* Additive glow vanishes on a light page, so day mode uses normal
          blending at a higher opacity. Keyed so the blend mode recompiles. */}
      <pointsMaterial
        key={light ? 'light' : 'dark'}
        ref={matRef}
        size={0.055}
        map={sprite}
        transparent
        depthWrite={false}
        sizeAttenuation
        blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
        opacity={light ? 0.5 : 0.42}
        color={colors[0]}
      />
    </points>
  );
}

function Scene({
  morphRef,
  reducedMotion,
  isMobile,
  light,
}: {
  morphRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
  light: boolean;
}) {
  const count = isMobile ? 2200 : 3800;

  // Per-section accent colors (hero → contact).
  const colors = useMemo(
    () =>
      [
        '#f87171', // hero  – soft red (pfp)
        '#ef4444', // experience
        '#fb7185', // projects
        '#f472b6', // skills
        '#ef4444', // contact
      ].map((c) => new THREE.Color(c)),
    []
  );

  // Procedural targets are available immediately.
  const [targets, setTargets] = useState<TargetBuffer[]>(() => [
    makeCloud(count), // hero placeholder until the image loads
    makeBriefcase(count),
    makeCodeBrackets(count),
    makeNetwork(count),
    makeEnvelope(count),
  ]);

  // Load the profile photo and swap it into the hero slot once sampled.
  useEffect(() => {
    let cancelled = false;
    makeImageShape('/profilePicture.jpg', count, 9.5)
      .then((pfp) => {
        if (cancelled) return;
        setTargets((prev) => {
          const next = prev.slice();
          next[0] = pfp;
          return next;
        });
      })
      .catch(() => {
        /* keep the cloud placeholder on failure */
      });
    return () => {
      cancelled = true;
    };
  }, [count]);

  return (
    <MorphingPoints
      count={count}
      targets={targets}
      colors={colors}
      morphRef={morphRef}
      reducedMotion={reducedMotion}
      isMobile={isMobile}
      light={light}
    />
  );
}

/**
 * Full-viewport, fixed three.js particle background. Sits behind all content
 * and morphs its particle cloud into a shape for each section as the user
 * scrolls: profile photo (hero) → briefcase (experience) → code brackets
 * (projects) → network (skills) → envelope (contact).
 */
export function ParticleField({ isMobile = false }: { isMobile?: boolean }) {
  const morphRef = useSectionMorphRef(SECTION_IDS);
  const reducedMotion = usePrefersReducedMotion();
  const light = useTime().theme === 'light';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: light
          ? 'radial-gradient(circle at 50% 35%, #fff1f2 0%, #fafafa 65%)'
          : 'radial-gradient(circle at 50% 35%, #140708 0%, #000000 65%)',
        transition: 'background 0.6s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <Suspense fallback={null}>
          <Scene
            morphRef={morphRef}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
            light={light}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ParticleField;
