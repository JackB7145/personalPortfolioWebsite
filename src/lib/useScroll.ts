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

/**
 * Tracks a continuous "morph position" across the page's named sections.
 *
 * Given an ordered list of element ids, this returns a ref whose value is a
 * float in [0, sectionIds.length - 1]: an integer when a section is centered
 * in the viewport, and a fractional value while scrolling between two
 * sections. A three.js loop reads `ref.current` every frame to lerp the
 * particle cloud between per-section target shapes without re-rendering React.
 */
export function useSectionMorphRef(sectionIds: string[]) {
  const ref = useRef(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // Anchor the "active" point near the upper third of the viewport rather
      // than its exact center. This makes each section's shape form as it
      // ENTERS the viewport (while its heading/content is still being read)
      // instead of only once you have scrolled it past center.
      const viewportAnchor = window.scrollY + window.innerHeight * 0.34;

      // Collect a reference point for each section. We use a point near the
      // top of the section (not its center) so a tall full-height section
      // like the hero resolves to its shape immediately and holds it while
      // the user reads, rather than requiring a scroll past the midpoint.
      const centers: number[] = [];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) {
          centers.push(Number.NaN);
          continue;
        }
        const rect = el.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        // Anchor 30% down into the section.
        centers.push(top + rect.height * 0.3);
      }

      // Degenerate case: nothing measurable yet.
      const valid = centers.filter((c) => !Number.isNaN(c));
      if (valid.length === 0) return;

      // Before the first / after the last section, clamp to the ends.
      if (viewportAnchor <= centers[0]) {
        ref.current = 0;
        return;
      }
      const last = centers.length - 1;
      if (viewportAnchor >= centers[last]) {
        ref.current = last;
        return;
      }

      // Find the pair of sections the anchor sits between and
      // interpolate the fractional index.
      for (let i = 0; i < last; i++) {
        const a = centers[i];
        const b = centers[i + 1];
        if (Number.isNaN(a) || Number.isNaN(b)) continue;
        if (viewportAnchor >= a && viewportAnchor <= b) {
          const span = b - a || 1;
          ref.current = i + (viewportAnchor - a) / span;
          return;
        }
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // Sections mount after data loads, so re-measure shortly after mount.
    const t = window.setTimeout(update, 500);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(t);
      if (frame) window.cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return ref;
}
