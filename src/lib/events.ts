/**
 * Holiday "events" that take over the seasonal decorations when the visitor's
 * local date is near them. Each event has a window of days before (and
 * optionally after) its date during which it is active.
 */
export type EventId =
  | 'newYear'
  | 'lunarNewYear'
  | 'valentines'
  | 'stPatricks'
  | 'easter'
  | 'canadaDay'
  | 'thanksgivingCA'
  | 'halloween'
  | 'thanksgivingUS'
  | 'christmas';

type EventDef = {
  id: EventId;
  name: string;
  // Distinguishes same-named events in the dev picker.
  label?: string;
  // Local calendar date of the event for a given year (month is 0-based).
  dateFor: (year: number) => Date;
  daysBefore: number;
  daysAfter: number;
};

export type ActiveEvent = {
  id: EventId;
  name: string;
  date: Date;
  // Whole local days until the event (0 = today, negative = after it).
  daysUntil: number;
};

const DAY_MS = 86_400_000;

// How many days ahead of a holiday its decorations and countdown appear.
export const PROXIMITY_DAYS = 10;

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const daysBetween = (from: Date, to: Date) =>
  Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / DAY_MS);

// nth (1-based) given weekday (0 = Sun) of a month; n = -1 for the last one.
function nthWeekday(year: number, month: number, weekday: number, n: number) {
  if (n > 0) {
    const first = new Date(year, month, 1).getDay();
    return new Date(year, month, 1 + ((weekday - first + 7) % 7) + (n - 1) * 7);
  }
  const lastDate = new Date(year, month + 1, 0);
  const back = (lastDate.getDay() - weekday + 7) % 7;
  return new Date(year, month, lastDate.getDate() - back);
}

// Western Easter Sunday (Anonymous Gregorian algorithm).
function easterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// Lunar New Year follows the lunisolar calendar; table covers the site's
// foreseeable lifetime. Years outside it simply skip the event.
const LUNAR_NEW_YEAR: Record<number, [number, number]> = {
  2025: [0, 29],
  2026: [1, 17],
  2027: [1, 6],
  2028: [0, 26],
  2029: [1, 13],
  2030: [1, 3],
  2031: [0, 23],
  2032: [1, 11],
  2033: [0, 31],
  2034: [1, 19],
  2035: [1, 8],
};

export const EVENTS: EventDef[] = [
  // Keyed on Dec 31 so the countdown runs to midnight; "after" covers Jan 1–2.
  { id: 'newYear', name: "New Year's", dateFor: (y) => new Date(y, 11, 31), daysBefore: PROXIMITY_DAYS, daysAfter: 2 },
  {
    id: 'lunarNewYear',
    name: 'Lunar New Year',
    dateFor: (y) => {
      const md = LUNAR_NEW_YEAR[y];
      return md ? new Date(y, md[0], md[1]) : new Date(NaN);
    },
    daysBefore: PROXIMITY_DAYS,
    daysAfter: 3,
  },
  { id: 'valentines', name: "Valentine's Day", dateFor: (y) => new Date(y, 1, 14), daysBefore: PROXIMITY_DAYS, daysAfter: 0 },
  { id: 'stPatricks', name: "St. Patrick's Day", dateFor: (y) => new Date(y, 2, 17), daysBefore: PROXIMITY_DAYS, daysAfter: 0 },
  { id: 'easter', name: 'Easter', dateFor: easterSunday, daysBefore: PROXIMITY_DAYS, daysAfter: 1 },
  { id: 'canadaDay', name: 'Canada Day', dateFor: (y) => new Date(y, 6, 1), daysBefore: PROXIMITY_DAYS, daysAfter: 0 },
  // Canadian Thanksgiving: 2nd Monday of October.
  { id: 'thanksgivingCA', name: 'Thanksgiving', label: 'Thanksgiving (CA)', dateFor: (y) => nthWeekday(y, 9, 1, 2), daysBefore: PROXIMITY_DAYS, daysAfter: 0 },
  { id: 'halloween', name: 'Halloween', dateFor: (y) => new Date(y, 9, 31), daysBefore: PROXIMITY_DAYS, daysAfter: 0 },
  // US Thanksgiving: 4th Thursday of November.
  { id: 'thanksgivingUS', name: 'Thanksgiving', label: 'Thanksgiving (US)', dateFor: (y) => nthWeekday(y, 10, 4, 4), daysBefore: PROXIMITY_DAYS, daysAfter: 0 },
  { id: 'christmas', name: 'Christmas', dateFor: (y) => new Date(y, 11, 25), daysBefore: PROXIMITY_DAYS, daysAfter: 0 },
];

const EVENT_BY_ID = Object.fromEntries(EVENTS.map((e) => [e.id, e])) as Record<EventId, EventDef>;

// Nearest occurrence of an event (this, last, or next year) relative to `now`.
function nearestOccurrence(def: EventDef, now: Date) {
  let best: { date: Date; daysUntil: number } | null = null;
  for (const y of [now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1]) {
    const date = def.dateFor(y);
    if (Number.isNaN(date.getTime())) continue;
    const daysUntil = daysBetween(now, date);
    if (!best || Math.abs(daysUntil) < Math.abs(best.daysUntil)) best = { date, daysUntil };
  }
  return best;
}

/** The event whose window contains `now`, preferring the closest one. */
export function getActiveEvent(now: Date): ActiveEvent | null {
  let best: ActiveEvent | null = null;
  for (const def of EVENTS) {
    const occ = nearestOccurrence(def, now);
    if (!occ) continue;
    const inWindow = occ.daysUntil <= def.daysBefore && occ.daysUntil >= -def.daysAfter;
    if (!inWindow) continue;
    if (!best || Math.abs(occ.daysUntil) < Math.abs(best.daysUntil)) {
      best = { id: def.id, name: def.name, ...occ };
    }
  }
  return best;
}

/** Forces a specific event (dev picker / URL), using its next occurrence. */
export function getEventById(id: EventId, now: Date): ActiveEvent | null {
  const def = EVENT_BY_ID[id];
  if (!def) return null;
  const occ = nearestOccurrence(def, now);
  return occ ? { id: def.id, name: def.name, ...occ } : null;
}

export const isEventId = (v: string | null): v is EventId =>
  v !== null && v in EVENT_BY_ID;

const pad = (n: number) => n.toString().padStart(2, '0');

/**
 * Short banner text for an active event, e.g. "Halloween in 5 days",
 * "Happy Halloween!", or a live "2027 in 03:12:44" countdown on Dec 31.
 */
export function eventMessage(ev: ActiveEvent, now: Date): string {
  if (ev.id === 'newYear') {
    const nextYear = ev.date.getFullYear() + 1;
    if (ev.daysUntil < 0) return `Happy New Year ${nextYear}!`;
    if (ev.daysUntil === 0) {
      const midnight = new Date(nextYear, 0, 1).getTime();
      const s = Math.max(0, Math.floor((midnight - now.getTime()) / 1000));
      return `${nextYear} in ${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
    }
    return `${nextYear} in ${ev.daysUntil} day${ev.daysUntil === 1 ? '' : 's'}`;
  }
  if (ev.daysUntil <= 0) return ev.id === 'christmas' ? 'Merry Christmas!' : `Happy ${ev.name}!`;
  if (ev.daysUntil === 1) return `${ev.name} is tomorrow`;
  return `${ev.name} in ${ev.daysUntil} days`;
}

export const EVENT_OPTIONS = EVENTS.map((e) => ({ id: e.id, label: e.label ?? e.name }));
