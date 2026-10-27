export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export type TimeTheme = 'light' | 'dark';

// Light mode runs from 5:00 AM up to (not including) 5:00 PM local time.
export const DAY_START_HOUR = 5;
export const DAY_END_HOUR = 17;

export function getTimeTheme(date: Date): TimeTheme {
  const h = date.getHours();
  return h >= DAY_START_HOUR && h < DAY_END_HOUR ? 'light' : 'dark';
}

/**
 * Meteorological seasons (Northern Hemisphere), by local month:
 * Mar–May spring, Jun–Aug summer, Sep–Nov fall, Dec–Feb winter.
 */
export function getSeason(date: Date): Season {
  const m = date.getMonth(); // 0 = Jan
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 5 && m <= 7) return 'summer';
  if (m >= 8 && m <= 10) return 'fall';
  return 'winter';
}

/**
 * Inline script run in <head> before React hydrates so the correct theme and
 * season are applied on first paint (no dark→light flash). Only the `light`
 * class is toggled: the site is dark by default, and `.dark` would switch the
 * shadcn tokens away from what the site was designed against. Mirrors
 * getTimeTheme/getSeason above — keep them in sync.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var d=new Date(),h=d.getHours(),m=d.getMonth();var t=h>=${DAY_START_HOUR}&&h<${DAY_END_HOUR}?'light':'dark';var s=m>=2&&m<=4?'spring':m>=5&&m<=7?'summer':m>=8&&m<=10?'fall':'winter';var r=document.documentElement;r.classList.toggle('light',t==='light');r.dataset.season=s;}catch(e){}})();`;
