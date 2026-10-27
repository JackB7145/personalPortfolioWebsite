import type { IconType } from 'react-icons';
import {
  GiAcorn,
  GiAsianLantern,
  GiBat,
  GiBeachBall,
  GiBee,
  GiBirchTrees,
  GiButterfly,
  GiCandyCanes,
  GiChampagneCork,
  GiClover,
  GiCornucopia,
  GiCupidonArrow,
  GiDaisy,
  GiEasterEgg,
  GiFallingLeaf,
  GiFireworkRocket,
  GiFloatingGhost,
  GiFlowerPot,
  GiFlowers,
  GiFluffyCloud,
  GiGhost,
  GiHangingSpider,
  GiHearts,
  GiIceCreamCone,
  GiLadybug,
  GiLindenLeaf,
  GiMapleLeaf,
  GiMushrooms,
  GiNestEggs,
  GiOakLeaf,
  GiPalmTree,
  GiPaperLantern,
  GiPartyHat,
  GiPartyPopper,
  GiPieSlice,
  GiPineTree,
  GiPresent,
  GiPumpkin,
  GiPumpkinLantern,
  GiRabbit,
  GiRingingBell,
  GiRose,
  GiSandCastle,
  GiSeaStar,
  GiShamrock,
  GiSnowflake1,
  GiSnowflake2,
  GiSnowman,
  GiSparkles,
  GiSpiderWeb,
  GiSpiralShell,
  GiSpotedFlower,
  GiSun,
  GiSunCloud,
  GiSunglasses,
  GiUmbrella,
  GiWaterDrop,
  GiWaves,
  GiWheat,
  GiWitchFlight,
} from 'react-icons/gi';
import type { EventId } from './events';
import type { Season } from './timeTheme';

/**
 * How a floating icon moves (keyframes live in globals.css):
 * - fall:  drifts down while swaying and spinning (leaves, snow, petals)
 * - rain:  drops straight down, fast (rain)
 * - rise:  floats upward and twinkles (sparkles, lanterns, balloons)
 * - drift: crosses the screen sideways while bobbing (bats, ghosts, clouds)
 */
export type Motion = 'fall' | 'rain' | 'rise' | 'drift';

export type Particle = {
  Icon: IconType;
  colors: string[];
  motion: Motion;
  size: [number, number];
  // Relative share of the particle count.
  weight: number;
};

/** A fixed ornament pinned to a screen edge (trees on the ground, webs in corners). */
export type Scenery = {
  Icon: IconType;
  color: string;
  size: number;
  // CSS offsets, e.g. { left: '2%', bottom: 0 }.
  at: { left?: string; right?: string; top?: string | number; bottom?: string | number };
  rotate?: number;
  flip?: boolean;
  // Skip on narrow screens where edge space is scarce.
  desktopOnly?: boolean;
};

export type DecorTheme = {
  particles: Particle[];
  scenery: Scenery[];
  // Desktop particle count (mobile uses half).
  count: number;
  // Icon shown beside the clock.
  badge: { Icon: IconType; color: string };
};

const LEAF = ['#ea580c', '#f97316', '#dc2626', '#b45309', '#d97706', '#facc15'];
const SNOW = ['#e0f2fe', '#bae6fd', '#f8fafc', '#7dd3fc'];
const BLOSSOM = ['#f9a8d4', '#f472b6', '#fbcfe8', '#c4b5fd', '#fde047'];
const RAIN = ['#60a5fa', '#93c5fd', '#38bdf8'];
const SUN = ['#facc15', '#fde047', '#fb923c'];
const TREE_GREEN = '#16a34a';
const GOLD = ['#facc15', '#fbbf24', '#fde68a'];

const p = (
  Icon: IconType,
  colors: string[],
  motion: Motion,
  size: [number, number],
  weight = 1
): Particle => ({ Icon, colors, motion, size, weight });

export const SEASON_DECOR: Record<Season, DecorTheme> = {
  // April showers and sunny breaks: rain, flowers, bees and ladybugs.
  spring: {
    count: 26,
    particles: [
      p(GiWaterDrop, RAIN, 'rain', [8, 14], 6),
      p(GiSpotedFlower, BLOSSOM, 'fall', [14, 24], 2),
      p(GiDaisy, ['#fef9c3', '#fde047', '#ffffff'], 'fall', [14, 22], 1),
      p(GiButterfly, ['#a78bfa', '#60a5fa', '#f472b6'], 'drift', [18, 26], 1),
      p(GiBee, ['#facc15'], 'drift', [16, 22], 1),
      p(GiUmbrella, ['#f472b6', '#60a5fa', '#facc15'], 'fall', [20, 28], 1),
    ],
    scenery: [
      { Icon: GiSunCloud, color: '#facc15', size: 84, at: { right: '3%', top: 90 } },
      { Icon: GiFluffyCloud, color: '#94a3b8', size: 72, at: { left: '4%', top: 110 }, desktopOnly: true },
      { Icon: GiFlowers, color: '#f472b6', size: 56, at: { left: '1%', bottom: 0 } },
      { Icon: GiFlowerPot, color: '#ec4899', size: 48, at: { left: '6%', bottom: 0 }, desktopOnly: true },
      { Icon: GiLadybug, color: '#dc2626', size: 28, at: { right: '7%', bottom: 46 }, desktopOnly: true },
      { Icon: GiFlowers, color: '#a78bfa', size: 56, at: { right: '1%', bottom: 0 }, flip: true },
    ],
    badge: { Icon: GiSunCloud, color: '#facc15' },
  },
  // Beach day: balls, shells, shades and ice cream over palms and green trees.
  summer: {
    count: 16,
    particles: [
      p(GiSparkles, SUN, 'rise', [12, 20], 3),
      p(GiBeachBall, ['#38bdf8', '#f43f5e', '#facc15'], 'fall', [20, 30], 2),
      p(GiSeaStar, ['#fb923c', '#f472b6'], 'fall', [16, 24], 1),
      p(GiSpiralShell, ['#fde68a', '#fdba74'], 'fall', [16, 22], 1),
      p(GiSunglasses, ['#0f172a', '#f43f5e'], 'fall', [20, 26], 1),
      p(GiIceCreamCone, ['#f9a8d4', '#fde68a'], 'fall', [18, 26], 1),
    ],
    scenery: [
      { Icon: GiSun, color: '#facc15', size: 88, at: { right: '3%', top: 90 } },
      { Icon: GiPalmTree, color: TREE_GREEN, size: 110, at: { left: '0%', bottom: 0 } },
      { Icon: GiBirchTrees, color: '#22c55e', size: 90, at: { left: '7%', bottom: 0 }, desktopOnly: true },
      { Icon: GiSandCastle, color: '#d97706', size: 56, at: { right: '9%', bottom: 0 }, desktopOnly: true },
      { Icon: GiPalmTree, color: TREE_GREEN, size: 120, at: { right: '0%', bottom: 0 }, flip: true },
      { Icon: GiWaves, color: '#38bdf8', size: 64, at: { left: '45%', bottom: -8 }, desktopOnly: true },
    ],
    badge: { Icon: GiSun, color: '#facc15' },
  },
  fall: {
    count: 18,
    particles: [
      p(GiMapleLeaf, LEAF, 'fall', [18, 34], 3),
      p(GiOakLeaf, LEAF, 'fall', [18, 30], 2),
      p(GiFallingLeaf, LEAF, 'fall', [18, 30], 2),
      p(GiLindenLeaf, LEAF, 'fall', [16, 26], 1),
      p(GiAcorn, ['#92400e', '#a16207'], 'fall', [16, 22], 1),
    ],
    scenery: [
      { Icon: GiMushrooms, color: '#b45309', size: 48, at: { left: '1%', bottom: 0 } },
      { Icon: GiPumpkin, color: '#f97316', size: 52, at: { right: '2%', bottom: 0 } },
      { Icon: GiWheat, color: '#d97706', size: 56, at: { right: '7%', bottom: 0 }, desktopOnly: true },
    ],
    badge: { Icon: GiMapleLeaf, color: '#f97316' },
  },
  winter: {
    count: 24,
    particles: [
      p(GiSnowflake1, SNOW, 'fall', [12, 26], 3),
      p(GiSnowflake2, SNOW, 'fall', [10, 22], 3),
    ],
    scenery: [
      { Icon: GiPineTree, color: '#15803d', size: 100, at: { left: '0%', bottom: 0 } },
      { Icon: GiPineTree, color: '#166534', size: 72, at: { left: '6%', bottom: 0 }, desktopOnly: true },
      { Icon: GiSnowman, color: '#e2e8f0', size: 64, at: { right: '2%', bottom: 0 } },
    ],
    badge: { Icon: GiSnowman, color: '#7dd3fc' },
  },
};

export const EVENT_DECOR: Record<EventId, DecorTheme> = {
  newYear: {
    count: 22,
    particles: [
      p(GiSparkles, GOLD, 'rise', [12, 22], 3),
      p(GiFireworkRocket, ['#f43f5e', '#60a5fa', '#facc15'], 'rise', [20, 28], 2),
      p(GiPartyHat, ['#a78bfa', '#f472b6', '#38bdf8'], 'fall', [18, 26], 1),
      p(GiSnowflake1, SNOW, 'fall', [10, 18], 1),
    ],
    scenery: [
      { Icon: GiPartyPopper, color: '#f472b6', size: 64, at: { left: '1%', bottom: 0 } },
      { Icon: GiChampagneCork, color: '#facc15', size: 60, at: { right: '2%', bottom: 0 } },
    ],
    badge: { Icon: GiPartyPopper, color: '#facc15' },
  },
  lunarNewYear: {
    count: 14,
    particles: [
      p(GiPaperLantern, ['#dc2626', '#ef4444'], 'rise', [22, 32], 2),
      p(GiSparkles, GOLD, 'rise', [12, 18], 2),
      p(GiFireworkRocket, ['#dc2626', '#facc15'], 'rise', [18, 24], 1),
    ],
    scenery: [
      { Icon: GiAsianLantern, color: '#dc2626', size: 64, at: { left: '3%', top: 70 } },
      { Icon: GiAsianLantern, color: '#dc2626', size: 64, at: { right: '3%', top: 70 } },
    ],
    badge: { Icon: GiPaperLantern, color: '#dc2626' },
  },
  valentines: {
    count: 18,
    particles: [
      p(GiHearts, ['#f43f5e', '#fb7185', '#f9a8d4'], 'rise', [16, 26], 4),
      p(GiRose, ['#e11d48'], 'fall', [18, 26], 1),
      p(GiCupidonArrow, ['#f472b6'], 'drift', [24, 30], 1),
    ],
    scenery: [{ Icon: GiRose, color: '#e11d48', size: 60, at: { right: '2%', bottom: 0 } }],
    badge: { Icon: GiHearts, color: '#f43f5e' },
  },
  stPatricks: {
    count: 18,
    particles: [
      p(GiShamrock, ['#16a34a', '#22c55e', '#4ade80'], 'fall', [16, 28], 4),
      p(GiClover, ['#15803d'], 'fall', [16, 24], 1),
      p(GiSparkles, GOLD, 'rise', [12, 18], 1),
    ],
    scenery: [
      { Icon: GiShamrock, color: '#16a34a', size: 60, at: { left: '1%', bottom: 0 } },
      { Icon: GiShamrock, color: '#22c55e', size: 48, at: { right: '2%', bottom: 0 } },
    ],
    badge: { Icon: GiShamrock, color: '#22c55e' },
  },
  easter: {
    count: 18,
    particles: [
      p(GiEasterEgg, ['#f9a8d4', '#a5f3fc', '#fde68a', '#c4b5fd', '#bbf7d0'], 'fall', [18, 26], 4),
      p(GiSpotedFlower, BLOSSOM, 'fall', [14, 20], 2),
      p(GiButterfly, ['#a78bfa', '#f472b6'], 'drift', [18, 24], 1),
    ],
    scenery: [
      { Icon: GiRabbit, color: '#e2e8f0', size: 64, at: { left: '1%', bottom: 0 } },
      { Icon: GiNestEggs, color: '#a16207', size: 56, at: { right: '2%', bottom: 0 } },
    ],
    badge: { Icon: GiEasterEgg, color: '#f9a8d4' },
  },
  canadaDay: {
    count: 20,
    particles: [
      p(GiMapleLeaf, ['#dc2626', '#ef4444'], 'fall', [18, 30], 3),
      p(GiFireworkRocket, ['#dc2626', '#f8fafc'], 'rise', [20, 26], 2),
      p(GiSparkles, ['#f8fafc', '#fca5a5'], 'rise', [12, 18], 2),
    ],
    scenery: [
      { Icon: GiMapleLeaf, color: '#dc2626', size: 64, at: { left: '1%', bottom: 4 }, rotate: -12 },
      { Icon: GiMapleLeaf, color: '#dc2626', size: 64, at: { right: '1%', bottom: 4 }, rotate: 12 },
    ],
    badge: { Icon: GiMapleLeaf, color: '#dc2626' },
  },
  thanksgivingCA: {
    count: 16,
    particles: [
      p(GiMapleLeaf, LEAF, 'fall', [18, 30], 3),
      p(GiOakLeaf, LEAF, 'fall', [18, 28], 2),
      p(GiWheat, ['#d97706', '#facc15'], 'fall', [18, 24], 1),
      p(GiPieSlice, ['#d97706'], 'fall', [18, 24], 1),
    ],
    scenery: [
      { Icon: GiCornucopia, color: '#b45309', size: 72, at: { left: '1%', bottom: 0 } },
      { Icon: GiPumpkin, color: '#f97316', size: 52, at: { right: '2%', bottom: 0 } },
    ],
    badge: { Icon: GiCornucopia, color: '#d97706' },
  },
  halloween: {
    count: 16,
    particles: [
      p(GiBat, ['#a78bfa', '#71717a', '#7c3aed'], 'drift', [22, 32], 3),
      p(GiFloatingGhost, ['#f1f5f9', '#e2e8f0'], 'drift', [24, 32], 2),
      p(GiGhost, ['#f8fafc'], 'rise', [18, 24], 1),
      p(GiWitchFlight, ['#7c3aed', '#a78bfa'], 'drift', [30, 38], 1),
      p(GiFallingLeaf, LEAF, 'fall', [16, 26], 2),
    ],
    scenery: [
      { Icon: GiSpiderWeb, color: '#a1a1aa', size: 96, at: { left: '0', top: 64 } },
      { Icon: GiHangingSpider, color: '#71717a', size: 56, at: { right: '3%', top: 64 }, desktopOnly: true },
      { Icon: GiPumpkinLantern, color: '#f97316', size: 60, at: { left: '1%', bottom: 0 } },
      { Icon: GiPumpkinLantern, color: '#ea580c', size: 48, at: { right: '2%', bottom: 0 }, flip: true },
    ],
    badge: { Icon: GiPumpkinLantern, color: '#f97316' },
  },
  thanksgivingUS: {
    count: 16,
    particles: [
      p(GiOakLeaf, LEAF, 'fall', [18, 28], 3),
      p(GiMapleLeaf, LEAF, 'fall', [18, 28], 2),
      p(GiPieSlice, ['#d97706'], 'fall', [18, 24], 1),
      p(GiWheat, ['#d97706', '#facc15'], 'fall', [18, 24], 1),
    ],
    scenery: [
      { Icon: GiCornucopia, color: '#b45309', size: 72, at: { left: '1%', bottom: 0 } },
      { Icon: GiPumpkin, color: '#f97316', size: 52, at: { right: '2%', bottom: 0 } },
    ],
    badge: { Icon: GiCornucopia, color: '#d97706' },
  },
  christmas: {
    count: 22,
    particles: [
      p(GiSnowflake1, SNOW, 'fall', [12, 24], 3),
      p(GiSnowflake2, SNOW, 'fall', [10, 20], 2),
      p(GiPresent, ['#dc2626', '#16a34a', '#facc15'], 'fall', [18, 26], 1),
      p(GiCandyCanes, ['#ef4444'], 'fall', [18, 26], 1),
      p(GiRingingBell, GOLD, 'fall', [16, 22], 1),
    ],
    scenery: [
      { Icon: GiPineTree, color: '#15803d', size: 110, at: { left: '0%', bottom: 0 } },
      { Icon: GiPresent, color: '#dc2626', size: 44, at: { left: '7%', bottom: 0 }, desktopOnly: true },
      { Icon: GiSnowman, color: '#e2e8f0', size: 64, at: { right: '2%', bottom: 0 } },
    ],
    badge: { Icon: GiPineTree, color: '#16a34a' },
  },
};
