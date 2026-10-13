'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Tracks overall page scroll as a 0 → 1 fraction of total scrollable height,
 * plus the raw scrollY. Updates are throttled to animation frames so the
 * value is cheap enough to feed into a three.js render loop.
 */
export function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY || doc.scrollTop || 0;
      setScrollY(y);
      setProgress(max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { progress, scrollY };
}

/**
 * Returns true when the user has requested reduced motion. Used to disable
 * ambient three.js motion and heavy animations for accessibility.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * A tiny, allocation-free scroll progress ref for use inside requestAnimationFrame
 * / three.js loops where re-rendering React on every frame would be wasteful.
 */
export function useScrollProgressRef() {
  const ref = useRef(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY || doc.scrollTop || 0;
      ref.current = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
