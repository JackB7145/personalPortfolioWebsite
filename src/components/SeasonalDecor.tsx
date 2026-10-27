'use client';

import { useMemo } from 'react';
import { useTime } from '../app/contexts/TimeContext';
import { FaSleigh } from 'react-icons/fa';
import { GiDeer, GiSparkles } from 'react-icons/gi';
import { EVENT_DECOR, SEASON_DECOR, type DecorTheme, type Particle } from '../lib/decor';

// Santa flies over in the last few days before Christmas.
const SANTA_DAYS = 3;

/** Santa's sleigh and reindeer crossing the sky, trailing sparkles. */
function SantaFlyover({ isMobile }: { isMobile: boolean }) {
  const deer = isMobile ? 26 : 36;
  return (
    <div className="santa-flyover">
      <div className="santa-team">
        <GiSparkles className="santa-trail" size={deer * 0.6} color="#fde047" />
        <FaSleigh size={deer * 1.2} color="#dc2626" />
        <GiDeer size={deer} color="#92400e" />
        <GiDeer size={deer} color="#a16207" />
      </div>
    </div>
  );
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

function pickWeighted(particles: Particle[]) {
  const total = particles.reduce((n, p) => n + p.weight, 0);
  let r = Math.random() * total;
  for (const p of particles) {
    r -= p.weight;
    if (r <= 0) return p;
  }
  return particles[particles.length - 1];
}

// Travel and sway durations (seconds) per motion type.
const DURATION = {
  fall: [14, 24],
  rain: [1.6, 2.8],
  rise: [18, 30],
  drift: [16, 28],
} as const;

/** The decor for the active holiday if there is one, else the season's. */
export function useDecorTheme(): DecorTheme {
  const { season, event } = useTime();
  return event ? EVENT_DECOR[event.id] : SEASON_DECOR[season];
}

/**
 * Fixed, non-interactive decoration layer: floating icons (leaves, rain, snow,
 * bats, hearts, …) plus edge scenery (trees, webs, pumpkins) for the current
 * season or holiday. Sits behind page content.
 */
export function SeasonalDecor({ isMobile = false }: { isMobile?: boolean }) {
  const { now, season, event, override } = useTime();
  const mounted = now !== null;
  const theme = useDecorTheme();
  const showSanta =
    event?.id === 'christmas' &&
    (override.event === 'christmas' || (event.daysUntil >= 0 && event.daysUntil <= SANTA_DAYS));
  const key = event?.id ?? season;

  const sprites = useMemo(() => {
    if (!mounted) return [];
    const count = Math.round(isMobile ? theme.count / 2 : theme.count);
    return Array.from({ length: count }, (_, i) => {
      const p = pickWeighted(theme.particles);
      const [minDur, maxDur] = DURATION[p.motion];
      const dur = rand(minDur, maxDur);
      return {
        key: `${key}-${i}`,
        Icon: p.Icon,
        motion: p.motion,
        // Drifters cross in either direction.
        dir: Math.random() < 0.5 ? 'ltr' : 'rtl',
        color: pick(p.colors),
        size: Math.round(rand(p.size[0], p.size[1])),
        style: {
          left: `${rand(0, 100)}%`,
          '--y': `${rand(8, 85)}vh`,
          '--drift': `${rand(-60, 60)}px`,
          '--spin': `${rand(-200, 200)}deg`,
          animationDuration: `${dur}s`,
          // Negative delay so icons are already spread across the screen on load.
          animationDelay: `${-rand(0, dur)}s`,
        } as React.CSSProperties,
        swayDur: `${rand(3, 6)}s`,
      };
    });
  }, [mounted, key, theme, isMobile]);

  if (!mounted) return null;

  return (
    <div aria-hidden="true" className="season-layer">
      {showSanta && <SantaFlyover isMobile={isMobile} />}
      {theme.scenery
        .filter((s) => !(isMobile && s.desktopOnly))
        .map((s, i) => (
          <div
            key={`${key}-scenery-${i}`}
            className="season-scenery"
            style={{
              ...s.at,
              transform: `${s.flip ? 'scaleX(-1) ' : ''}rotate(${s.rotate ?? 0}deg)`,
            }}
          >
            <s.Icon size={isMobile ? Math.round(s.size * 0.7) : s.size} color={s.color} />
          </div>
        ))}
      {sprites.map((s) => (
        <div
          key={s.key}
          className="season-sprite"
          data-motion={s.motion}
          data-dir={s.motion === 'drift' ? s.dir : undefined}
          style={s.style}
        >
          <div className="season-sway" style={{ animationDuration: s.swayDur }}>
            <s.Icon size={s.size} color={s.color} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeasonalDecor;
