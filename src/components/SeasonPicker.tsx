'use client';

import { useState } from 'react';
import { useTime } from '../app/contexts/TimeContext';
import { EVENT_OPTIONS, isEventId } from '../lib/events';
import type { Season, TimeTheme } from '../lib/timeTheme';

const SEASONS: Season[] = ['spring', 'summer', 'fall', 'winter'];
const THEMES: TimeTheme[] = ['light', 'dark'];

const pad = (n: number) => n.toString().padStart(2, '0');
// Format a Date for <input type="datetime-local"> in local time.
const toLocalInput = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

/**
 * Dev-only panel for previewing seasons, holidays and day/night themes without
 * waiting for the calendar. Only rendered when NEXT_PUBLIC_SEASON_PICKER=true
 * (set it in .env.local), so it never ships to the live site.
 */
export function SeasonPicker() {
  const { override, setOverride, now, event } = useTime();
  const [open, setOpen] = useState(true);

  if (process.env.NEXT_PUBLIC_SEASON_PICKER !== 'true' || !now) return null;

  const group = <T extends string>(
    name: string,
    options: T[],
    value: T | undefined,
    onChange: (v: T | undefined) => void
  ) => (
    <fieldset className="season-picker-group">
      <legend>{name}</legend>
      {(['auto', ...options] as const).map((opt) => (
        <label key={opt}>
          <input
            type="radio"
            name={`season-picker-${name}`}
            checked={(value ?? 'auto') === opt}
            onChange={() => onChange(opt === 'auto' ? undefined : (opt as T))}
          />
          {opt}
        </label>
      ))}
    </fieldset>
  );

  return (
    <div className="season-picker">
      <button
        type="button"
        className="season-picker-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? '× Dev: season & events' : '⚙ Dev'}
      </button>
      {open && (
        <>
          <fieldset className="season-picker-group">
            <legend>Simulated date</legend>
            <input
              type="datetime-local"
              value={toLocalInput(now)}
              onChange={(e) => {
                const t = new Date(e.target.value).getTime();
                if (!Number.isNaN(t)) setOverride({ ...override, offsetMs: t - Date.now() });
              }}
            />
            <button type="button" onClick={() => setOverride({ ...override, offsetMs: undefined })}>
              Now
            </button>
          </fieldset>
          <fieldset className="season-picker-group">
            <legend>Event {event ? `· ${event.name}` : ''}</legend>
            <select
              value={override.event ?? 'auto'}
              onChange={(e) => {
                const v = e.target.value;
                setOverride({
                  ...override,
                  event: v === 'none' ? 'none' : isEventId(v) ? v : undefined,
                });
              }}
            >
              <option value="auto">Auto (by date)</option>
              <option value="none">None</option>
              {EVENT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </fieldset>
          {group('Season', SEASONS, override.season, (season) =>
            setOverride({ ...override, season })
          )}
          {group('Theme', THEMES, override.theme, (theme) =>
            setOverride({ ...override, theme })
          )}
        </>
      )}
    </div>
  );
}

export default SeasonPicker;
