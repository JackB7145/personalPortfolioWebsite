'use client';

import { useTime } from '../app/contexts/TimeContext';
import { eventMessage } from '../lib/events';
import { useDecorTheme } from './SeasonalDecor';

const SEASON_LABEL = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
} as const;

const pad = (n: number) => n.toString().padStart(2, '0');

/**
 * Small digital clock showing the visitor's local time with a season/holiday
 * icon. When a holiday is near, a pill underneath counts down to it.
 */
export function DigitalClock() {
  const { now, season, theme, event } = useTime();
  const { badge } = useDecorTheme();

  // Render a fixed-width placeholder until mounted to avoid hydration drift.
  if (!now) return <div className="digital-clock opacity-0" aria-hidden="true">00:00:00</div>;

  const h24 = now.getHours();
  const h12 = h24 % 12 || 12;
  const time = `${pad(h12)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const ampm = h24 < 12 ? 'AM' : 'PM';
  const label = event ? event.name : SEASON_LABEL[season];

  return (
    <div className="relative">
      <div
        className="digital-clock"
        role="timer"
        aria-label={`Local time ${time} ${ampm}, ${label}, ${theme} mode`}
        title={`${label} · ${theme === 'light' ? 'Day' : 'Night'} mode`}
      >
        <badge.Icon size={16} color={badge.color} aria-hidden="true" />
        <span className="digital-clock-time">{time}</span>
        <span className="digital-clock-ampm">{ampm}</span>
      </div>
      {event && (
        <div className="event-pill" role="status">
          <badge.Icon size={13} color={badge.color} aria-hidden="true" />
          {eventMessage(event, now)}
        </div>
      )}
    </div>
  );
}

export default DigitalClock;
