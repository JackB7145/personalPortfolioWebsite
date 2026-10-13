'use client';

import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgressRef, usePrefersReducedMotion } from '../lib/useScroll';

/* ----------------------------------------------------------------------------
 * Particle layer: a cloud of points distributed in a slab of 3D space.
 * Rotates and drifts slowly on its own, is pushed by scroll progress, and
 * leans gently toward the pointer for parallax. Colors are interpolated
 * between two brand tones so the field reads as "red accent on black".
 * ------------------------------------------------------------------------- */
function ParticleLayer({
  count,
  radius,
  size,
  colorA,
  colorB,
  speed,
  scrollRef,
  reducedMotion,
}: {
  count: number;
  radius: number;
  size: number;
  colorA: string;
  colorB: string;
  speed: number;
  scrollRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  // Build positions + per-point colors once.
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cA = new THREE.Color(colorA);
    const cB = new THREE.Color(colorB);
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute in a flattened spherical shell for depth without a hard edge.
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6; // flatten vertically
      positions[i3 + 2] = r * Math.cos(phi);

      tmp.copy(cA).lerp(cB, Math.random());
      colors[i3] = tmp.r;
      colors[i3 + 1] = tmp.g;
      colors[i3 + 2] = tmp.b;
    }
    return { positions, colors };
  }, [count, radius, colorA, colorB]);

  // Soft circular sprite so points render as glowing dots, not squares.
  const sprite = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.25, 'rgba(255,255,255,0.85)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const scroll = scrollRef.current; // 0 → 1

    if (reducedMotion) {
      // Static but still responds to scroll position (no continuous animation).
      pts.rotation.y = scroll * Math.PI * 0.5;
      pts.position.z = scroll * 4;
      return;
    }

    const t = state.clock.getElapsedTime();
    // Continuous slow spin + scroll-driven acceleration.
    pts.rotation.y += delta * speed;
    pts.rotation.x = Math.sin(t * 0.1) * 0.08 + scroll * 0.4;

    // Pull the field toward the camera as the user scrolls (depth travel).
    pts.position.z = scroll * 6;

    // Gentle pointer parallax (pointer is normalized -1..1 by R3F).
    const px = (state.pointer.x * viewport.width) / 40;
    const py = (state.pointer.y * viewport.height) / 40;
    pts.position.x += (px - pts.position.x) * 0.03;
    pts.position.y += (py - pts.position.y) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        map={sprite}
        vertexColors
        transparent
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </points>
  );
}

function Scene({
  scrollRef,
  reducedMotion,
  isMobile,
}: {
  scrollRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  // Scale particle density to the device to keep mobile smooth.
  const near = isMobile ? 900 : 2600;
  const far = isMobile ? 600 : 1600;

  return (
    <>
      {/* Deep, cool starfield for depth */}
      <ParticleLayer
        count={far}
        radius={18}
        size={0.06}
        colorA="#3f3f46"
        colorB="#71717a"
        speed={0.015}
        scrollRef={scrollRef}
        reducedMotion={reducedMotion}
      />
      {/* Nearer brand-colored accent field */}
      <ParticleLayer
        count={near}
        radius={11}
        size={0.09}
        colorA="#ef4444"
        colorB="#f87171"
        speed={0.03}
        scrollRef={scrollRef}
        reducedMotion={reducedMotion}
      />
    </>
  );
}

/**
 * Full-viewport, fixed three.js particle background. Sits behind all content
 * (pointer-events: none) and reacts to scroll + pointer. Automatically throttles
 * on mobile and honors prefers-reduced-motion.
 */
export function ParticleField({ isMobile = false }: { isMobile?: boolean }) {
  const scrollRef = useScrollProgressRef();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'radial-gradient(circle at 50% 30%, #140708 0%, #000000 60%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <Suspense fallback={null}>
          <Scene scrollRef={scrollRef} reducedMotion={reducedMotion} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ParticleField;
