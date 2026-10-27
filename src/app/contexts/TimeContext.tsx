'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  getSeason,
  getTimeTheme,
  type Season,
  type TimeTheme,
} from '../../lib/timeTheme';
import {
  getActiveEvent,
  getEventById,
  isEventId,
  type ActiveEvent,
  type EventId,
} from '../../lib/events';

export type TimeOverride = {
  theme?: TimeTheme;
  season?: Season;
  // A specific event, 'none' to suppress events, or undefined to follow the date.
  event?: EventId | 'none';
  // Pretend "now" is this far (ms) from the real clock; drives everything above.
  offsetMs?: number;
};

type TimeContextValue = {
  // null until mounted so server and first client render match.
  now: Date | null;
  theme: TimeTheme;
  season: Season;
  event: ActiveEvent | null;
  // Manual overrides (URL params or the dev picker); undefined = follow the clock.
  override: TimeOverride;
  setOverride: (o: TimeOverride) => void;
};

const TimeContext = createContext<TimeContextValue>({
  now: null,
  theme: 'dark',
  season: 'fall',
  event: null,
  override: {},
  setOverride: () => {},
});

/**
 * Ticks the visitor's local clock once a second and derives the light/dark
 * theme, current season, and any nearby holiday event from it. Keeps
 * <html class="light"> + data-season in sync so CSS (and the boot script's
 * first-paint guess) follow the live clock.
 */
export function TimeProvider({ children }: { children: React.ReactNode }) {
  const [realNow, setRealNow] = useState<Date | null>(null);
  // Optional preview overrides, e.g. /?theme=dark&season=winter&event=halloween
  // or /?date=2026-12-31T23:59 to simulate a moment in time.
  const [override, setOverride] = useState<TimeOverride>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('theme');
    const s = params.get('season');
    const e = params.get('event');
    const d = params.get('date');
    const simulated = d ? new Date(d).getTime() : NaN;
    setOverride({
      theme: t === 'light' || t === 'dark' ? t : undefined,
      season: s === 'spring' || s === 'summer' || s === 'fall' || s === 'winter' ? s : undefined,
      event: e === 'none' ? 'none' : isEventId(e) ? e : undefined,
      offsetMs: Number.isNaN(simulated) ? undefined : simulated - Date.now(),
    });
    setRealNow(new Date());
    const id = window.setInterval(() => setRealNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const now =
    realNow && override.offsetMs ? new Date(realNow.getTime() + override.offsetMs) : realNow;

  const theme = override.theme ?? (now ? getTimeTheme(now) : 'dark');
  const season = override.season ?? (now ? getSeason(now) : 'fall');
  const event =
    !now || override.event === 'none'
      ? null
      : override.event
        ? getEventById(override.event, now)
        : getActiveEvent(now);

  const mounted = now !== null;
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    root.dataset.season = season;
  }, [mounted, theme, season]);

  return (
    <TimeContext.Provider value={{ now, theme, season, event, override, setOverride }}>
      {children}
    </TimeContext.Provider>
  );
}

export function useTime() {
  return useContext(TimeContext);
}
