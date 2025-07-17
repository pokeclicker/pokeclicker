import DayCyclePart from './dayCycle/DayCyclePart';
import MoonCyclePhase from './moonCycle/MoonCyclePhase';
import { PokemonNameType } from './pokemons/PokemonNameType';

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const WEEK = DAY * 7;

// Ticks
export const TICK_TIME = 0.1 * SECOND;
export const BATTLE_TICK = 1 * SECOND;
export const BATTLE_FRONTIER_TICK = 0.5 * SECOND;
export const UNDERGROUND_TICK = 1 * SECOND;
export const DUNGEON_TIME = 60 * SECOND;
export const DUNGEON_TICK = 0.1 * SECOND;
export const DUNGEON_LADDER_BONUS = 10 * SECOND;
export const EFFECT_ENGINE_TICK = 1 * SECOND;
export const SAVE_TICK = 10 * SECOND;
export const GYM_TIME = 30 * SECOND;
export const GYM_COUNTDOWN = 1 * SECOND;
export const GYM_TICK = 0.1 * SECOND;
export const ACHIEVEMENT_TICK = 1 * SECOND;
export const MIN_LOAD_TIME = 0.5 * SECOND;
export const MAX_LOAD_TIME = 20 * SECOND;
export const MUTATION_TICK = 1 * SECOND;
export const WANDER_TICK = 1.5 * SECOND;
export const MULCH_OAK_ITEM_TICK = 1 * MINUTE;
export const TEMP_BATTLE_TIME = 60 * SECOND;
export const TEMP_BATTLE_TICK = 0.1 * SECOND;
export const SPECIAL_EVENT_TICK = 1 * SECOND;
export const ZMOVE_TICK = 1 * SECOND;

// Update the requirement for "Final Region Town" in TownList, when adding new regions.
// Else the professor NPC won't work.
export enum Region {
    none = -1,
    kanto = 0,
    johto = 1,
    hoenn = 2,
    sinnoh = 3,
    unova = 4,
    kalos = 5,
    alola = 6,
    galar = 7,
    hisui = 8,
    paldea = 9,
    // Throws an error if no region after the final region
    final = 10,
}

export const MAX_AVAILABLE_REGION = Region.galar;

export const MaxIDPerRegion = [
    151, // 151 - Kanto
    251, // 100 - Johto
    386, // 135 - Hoenn
    493, // 107 - Sinnoh
    649, // 156 - Unova
    721, // 72 - Kalos
    809, // 88 - Alola
    898, // 89 - Galar
    905, // 7 - Hisui
    1025, // 120 - Paldea
];

// Subregions
export enum KantoSubRegions {
    Kanto = 0,
    Sevii123,
    Sevii4567,
}

export enum JohtoSubRegions {
    Johto = 0,
}

export enum HoennSubRegions {
    Hoenn = 0,
    Orre,
}

export enum SinnohSubRegions {
    Sinnoh = 0,
}

export enum UnovaSubRegions {
    Unova = 0,
}

export enum KalosSubRegions {
    Kalos = 0,
}

export enum AlolaSubRegions {
    MelemeleIsland = 0,
    AkalaIsland,
    UlaulaIsland,
    PoniIsland,
    MagikarpJump,
}

export enum GalarSubRegions {
    SouthGalar = 0,
    NorthGalar,
    IsleofArmor,
    CrownTundra,
}

export enum HisuiSubRegions {
    Hisui = 0,
}

export enum PaldeaSubRegions {
    Paldea = 0,
    Kitakami,
    BlueberryAcademy,
}

export enum FinalSubRegions {
    Final = 0,
}

export type SubRegions =
    | KantoSubRegions
    | JohtoSubRegions
    | HoennSubRegions
    | SinnohSubRegions
    | UnovaSubRegions
    | KalosSubRegions
    | AlolaSubRegions
    | GalarSubRegions
    | HisuiSubRegions
    | PaldeaSubRegions
    | FinalSubRegions;

// Battle Items
export const ITEM_USE_TIME = 30;
export const FLUTE_TYPE_ATTACK_MULTIPLIER = 1.005;

export const ROAMING_MIN_CHANCE = 8192;
export const ROAMING_MAX_CHANCE = 4096;
export const ROAMING_INCREASED_CHANCE = 3;

// Shinies
export const SHINY_CHANCE_BATTLE = 8192;
export const SHINY_CHANCE_DUNGEON = 4096;
export const SHINY_CHANCE_STONE = 2048;
export const SHINY_CHANCE_SAFARI = 1024;
export const SHINY_CHANCE_SHOP = 1024;
export const SHINY_CHANCE_BATTLEFRONTIER = 1024;
export const SHINY_CHANCE_BREEDING = 1024;
export const SHINY_CHANCE_FARM = 1024;
export const SHINY_CHANCE_REWARD = 1024;

export const ITEM_PRICE_MULTIPLIER = 1.00045;
export const ITEM_PRICE_DEDUCT = 1.0005;

export const PLATE_VALUE = 100;

// Breeding
export const EGG_CYCLE_MULTIPLIER = 40;
export const MAX_EGG_CYCLES = 120;
export const BREEDING_ATTACK_BONUS = 25;
export const BREEDING_SHINY_ATTACK_MULTIPLIER = 5;

// Farming
export const FARM_PLOT_WIDTH = 5;
export const FARM_PLOT_HEIGHT = 5;

export const BerryDistribution = [0.39, 0.63, 0.78, 0.87, 0.93, 0.96, 0.98, 1];

export const MULCH_USE_TIME = 300;
export const BOOST_MULCH_MULTIPLIER = 1.5;
export const RICH_MULCH_MULTIPLIER = 2;
export const SURPRISE_MULCH_MULTIPLIER = 1.5;
export const AMAZE_MULCH_GROWTH_MULTIPLIER = 1.25;
export const AMAZE_MULCH_PRODUCE_MULTIPLIER = 1.5;
export const AMAZE_MULCH_MUTATE_MULTIPLIER = 1.25;
export const FREEZE_MULCH_MULTIPLIER = 0;
export const GOOEY_MULCH_CATCH_BONUS = 10;

export const WANDER_RATE = 0.0005;
export const WANDER_SHINY_FP_MODIFIER = 5;

export const BerryColor = [
    '#EE8130', // Red
    '#A33EA1', // Purple
    '#D685AD', // Pink
    '#7AC74C', // Green
    '#F7D02C', // Yellow
    '#6390F0', // Blue
    '#B1CBDC', // Silver placeholder
    '#FFE48E', // Gold placeholder
    '#B7B7CE', // Hinted
    '#1C1C1C', // Locked
];

// Dungeons
export const BASE_DUNGEON_SIZE = 5;
export const MIN_DUNGEON_SIZE = 5;
export const MAX_DUNGEON_SIZE = 10;
export const DUNGEON_CHEST_SHOW = 2;
export const DUNGEON_MAP_SHOW = 4;

export enum DungeonTileType {
    empty = 0,
    entrance = 1,
    enemy = 2,
    chest = 3,
    boss = 4,
    ladder = 5,
}

// Achievements
export enum AchievementOption {
    less,
    equal,
    more,
}

export enum AchievementType {
    'None' = -1,
    'Pokedollars' = 0,
    'Dungeon Token',
    'Caught Pokemon',
    'Shiny Pokemon',
    'Total Captured',
    'Total Defeated',
    'Attack',
    'Poke Balls',
    'Route Defeats',
    'Clear Gym',
    'Clear Dungeon',
    'Quest',
    'Max Level Oak Item',
    'Hatchery',
    'Farming',
    'Underground',
    'Safari',
    'Battle Frontier',
    'Vitamins',
    'Pokerus',
    'Shadow Pokemon',
    'Mega Stone',
}

// Held item chance
export const ROUTE_HELD_ITEM_MODIFIER = 1;
export const DUNGEON_HELD_ITEM_MODIFIER = ROUTE_HELD_ITEM_MODIFIER * 4;
export const DUNGEON_BOSS_HELD_ITEM_MODIFIER = DUNGEON_HELD_ITEM_MODIFIER * 1.5;
export const HELD_ITEM_CHANCE = 512;
export const HELD_CANDY_ITEM_CHANCE = 1024;
export const HELD_UNDERGROUND_ITEM_CHANCE = 2048;
export const GRISEOUS_ITEM_CHANCE = 50;
export const DNA_ITEM_CHANCE = 45;
export const LIGHT_ITEM_CHANCE = 75;
export const SHADOW_ITEM_CHANCE = 8;
export const RUST_ITEM_CHANCE = 90;
export const MANE_ITEM_CHANCE = 10;
export const CHRISTMAS_ITEM_CHANCE = 10;
export const HELD_MAGIKARP_BISCUIT = 256;

// Gems
export const GEM_UPGRADE_COST = 500;
export const GEM_UPGRADE_STEP = 0.1;
export const MAX_GEM_UPGRADES = 10;

// Gems from battle
export const DUNGEON_GEMS = 3;
export const DUNGEON_BOSS_GEMS = 20;
export const GYM_GEMS = 5;

// Safari Zone
export const SAFARI_BATTLE_CHANCE = 5;
export const SAFARI_MJ_BATTLE_CHANCE = SAFARI_BATTLE_CHANCE * 2;
export const SAFARI_BASE_POKEBALL_COUNT = 30;

export enum SafariTile {
    ground = 0,
    waterUL = 1,
    waterU = 2,
    waterUR = 3,
    waterL = 4,
    waterC = 5,
    waterR = 6,
    waterDL = 7,
    waterD = 8,
    waterDR = 9,
    grass = 10,
    sandUL = 11,
    sandU = 12,
    sandUR = 13,
    sandL = 14,
    sandC = 15,
    sandR = 16,
    sandDL = 17,
    sandD = 18,
    sandDR = 19,
    sandURinverted = 21,
    sandDRinverted = 22,
    sandDLinverted = 23,
    sandULinverted = 24,
    fenceUL = 25,
    fenceU = 26,
    fenceUR = 27,
    fenceL = 28,
    fenceR = 29,
    fenceDL = 30,
    fenceD = 31,
    fenceDR = 32,
    fenceDRend = 33,
    fenceURend = 34,
    fenceULend = 35,
    fenceDLend = 36,
    treeTopL = 37,
    treeTopC = 38,
    treeTopR = 39,
    treeLeavesL = 40,
    treeLeavesC = 41,
    treeLeavesR = 42,
    treeTrunkL = 43,
    treeTrunkC = 44,
    treeTrunkR = 45,
    treeRootsL = 46,
    treeRootsC = 47,
    treeRootsR = 48,
    sign = 51,
    waterULCorner = 52,
    waterDLCorner = 53,
    waterDRCorner = 54,
    waterURCorner = 55,
}

export const SAFARI_LEGAL_WALK_BLOCKS = [
    SafariTile.ground,
    SafariTile.waterUL,
    SafariTile.waterU,
    SafariTile.waterUR,
    SafariTile.waterL,
    SafariTile.waterC,
    SafariTile.waterR,
    SafariTile.waterDL,
    SafariTile.waterD,
    SafariTile.waterDR,
    SafariTile.grass,
    SafariTile.sandUL,
    SafariTile.sandU,
    SafariTile.sandUR,
    SafariTile.sandL,
    SafariTile.sandC,
    SafariTile.sandR,
    SafariTile.sandDL,
    SafariTile.sandD,
    SafariTile.sandDR,
    SafariTile.sandURinverted,
    SafariTile.sandDRinverted,
    SafariTile.sandDLinverted,
    SafariTile.sandULinverted,
    SafariTile.treeTopL,
    SafariTile.treeTopC,
    SafariTile.treeTopR,
    SafariTile.waterULCorner,
    SafariTile.waterDLCorner,
    SafariTile.waterDRCorner,
    SafariTile.waterURCorner,
];

export const SAFARI_WATER_BLOCKS = [
    SafariTile.waterUL,
    SafariTile.waterU,
    SafariTile.waterUR,
    SafariTile.waterL,
    SafariTile.waterC,
    SafariTile.waterR,
    SafariTile.waterDL,
    SafariTile.waterD,
    SafariTile.waterDR,
    SafariTile.waterULCorner,
    SafariTile.waterDLCorner,
    SafariTile.waterDRCorner,
    SafariTile.waterURCorner,
];

export const SAFARI_OUT_OF_BALLS = 'Game Over!<br>You have run out of safari balls to use.';

export const BUG_SAFARI_POKEMON = 10;
export const FRIEND_SAFARI_POKEMON = 5;

export const BUG_SAFARI_SHINY_MODIFIER = 5;

// Quests

// Numbers calculated by Dimava assumes ability to 1 shot on high routes and some use oak items,
//   which are now nerfed slightly until upgraded, so those numbers may need further adjusting
const questBase = 1; // change this to scale all quest points

// Currency → QP reward amounts
export const GAIN_MONEY_BASE_REWARD = questBase * 80;
export const GAIN_TOKENS_BASE_REWARD = GAIN_MONEY_BASE_REWARD * 2.5;
export const GAIN_FARM_POINTS_BASE_REWARD = questBase * 0.612;

export const HATCH_EGGS_BASE_REWARD = questBase * 25;
export const SHINY_BASE_REWARD = questBase * 3000;
export const SHADOW_BASE_REWARD = questBase * 500;

export const DEFEAT_POKEMONS_BASE_REWARD = questBase * 1;

// Defeat reward divided by chance to catch (guessed)
export const CAPTURE_POKEMONS_BASE_REWARD = DEFEAT_POKEMONS_BASE_REWARD / 0.74;

// Average of 1/4 squares revealed = 75 energy ~ 12 minutes ~ 720 pokemons
export const MINE_LAYERS_BASE_REWARD = questBase * 720;
export const MINE_ITEMS_BASE_REWARD = questBase * 210;

// not balanced at all for some oak items
export const USE_OAK_ITEM_BASE_REWARD = DEFEAT_POKEMONS_BASE_REWARD;

export const ACTIVE_QUEST_MULTIPLIER = 4;

// Some active quests may be quicker if passive pokemon attack is used instead of active clicking
// This number is used to estimate time taken in terms of clicks, for reward calculation
export const QUEST_CLICKS_PER_SECOND = 5;

export const QUESTS_PER_SET = 10;

// EVs
export const BASE_EP_YIELD = 100;
export const STONE_EP_YIELD = 1000;
export const SHOPMON_EP_YIELD = 1000;
export const SAFARI_EP_YIELD = 1000;

export const SHINY_EP_MODIFIER = 5;
export const REPEATBALL_EP_MODIFIER = 5;
export const DUNGEON_EP_MODIFIER = 3;
export const DUNGEON_BOSS_EP_MODIFIER = 10;
export const ROAMER_EP_MODIFIER = 50;
export const SHADOW_EP_MODIFIER = 2;
export const BASE_WANDERER_EP_MODIFIER = 2;
export const WANDERER_EP_MODIFIER = 10;

export const EP_EV_RATIO = 1000;
export const EP_CHALLENGE_MODIFIER = 10;

// Mega Evolution
export const MEGA_REQUIRED_ATTACK_MULTIPLIER = 500;

/**
 * idle: The game is not doing anything, the battle view isn't shown
 * paused: The battle view is shown, but there are no game ticks
 * fighting: On a route and battling a pokemon
 * gym: Battling a gym
 * dungeon: Exploring a dungeon
 * safari: Exploring the safari zone
 * town: In a town/pre-dungeon, town view is not shown
 */
export enum GameState {
    loading = -1,
    idle = 0,
    paused = 1,
    fighting = 2,
    gym = 3,
    dungeon = 4,
    safari = 5,
    town = 6,
    shop = 7,
    battleFrontier = 8,
    temporaryBattle = 9,
}

export enum Pokeball {
    'None' = -1,
    'Pokeball' = 0,
    'Greatball',
    'Ultraball',
    'Masterball',
    'Fastball',
    'Quickball',
    'Timerball',
    'Duskball',
    'Luxuryball',
    'Diveball',
    'Lureball',
    'Nestball',
    'Repeatball',
    'Beastball',
    'Moonball',
}

export enum Currency {
    money,
    questPoint,
    dungeonToken,
    diamond,
    farmPoint,
    battlePoint,
    contestToken,
}

export const LuxuryBallCurrencyRate: Record<Currency, number> = {
    [Currency.money]: 300000,
    [Currency.questPoint]: 900,
    [Currency.dungeonToken]: 15000,
    [Currency.diamond]: 1500,
    [Currency.farmPoint]: 900,
    [Currency.battlePoint]: 150,
    [Currency.contestToken]: 900,
};

export enum TypeEffectiveness {
    Immune,
    NotVery,
    Neutral,
    Very,
}

export enum TypeEffectivenessValue {
    Immune = 0,
    NotVery = 0.5,
    Neutral = 1,
    Very = 2,
}

export function cleanHTMLString(str: string): string {
    return str.replace(/([|&;$%@"<>()+,])/g, (c: string) => `&#${c.charCodeAt(0)};`);
}

export function humanifyString(str: string): string {
    return str.replace(/[_-]+/g, ' ');
}

export function camelCaseToString(str: string): string {
    return str.replace(/[\s_-]?([A-Z])/g, ' $1').replace(/\b\w/g, (w) => (w.replace(/\w/, (c) => c.toUpperCase()))).trim();
}

export function pluralizeString(str: string, amt: number): string {
    if (amt <= 1) {
        return str;
    }

    switch (true) {
        case /s$/.test(str):
            return str;
        case /[^aeiou]y$/.test(str):
            return str.replace(/y$/, 'ies');
        case /ch$/.test(str):
            return `${str}es`;
        default:
            return `${str}s`;
    }
}

export function formatDate(date: Date): string {
    return date.toISOString().replace(/T/, ' ').replace(/.\d+Z/, '');
}

export function formatTime(input: number | Date): string {
    if (input === 0) { return 'Ready'; }
    if (input === Infinity) { return '∞'; }

    const time = parseInt(`${input}`, 10); // don't forget the second param
    const hours: any = `${Math.floor(time / 3600)}`.padStart(2, '0');
    const minutes: any = `${Math.floor((time - (hours * 3600)) / 60)}`.padStart(2, '0');
    const seconds: any = `${time - (hours * 3600) - (minutes * 60)}`.padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function formatTimeFullLetters(input: number): string {
    // Temporarily recast to number until everything is in modules
    if (Number.isNaN(Number(input)) || input === 0) { return '-'; }
    let time = Math.abs(input * 1000);
    const times = [];

    if (time >= WEEK) {
        const weeks = Math.floor(time / WEEK);
        times.push(`${weeks}w`.padStart(3, '0'));
        time %= WEEK;
    }
    if (time >= DAY || times.length) {
        const days = Math.floor(time / DAY);
        times.push(`${days}d`.padStart(3, '0'));
        time %= DAY;
    }
    if (time >= HOUR || times.length) {
        const hours = Math.floor(time / HOUR);
        times.push(`${hours}h`.padStart(3, '0'));
        time %= HOUR;
    }
    if (time >= MINUTE || times.length) {
        const minutes = Math.floor(time / MINUTE);
        times.push(`${minutes}m`.padStart(3, '0'));
        time %= MINUTE;
    }
    if (time >= SECOND || times.length) {
        const seconds = Math.floor(time / SECOND);
        times.push(`${seconds}s`.padStart(3, '0'));
    }
    return times.slice(0, 3).join(' ');
}

export function formatTimeShortWords(input: number): string {
    // Temporarily recast to number until everything is in modules
    if (Number.isNaN(Number(input)) || input === 0) { return 'now'; }
    const time = Math.abs(input);

    if (time > DAY) {
        const days = Math.ceil(time / DAY);
        return `${time % DAY ? '< ' : ''}${days} day${days === 1 ? '' : 's'}`;
    }
    if (time > HOUR) {
        const hours = Math.ceil(time / HOUR);
        return `${time % HOUR ? '< ' : ''}${hours} hour${hours === 1 ? '' : 's'}`;
    }
    const minutes = Math.ceil(time / MINUTE);
    return `${time % MINUTE ? '< ' : ''}${minutes} min${minutes === 1 ? '' : 's'}`;
}

export function formatSecondsToTime(input: number): string {
    // Temporarily recast to number until everything is in modules
    if (Number.isNaN(Number(input)) || input === 0) { return '-'; }
    let time = Math.abs(input * 1000);
    const times = [];

    if (time >= WEEK) {
        const weeks = Math.floor(time / WEEK);
        times.push(`${weeks} week${weeks === 1 ? '' : 's'}`);
        time %= WEEK;
    }
    if (time >= DAY) {
        const days = Math.floor(time / DAY);
        times.push(`${days} day${days === 1 ? '' : 's'}`);
        time %= DAY;
    }
    if (time >= HOUR) {
        const hours = Math.floor(time / HOUR);
        times.push(`${hours} hour${hours === 1 ? '' : 's'}`);
        time %= HOUR;
    }
    if (time >= MINUTE) {
        const minutes = Math.floor(time / MINUTE);
        times.push(`${minutes} min${minutes === 1 ? '' : 's'}`);
        time %= MINUTE;
    }
    if (time >= SECOND) {
        const seconds = Math.floor(time / SECOND);
        times.push(`${seconds} sec${seconds === 1 ? '' : 's'}`);
    }
    return times.join('</br>');
}

export function formatNumber(input: number): string {
    let num = Number(input); // Temporary cast until everything is in modules
    if (Number.isNaN(+num)) { return '0'; }

    if (num >= 1e12) {
        num = Math.floor(num / 1e11);
        num = num < 100 ? num / 10 : Math.floor(num / 10);
        return `${num}T`;
    }

    if (num >= 1e9) {
        num = Math.floor(num / 1e8);
        num = num < 100 ? num / 10 : Math.floor(num / 10);
        return `${num}B`;
    }

    if (num >= 1e6) {
        num = Math.floor(num / 1e5);
        num = num < 100 ? num / 10 : Math.floor(num / 10);
        return `${num}M`;
    }

    if (num >= 1e3) {
        num = Math.floor(num / 1e2);
        num = num < 100 ? num / 10 : Math.floor(num / 10);
        return `${num}K`;
    }

    return num.toString();
}

export function clipNumber(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

// Return a random element from the array, with an exponential distribution
// The last element has a 1/ratio chance of being chosen, one before last is 1/(ratio^2), etc
// The logarithm is clipped up to 0, so the first two elements will have equal chance
export function expRandomElement<T>(array: T[], ratio: number): T {
    const r = Math.random();
    const logr = Math.log(r) / Math.log(ratio);
    const n = Math.floor(logr + array.length);
    const x = clipNumber(n, 0, array.length - 1);
    return array[x];
}

export const TypeColor = [
    '#A8A77A', // Normal
    '#EE8130', // Fire
    '#6390F0', // Water
    '#F7D02C', // Electric
    '#7AC74C', // Grass
    '#96D9D6', // Ice
    '#C22E28', // Fighting
    '#A33EA1', // Poison
    '#E2BF65', // Ground
    '#A98FF3', // Flying
    '#F95587', // Psychic
    '#A6B91A', // Bug
    '#B6A136', // Rock
    '#735797', // Ghost
    '#6F35FC', // Dragon
    '#705746', // Dark
    '#B7B7CE', // Steel
    '#D685AD', // Fairy
];

export const ROUTE_KILLS_NEEDED = 10;

// Achievements

export const ACHIEVEMENT_DEFEAT_ROUTE_VALUES = [
    100,
    1000,
    10000,
];
export const ACHIEVEMENT_DEFEAT_GYM_VALUES = [
    10,
    100,
    1000,
];
export const ACHIEVEMENT_DEFEAT_DUNGEON_VALUES = [
    10,
    100,
    250,
    500,
];

// Use Environments for game mechanics (ex. evolutions, dive ball)
export type EnvironmentData = Partial<Record<Region, Set<string | number>>>;
export const Environments: Record<string, EnvironmentData> = {
    // Evolutions
    MagneticField: { // For Magnezone, Probopass, and Vikavolt
        [Region.kanto]: new Set([]),
        [Region.johto]: new Set([]),
        [Region.hoenn]: new Set(['New Mauville']),
        [Region.sinnoh]: new Set(['Mt. Coronet', 'Mt. Coronet South', 'Mt. Coronet North', 'Spear Pillar', 'Hall of Origin']),
        [Region.unova]: new Set(['Chargestone Cave']),
        [Region.kalos]: new Set([13, 'Kalos Power Plant']),
        [Region.alola]: new Set([12, 'Vast Poni Canyon']), // Route 12 until Blush Mountain is added
        [Region.galar]: new Set([]), // Thunder Stone
        [Region.hisui]: new Set([]), // Coronet Highlands; see getCurrentEnvironments() in MapHelper.ts for adding evolution environments to Hisui
    },

    MossRock: { // Leafeon
        [Region.kanto]: new Set([]),
        [Region.johto]: new Set([]),
        [Region.hoenn]: new Set(['Petalburg Woods']),
        [Region.sinnoh]: new Set(['Eterna Forest']),
        [Region.unova]: new Set(['Pinwheel Forest']),
        [Region.kalos]: new Set([20, 'Pokémon Village']),
        [Region.alola]: new Set(['Lush Jungle']),
        [Region.galar]: new Set([]), // Leaf Stone
        [Region.hisui]: new Set(['Heartwood']),
    },

    IceRock: { // Glaceon
        [Region.kanto]: new Set([]),
        [Region.johto]: new Set([]),
        [Region.hoenn]: new Set(['Shoal Cave']),
        [Region.sinnoh]: new Set([217, 'Lake Acuity']),
        [Region.unova]: new Set(['Twist Mountain']),
        [Region.kalos]: new Set(['Frost Cavern']),
        [Region.alola]: new Set(['Mount Lanakila']),
        [Region.galar]: new Set([]), // Ice Stone
        [Region.hisui]: new Set(['Icepeak Cavern']),
    },

    // TODO: Change Dusty Bowl from a dungeon into a route
    // DustyBowl: { // Runerigus
    //     [Region.galar]: new Set([]),
    // },

    PlantCloak: { // Burmy Plant Cloak - Default tall grass. Added in getCurrentEnvironments if area not in Sandy or Trash Cloak. Only put areas here if they exist under other Cloak environments
        [Region.kanto]: new Set([]),
        [Region.johto]: new Set([]),
        [Region.hoenn]: new Set([110]),
        [Region.sinnoh]: new Set([206, 210, 212, 213, 214, 222]),
        [Region.unova]: new Set([16, 18, 'Dreamyard']),
        [Region.kalos]: new Set([18, 19]),
        [Region.alola]: new Set([3]),
        [Region.galar]: new Set([]), // no canon basis for Burmy in Galar
        [Region.hisui]: new Set([]), // Village and Fieldlands; see getCurrentEnvironments() in MapHelper.ts for adding evolution environments to Hisui
    },

    SandyCloak: { // Burmy Sandy Cloak - Caves and Beaches. Caves are their own environment and get included in getCurrentEnvironments() method
        [Region.kanto]: new Set([]),
        [Region.johto]: new Set([45, 47, 48]),
        [Region.hoenn]: new Set([111, 'Jagged Pass', 'Mt. Chimney Crater', 'Mt. Pyre', 'Near Space']),
        [Region.sinnoh]: new Set([205, 206, 207, 208, 210, 211, 213, 214, 222, 225, 226, 227, 228, 'Spear Pillar', 'Hall of Origin', 'Distortion World']),
        [Region.unova]: new Set([4, 13, 15, 18, 23, 25]),
        [Region.kalos]: new Set([8, 9, 13, 17, 18, 19]),
        [Region.alola]: new Set([3, 12, 22, 23, 29]),
        [Region.galar]: new Set([]), // no canon basis for Burmy in Galar
        [Region.hisui]: new Set([]), // Mirelands and Highlands; see getCurrentEnvironments() in MapHelper.ts for adding evolution environments to Hisui
    },

    TrashCloak: { // Burmy Trash Cloak - Cities and Indoors. Cities, Leagues, and Towers get included in getCurrentEnvironments() method
        [Region.kanto]: new Set([17, 'Rocket Game Corner', 'Silph Co.', 'Power Plant', 'Pokémon Mansion', 'Indigo Plateau']),
        [Region.johto]: new Set(['Team Rocket\'s Hideout', 'Indigo Plateau Johto']),
        [Region.hoenn]: new Set([110, 'New Mauville', 'Sea Mauville', 'Weather Institute', 'Aqua Hideout', 'Mt. Pyre', 'Sky Pillar', 'Mossdeep Space Center', 'Near Space']),
        [Region.sinnoh]: new Set([206, 212, 222, 'Valley Windworks', 'Old Chateau', 'Team Galactic Eterna Building', 'Team Galactic HQ']),
        [Region.unova]: new Set([5, 9, 11, 16, 'Liberty Garden', 'Castelia Sewers', 'A Totally Unsuspicious Frigate', 'Plasma Frigate', 'Giant Chasm', 'Cave of Being', 'Dreamyard', 'P2 Laboratory']),
        [Region.kalos]: new Set(['Kalos Power Plant', 'Poké Ball Factory', 'Lost Hotel', 'Team Flare Secret HQ']),
        [Region.alola]: new Set(['Trainers\' School', 'Hokulani Observatory', 'Thrifty Megamart', 'Aether Foundation', 'Mina\'s Houseboat']),
        [Region.galar]: new Set([]), // no canon basis for Burmy in Galar
        [Region.hisui]: new Set([]), // Coastlands and Icelands; see getCurrentEnvironments() in MapHelper.ts for adding evolution environments to Hisui
    },

    Water: { // Diveball and, for Kanto, Surf RouteCss
        [Region.kanto]: new Set([12, 13, 19, 20, 21, 24, 26, 31, 32, 33, 34, 35, 36, 'Cerulean City', 'Tanoby Ruins']),
        [Region.johto]: new Set([40, 41, 'Slowpoke Well']),
        [Region.hoenn]: new Set([105, 106, 107, 108, 109, 118, 122, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 'Gateon Port Battles']),
        [Region.sinnoh]: new Set([218, 219, 220, 223, 230, 'Pastoria City', 'Lake Verity', 'Lake Valor', 'Lake Acuity', 'Sendoff Spring']),
        [Region.unova]: new Set([17, 18, 21, 24, 'Undella Town', 'Humilau City']),
        [Region.kalos]: new Set([8, 23, 'Couriway Town', 'Sea Spirit\'s Den']),
        [Region.alola]: new Set([15, 19, 20, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 'Hoppy Town', 'Friend League', 'Quick League', 'Heavy League', 'Great League', 'Fast League', 'Luxury League', 'Heal League', 'Ultra League', 'Elite Four League', 'Master League', 'Magikarp\'s Eye', 'Seafolk Village', 'Brooklet Hill', 'Mina\'s Houseboat', 'Lake of the Sunne and Moone']),
        [Region.galar]: new Set(['Hulbury', 'Roaring-Sea Caves', 5, 6, 8, 9, 16, 21, 27, 29, 36, 37, 41, 42, 43, 44, 51, 53]),
        [Region.hisui]: new Set([]),
    },

    Cave: { // used for Sandy Cloak now, but maybe more in the future
        [Region.kanto]: new Set(['Mt. Moon', 'Diglett\'s Cave', 'Rock Tunnel', 'Seafoam Islands', 'Victory Road', 'Cerulean Cave', 'Ruby Path', 'Icefall Cave', 'Sunburst Island', 'Lost Cave', 'Altering Cave']),
        [Region.johto]: new Set(['Ruins of Alph', 'Union Cave', 'Slowpoke Well', 'Burned Tower', 'Whirl Islands', 'Mt. Mortar', 'Ice Path', 'Dark Cave', 'Tohjo Falls', 'Victory Road Johto', 'Mt. Silver']),
        [Region.hoenn]: new Set(['Rusturf Tunnel', 'Granite Cave', 'Fiery Path', 'Meteor Falls', 'Magma Hideout', 'Shoal Cave', 'Seafloor Cavern', 'Cave of Origin', 'Sealed Chamber', 'Victory Road Hoenn', 'Pyrite Cave', 'Relic Cave']),
        [Region.sinnoh]: new Set(['Oreburgh Gate', 'Wayward Cave', 'Mt. Coronet South', 'Solaceon Ruins', 'Iron Island', 'Mt. Coronet North', 'Victory Road Sinnoh', 'Snowpoint Temple', 'Stark Mountain']),
        [Region.unova]: new Set(['Relic Passage', 'Relic Castle', 'Chargestone Cave', 'Mistralton Cave', 'Reversal Mountain', 'Seaside Cave', 'Giant Chasm', 'Victory Road Unova', 'Twist Mountain']),
        [Region.kalos]: new Set(['Connecting Cave', 'Glittering Cave', 'Reflection Cave', 'Sea Spirit\'s Den', 'Frost Cavern', 'Terminus Cave', 'Victory Road Kalos']),
        [Region.alola]: new Set(['Verdant Cavern', 'Seaward Cave', 'Ten Carat Hill', 'Diglett\'s Tunnel', 'Vast Poni Canyon', 'Mount Lanakila', 'Resolution Cave']),
        [Region.galar]: new Set(['Galar Mine', 'Galar Mine No. 2', 'Courageous Cavern', 'Brawlers\' Cave', 'Warm-Up Tunnel', 'Roaring-Sea Caves', 'Rock Peak Ruins', 'Iron Ruins', 'Iceberg Ruins', 'Split-Decision Ruins', 'Lakeside Cave', 'Tunnel to the Top', 'Max Lair']),
        [Region.hisui]: new Set(['Oreburrow Tunnel', 'Ancient Solaceon Ruins', 'Seaside Hollow', 'Turnback Cave', 'Ancient Wayward Cave', 'Ancient Quarry', 'Primeval Grotto', 'Ice Column Chamber', 'Icepeak Cavern', 'Ancient Snowpoint Temple']),
    },

    // Hisui Areas
    JubilifeVillage: {
        [Region.hisui]: new Set(['Prelude Beach', 'Jubilife Village', 'Galaxy Hall']),
    },

    ObsidianFieldlands: {
        [Region.hisui]: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'Floaro Gardens', 'Oreburrow Tunnel', 'Heartwood', 'Ancient Lake Verity', 'Fieldlands Camp', 'Heights Camp', 'Grandtree Arena']),
    },

    CrimsonMirelands: {
        [Region.hisui]: new Set([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 'Ancient Solaceon Ruins', 'Shrouded Ruins', 'Mirelands Camp', 'Bogbound Camp', 'Sludge Mound', 'Ancient Lake Valor', 'Diamond Settlement', 'Brava Arena']),
    },

    CobaltCoastlands: {
        [Region.hisui]: new Set([23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 'Veilstone Cape', 'Firespit Island', 'Seaside Hollow', 'Turnback Cave', 'Beachside Camp', 'Coastlands Camp', 'Iscan\'s Cabin', 'Molten Arena']),
    },

    CoronetHighlands: {
        [Region.hisui]: new Set([38, 39, 40, 41, 42, 43, 44, 45, 46, 'Ancient Wayward Cave', 'Ancient Quarry', 'Primeval Grotto', 'Clamberclaw Cliffs', 'Celestica Ruins', 'Sacred Plaza', 'Temple of Sinnoh', 'Highlands Camp', 'Mountain Camp', 'Summit Camp', 'Moonview Arena', 'Stone Portal']),
    },

    AlabasterIcelands: {
        [Region.hisui]: new Set([47, 48, 49, 50, 51, 52, 53, 54, 'Avalugg\'s Legacy', 'Ice Column Chamber', 'Icepeak Cavern', 'Ancient Snowpoint Temple', 'Ancient Lake Acuity', 'Snowfields Camp', 'Icepeak Camp', 'Pearl Settlement', 'Icepeak Arena']),
    },
};

export type Environment = keyof typeof Environments;

// Use BattleBackgrounds to choose background image (ex. a forest for Viridian Forest)
export type BattleBackgroundData = Partial<Record<Region, Set<string | number>>>;
export const BattleBackgrounds: Record<string, BattleBackgroundData> = {
    Water: {
        [Region.kanto]: new Set([12, 13, 19, 20, 21, 24, 26, 31, 32, 33, 34, 35, 36, 'Cerulean City', 'Tanoby Ruins']),
        [Region.johto]: new Set([40, 41, 'Slowpoke Well']),
        [Region.hoenn]: new Set([105, 106, 107, 108, 109, 118, 122, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 'Gateon Port Battles']),
        [Region.sinnoh]: new Set([218, 219, 220, 223, 230, 'Pastoria City', 'Lake Verity', 'Lake Valor', 'Sendoff Spring']),
        [Region.unova]: new Set([17, 18, 21, 24, 'Undella Town', 'Humilau City']),
        [Region.kalos]: new Set([8, 23, 'Couriway Town', 'Sea Spirit\'s Den']),
        [Region.alola]: new Set([15, 19, 20, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 'Hoppy Town', 'Hoppy Town Fishing Pond', 'Friend League', 'Quick League', 'Heavy League', 'Great League', 'Fast League', 'Luxury League', 'Heal League', 'Ultra League', 'Elite Four League', 'Master League', 'Magikarp\'s Eye', 'Seafolk Village', 'Brooklet Hill', 'Mina\'s Houseboat', 'Lake of the Sunne and Moone']),
        [Region.galar]: new Set(['Hulbury', 'Roaring-Sea Caves', 5, 6, 8, 9, 16, 21, 27, 29, 36, 37, 41, 42, 43, 44, 51, 53]),
    },

    Ice: {
        [Region.kanto]: new Set(['Seafoam Islands', 'Icefall Cave']),
        [Region.johto]: new Set(['Mahogany Town', 'Ice Path']),
        [Region.hoenn]: new Set(['Sootopolis City', 'Shoal Cave']),
        [Region.sinnoh]: new Set([216, 217, 'Snowpoint City', 'Lake Acuity']),
        [Region.unova]: new Set(['Giant Chasm', 'Team Plasma Assault']),
        [Region.kalos]: new Set([17, 'Dendemille Town', 'Snowbelle City', 'Frost Cavern']),
        [Region.alola]: new Set(['Mount Lanakila']),
        [Region.galar]: new Set(['Circhester', 'Iceberg Ruins', 'Crown Shrine', 'Freezington', 26, 28, 31, 32, 46, 47, 54, 55]),
    },

    Fire: {
        [Region.kanto]: new Set(['Cinnabar Island', 'Mt. Ember', 'Mt. Ember Summit', 'Ruby Path']),
        [Region.johto]: new Set(),
        [Region.hoenn]: new Set(['Lavaridge Town', 'Fiery Path', 'Mt. Chimney', 'Mt. Chimney Crater', 'Magma Hideout', 'Mt. Battle']),
        [Region.sinnoh]: new Set(['Stark Mountain']),
        [Region.unova]: new Set([]),
        [Region.kalos]: new Set(),
        [Region.alola]: new Set(['Wela Volcano Park']),
        [Region.galar]: new Set(['Motostoke']),
    },

    Forest: {
        [Region.kanto]: new Set([25, 30, 'Fuchsia City', 'Viridian Forest', 'Berry Forest', 'Pattern Bush', 40, 41]),
        [Region.johto]: new Set([36, 38, 43, 'Azalea Town', 'Ilex Forest']),
        [Region.hoenn]: new Set([119, 'Petalburg Woods']),
        [Region.sinnoh]: new Set([201, 204, 'Eterna City', 'Eterna Forest', 'Fullmoon Island', 'Newmoon Island']),
        [Region.unova]: new Set([6, 'Floccesy Town', 'Lostlorn Forest', 'Pinwheel Forest', 'Pledge Grove']),
        [Region.kalos]: new Set([1, 14, 20, 'Coumarine City', 'Laverre City', 'Santalune Forest', 'Pokémon Village']),
        [Region.alola]: new Set([27, 'Melemele Woods', 'Lush Jungle', 'Malie Garden', 'Ula\'ula Meadow', 'Poni Meadow']),
        [Region.galar]: new Set(['Slumbering Weald', 'Slumbering Weald Shrine', 'Glimwood Tangle', 'Ballonlea', 'Dyna Tree Hill', 2, 12, 13, 35]),
    },

    Cave: {
        [Region.kanto]: new Set([37, 39, 'Pewter City', 'Diglett\'s Cave', 'Mt. Moon', 'Rock Tunnel', 'Victory Road', 'Lost Cave', 'Altering Cave']),
        [Region.johto]: new Set(['Cianwood City', 'Ruins of Alph', 'Union Cave', 'Mt. Mortar', 'Dark Cave', 'Tohjo Falls', 'Victory Road Johto']),
        [Region.hoenn]: new Set(['Rustboro City', 'Dewford Town', 'Rusturf Tunnel', 'Granite Cave', 'Meteor Falls', 'Jagged Pass', 'Seafloor Cavern', 'Victory Road Hoenn', 'Pyrite Cave', 'Relic Cave', 'The Under', 'Citadark Isle']),
        [Region.sinnoh]: new Set(['Oreburgh City', 'Oreburgh Gate', 'Wayward Cave', 'Mt. Coronet', 'Mt. Coronet South', 'Iron Island', 'Mt. Coronet North', 'Victory Road Sinnoh']),
        [Region.unova]: new Set(['Relic Castle', 'Relic Passage', 'Seaside Cave', 'Victory Road Unova', 'Twist Mountain']),
        [Region.kalos]: new Set([9, 'Connecting Cave', 'Kiloude City', 'Terminus Cave', 'Victory Road Kalos']),
        [Region.alola]: new Set([12, 22, 29, 'Verdant Cavern', 'Seaward Cave', 'Ten Carat Hill', 'Diglett\'s Tunnel', 'Vast Poni Canyon']),
        [Region.galar]: new Set(['Warm-Up Tunnel', 'Courageous Cavern', 'Brawlers\' Cave', 'Rock Peak Ruins', 'Split-Decision Ruins', 'Lakeside Cave', 'Tunnel to the Top', 18]),
    },

    GemCave: {
        [Region.kanto]: new Set(['Viridian City', 'Cerulean Cave', 'Sunburst Island']),
        [Region.johto]: new Set(['Blackthorn City', 'Mt. Silver', 'Whirl Islands']),
        [Region.hoenn]: new Set(['Cave of Origin', 'Sky Pillar', 'Sealed Chamber', 137, 'Deep Colosseum', 'Under Colosseum']),
        [Region.sinnoh]: new Set(['Spear Pillar', 'Hall of Origin']),
        [Region.unova]: new Set(['Chargestone Cave', 'Mistralton Cave', 'Cave of Being']),
        [Region.kalos]: new Set(['Glittering Cave', 'Reflection Cave']),
        [Region.alola]: new Set(['Altar of the Sunne and Moone', 'Resolution Cave']),
        [Region.galar]: new Set(['Galar Mine', 'Galar Mine No. 2', 'Iron Ruins']),
    },

    Desert: {
        [Region.kanto]: new Set(),
        [Region.johto]: new Set(),
        [Region.hoenn]: new Set([111, 135, 'Outskirt Stand', 'Pyrite Town', 'Pyrite Town Battles', 'Orre Colosseum']),
        [Region.sinnoh]: new Set([228]),
        [Region.unova]: new Set([4, 25, 'Lentimas Town', 'Reversal Mountain']),
        [Region.kalos]: new Set([13]),
        [Region.alola]: new Set([23]),
        [Region.galar]: new Set([23, 25, 39, 'Stow-on-Side', 'Dusty Bowl']),
    },

    PowerPlant: {
        [Region.kanto]: new Set(['Vermilion City', 'Rocket Game Corner', 'Power Plant', 'New Island']),
        [Region.johto]: new Set(['Tin Tower', 'Team Rocket\'s Hideout', 'Radio Tower']),
        [Region.hoenn]: new Set(['Mauville City', 'New Mauville', 'Weather Institute', 'Aqua Hideout', 'Near Space', 'Pyrite Colosseum', 'Cipher Lab', 'Realgam Tower Battles', 'Realgam Colosseum', 'Cipher Key Lair']),
        [Region.sinnoh]: new Set(['Sunyshore City', 'Valley Windworks', 'Team Galactic Eterna Building', 'Team Galactic HQ']),
        [Region.unova]: new Set(['Castelia Sewers', 'Virbank City', 'Nimbasa City', 'A Totally Unsuspicious Frigate', 'Plasma Frigate']),
        [Region.kalos]: new Set(['Lumiose City', 'Kalos Power Plant', 'Poké Ball Factory', 'Team Flare Secret HQ']),
        [Region.alola]: new Set(['Aether Paradise', 'Hokulani Observatory', 'Aether Foundation']),
        [Region.galar]: new Set(['Spikemuth', 'Energy Plant', 'Armor Station', 'Crown Tundra Station']),
    },

    Mansion: {
        [Region.kanto]: new Set(['Silph Co.', 'Pokémon Mansion']),
        [Region.johto]: new Set(['Olivine City', 'Olivine Lighthouse', 'Sprout Tower', 'Burned Tower']),
        [Region.hoenn]: new Set(['Petalburg City', 'Phenac City Battles', 'Pyrite Building', 'Snagem Hideout', 'Phenac Stadium', 'Citadark Isle Dome']),
        [Region.sinnoh]: new Set(['Veilstone City', 'Canalave City', 'Snowpoint Temple']),
        [Region.unova]: new Set(['Castelia City', 'Mistralton City', 'Opelucid City', 'Liberty Garden', 'Dragonspiral Tower', 'Dreamyard']),
        [Region.kalos]: new Set(['Lost Hotel']),
        [Region.alola]: new Set(['Trainers\' School', 'Thrifty Megamart', 'Po Town', 'Ruins of Conflict', 'Ruins of Life', 'Ruins of Abundance', 'Ruins of Hope']),
        [Region.galar]: new Set(['Rose Tower', 'Hammerlocke', 'Tower of Darkness', 'Tower of Waters', 'Professor Magnolia\'s House', 'Wyndon', 'Wyndon Stadium', 'Master Dojo', 11]),
    },

    Graveyard: {
        [Region.kanto]: new Set(['Saffron City', 'Pokémon Tower']),
        [Region.johto]: new Set(['Ecruteak City']),
        [Region.hoenn]: new Set(['Mossdeep City', 'Mt. Pyre']),
        [Region.sinnoh]: new Set(['Hearthome City', 'Old Chateau', 'Solaceon Ruins', 'Distortion World']),
        [Region.unova]: new Set(['Celestial Tower']),
        [Region.kalos]: new Set(),
        [Region.alola]: new Set(['Hau\'oli Cemetery', 'Memorial Hill']),
        [Region.galar]: new Set([49]),
    },

    // No need to set anything here, only exists for battle overrides
    Default: {},
};

export type BattleBackground = keyof typeof BattleBackgrounds;

export const BattleBackgroundImage: Record<BattleBackground, string> = {
    Water: 'water',
    Ice: 'ice',
    Fire: 'fire',
    Forest: 'forest',
    Cave: 'cave',
    GemCave: 'cave-gem',
    Desert: 'desert',
    PowerPlant: 'power-plant',
    Mansion: 'mansion',
    Graveyard: 'graveyard',
    Default: '',
};

// Starter Pokémon

export enum Starter {
    None = -1,
    Grass = 0,
    Fire = 1,
    Water = 2,
    Special = 3,
}

export const RegionalStarters = [
    [1, 4, 7, 25], // Kanto
    [152, 155, 158], // Johto
    [252, 255, 258], // Hoenn
    [387, 390, 393], // Sinnoh
    [495, 498, 501], // Unova
    [650, 653, 656], // Kalos
    [722, 725, 728], // Alola
    [810, 813, 816], // Galar
    [724.01, 157.01, 503.01], // Hisui
    [906, 909, 912], // Paldea
];

export enum StoneType {
    'None' = -1,
    'Leaf_stone',
    'Fire_stone',
    'Water_stone',
    'Thunder_stone',
    'Moon_stone',
    'Linking_cord',
    'Sun_stone',
    'Soothe_bell',
    'Metal_coat',
    'Kings_rock',
    'Upgrade',
    'Dragon_scale',
    'Prism_scale',
    'Deepsea_tooth',
    'Deepsea_scale',
    'Shiny_stone',
    'Dusk_stone',
    'Dawn_stone',
    'Razor_claw',
    'Razor_fang',
    'Electirizer',
    'Magmarizer',
    'Protector',
    'Dubious_disc',
    'Reaper_cloth',
    'Black_DNA',
    'White_DNA',
    'Sachet',
    'Whipped_dream',
    'Key_stone',
    'Ice_stone',
    'Solar_light',
    'Lunar_light',
    'Pure_light',
    'Crystallized_shadow',
    'Sweet_apple',
    'Tart_apple',
    'Cracked_pot',
    'Galarica_cuff',
    'Galarica_wreath',
    'Black_mane_hair',
    'White_mane_hair',
    'Black_augurite',
    'Peat_block',
    'Auspicious_armor',
    'Malicious_armor',
    'Leaders_crest',
    'Gimmighoul_coin',
    'Syrupy_apple',
    'Unremarkable_teacup',
    'Metal_alloy',
}

export enum BattleItemType {
    'xAttack' = 'xAttack',
    'xClick' = 'xClick',
    'Lucky_egg' = 'Lucky_egg',
    'Token_collector' = 'Token_collector',
    'Dowsing_machine' = 'Dowsing_machine',
    'Lucky_incense' = 'Lucky_incense',
}

export enum FluteItemType {
    'Yellow_Flute' = 'Yellow_Flute',
    'Black_Flute' = 'Black_Flute',
    'Time_Flute' = 'Time_Flute',
    'Red_Flute' = 'Red_Flute',
    'White_Flute' = 'White_Flute',
    'Blue_Flute' = 'Blue_Flute',
    // 'Poke_Flute' = 'Poke_Flute',
    // 'Azure_Flute' = 'Azure_Flute',
    // 'Eon_Flute' = 'Eon_Flute',
    // 'Sun_Flute' = 'Sun_Flute',
    // 'Moon_Flute' = 'Moon_Flute',
    // 'Grass_Flute' = 'Grass_Flute',
}

export enum PokemonItemType {
    'Pinkan Arbok',
    'Pinkan Oddish',
    'Pinkan Poliwhirl',
    'Pinkan Geodude',
    'Pinkan Dodrio',
    'Lickitung',
    'Pinkan Weezing',
    'Mr. Mime',
    'Pinkan Scyther',
    'Jynx',
    'Pinkan Electabuzz',
    'Magikarp',
    'Eevee',
    'Porygon',
    'Togepi',
    'Beldum',
    'Grotle (Acorn)',
    'Combee',
    'Burmy (Plant)',
    'Spiritomb',
    'Cherubi',
    'Zorua',
    'Meloetta (Pirouette)',
    'Type: Null',
    'Poipole',
    'Silvally (Fighting) 1',
    'Silvally (Rock) 1',
    'Silvally (Dark) 1',
    'Silvally (Fairy) 1',
    'Silvally (Water) 1',
    'Silvally (Grass) 1',
    'Silvally (Fire) 1',
    'Silvally (Electric) 1',
    'Silvally (Ice) 1',
    'Silvally (Ground) 1',
    'Silvally (Bug) 1',
    'Silvally (Flying) 1',
    'Silvally (Poison) 1',
    'Silvally (Ghost) 1',
    'Silvally (Psychic) 1',
    'Silvally (Steel) 1',
    'Silvally (Dragon) 1',
    'Silvally (Fighting) 2',
    'Silvally (Rock) 2',
    'Silvally (Dark) 2',
    'Silvally (Fairy) 2',
    'Silvally (Water) 2',
    'Silvally (Grass) 2',
    'Silvally (Fire) 2',
    'Silvally (Electric) 2',
    'Silvally (Ice) 2',
    'Silvally (Ground) 2',
    'Silvally (Bug) 2',
    'Silvally (Flying) 2',
    'Silvally (Poison) 2',
    'Silvally (Ghost) 2',
    'Silvally (Psychic) 2',
    'Silvally (Steel) 2',
    'Silvally (Dragon) 2',
    'Dracozolt',
    'Arctozolt',
    'Dracovish',
    'Arctovish',
    'Zarude (Dada)',
}

export enum UltraBeastType {
    'Nihilego',
    'Buzzwole',
    'Pheromosa',
    'Xurkitree',
    'Kartana',
    'Celesteela',
    'Blacephalon',
    'Stakataka',
    'Guzzlord',
    'Poipole',
    'Naganadel',
}

export enum PokeBlockColor {
    Black,
    Red,
    Blue,
    Pink,
    Green,
    Yellow,
    Gold,
    Purple,
    Indigo,
    Brown,
    Light_Blue,
    Olive,
    Beige,
    Gray,
    White,
}

export enum VitaminType {
    Protein,
    Calcium,
    Carbos,
}

export enum EggItemType {
    'Fire_egg',
    'Water_egg',
    'Grass_egg',
    'Fighting_egg',
    'Electric_egg',
    'Dragon_egg',
    'Mystery_egg',
}

export enum BulletinBoards {
    None = -2,
    All = -1,
    Kanto,
    Johto,
    Hoenn,
    Sevii4567,
    Sinnoh,
    Unova,
    Kalos,
    Alola,
    Hoppy,
    Galar,
    Armor,
    Crown,
    Hisui,
    Arceus,
    Paldea,
}

// Underground
export const BASE_MINE_WIDTH = 25;
export const BASE_MINE_HEIGHT = 12;

export const BASE_MINIMUM_LAYER_DEPTH = 3;
export const BASE_EXTRA_LAYER_DEPTH = 2;

export const BASE_MINIMUM_ITEMS = 1;
export const BASE_MAXIMUM_ITEMS = 3;

export const DISCOVER_MINE_TIMEOUT_LEVEL_START = 20;
export const DISCOVER_MINE_TIMEOUT_BASE = 15 * 60;
export const DISCOVER_MINE_TIMEOUT_REDUCTION_PER_LEVEL = 30;

export const SPECIAL_MINE_CHANCE = 1 / 25;

export const UNDERGROUND_EXPERIENCE_DIG_UP_ITEM = 25;
export const UNDERGROUND_EXPERIENCE_CLEAR_LAYER = 100;

export const SURVEY_RANGE_BASE = 9;
export const SURVEY_RANGE_REDUCTION_LEVELS = 15;

export const MAX_HIRES = 1;

export const REWARD_RETENTION_BASE = 0.6;
export const REWARD_RETENTION_DECREASE_PER_LEVEL = 0.01;
export const REWARD_RETENTION_MINIMUM = 0.1;

export const SMART_TOOL_CHANCE_BASE = 0.5;
export const SMART_TOOL_CHANCE_INCREASE_PER_LEVEL = 0.025;
export const SMART_TOOL_CHANCE_MAXIMUM = 1;

export const FAVORITE_MINE_CHANCE_BASE = 0.5;
export const FAVORITE_MINE_CHANCE_INCREASE_PER_LEVEL = 0.01;
export const FAVORITE_MINE_CHANCE_MAXIMUM = 1;

export const WORKCYCLE_TIMEOUT_BASE = 60;
export const WORKCYCLE_TIMEOUT_DECREASE_PER_LEVEL = 1.1;
export const WORKCYCLE_TIMEOUT_MINIMUM = 5;

export const PLAYER_EXPERIENCE_HELPER_FRACTION = 0.25;
export const HELPER_EXPERIENCE_PLAYER_FRACTION = 0.25;

export const UNDERGROUND_BATTERY_COOLDOWN_SECONDS = 1;
export const UNDERGROUND_BATTERY_MAX_CHARGES = 60;

export enum EnergyRestoreSize {
    SmallRestore,
    MediumRestore,
    LargeRestore,
}

export const EnergyRestoreEffect = {
    SmallRestore: 0.1,
    MediumRestore: 0.2,
    LargeRestore: 0.5,
};

// For random quest, name matches entry in gymList (created in Gym.ts)
export const KantoGyms = [
    'Pewter City',
    'Cerulean City',
    'Vermilion City',
    'Celadon City',
    'Saffron City',
    'Fuchsia City',
    'Cinnabar Island',
    'Viridian City',
    'Elite Lorelei',
    'Elite Bruno',
    'Elite Agatha',
    'Elite Lance',
    'Champion Blue',
];

export const JohtoGyms = [
    'Violet City',
    'Azalea Town',
    'Goldenrod City',
    'Ecruteak City',
    'Cianwood City',
    'Olivine City',
    'Mahogany Town',
    'Blackthorn City',
    'Elite Will',
    'Elite Koga',
    'Elite Bruno2',
    'Elite Karen',
    'Champion Lance',
];

export const HoennGyms = [
    'Rustboro City',
    'Dewford Town',
    'Mauville City',
    'Lavaridge Town',
    'Petalburg City',
    'Fortree City',
    'Mossdeep City',
    'Sootopolis City',
    'Elite Sidney',
    'Elite Phoebe',
    'Elite Glacia',
    'Elite Drake',
    'Champion Wallace',
];

export const SinnohGyms = [
    'Oreburgh City',
    'Eterna City',
    'Hearthome City',
    'Veilstone City',
    'Pastoria City',
    'Canalave City',
    'Snowpoint City',
    'Sunyshore City',
    'Elite Aaron',
    'Elite Bertha',
    'Elite Flint',
    'Elite Lucian',
    'Champion Cynthia',
];

export const UnovaGyms = [
    'Aspertia City',
    'Virbank City',
    'Castelia City',
    'Nimbasa City',
    'Driftveil City',
    'Mistralton City',
    'Opelucid City',
    'Humilau City',
    'Elite Shauntal',
    'Elite Marshal',
    'Elite Grimsley',
    'Elite Caitlin',
    'Champion Iris',
];

export const KalosGyms = [
    'Santalune City',
    'Cyllage City',
    'Shalour City',
    'Coumarine City',
    'Lumiose City',
    'Laverre City',
    'Anistar City',
    'Snowbelle City',
    'Elite Malva',
    'Elite Siebold',
    'Elite Wikstrom',
    'Elite Drasna',
    'Champion Diantha',
];

export const AlolaGyms = [
    'Iki Town',
    'Konikoni City',
    'Malie City',
    'Exeggutor Island',
    'Elite Molayne',
    'Elite Olivia',
    'Elite Acerola',
    'Elite Kahili',
    'Champion Hau',
];

export const GalarGyms = [
    'Turffield',
    'Hulbury',
    'Motostoke',
    'Stow-on-Side1',
    'Stow-on-Side2',
    'Ballonlea',
    'Circhester1',
    'Circhester2',
    'Spikemuth',
    'Hammerlocke',
    'Elite Trainer Marnie',
    'Elite Gym Leader Bede',
    'Elite Trainer Hop',
    'Champion Leon',
    'Elite Gym Leader Klara',
    'Elite Gym Leader Avery',
    'Elite Dojo Matron Honey',
    'Elite Dojo Master Mustard',
    'Elite Trainer Peony',
];
export const HisuiGyms = [
    'Grandtree Arena',
    'Brava Arena',
    'Molten Arena',
    'Moonview Arena',
    'Icepeak Arena',
    'Temple of Sinnoh',
];

export const PaldeaGyms = [
    'Cortondo',
    'Artazon',
    'Levincia',
    'Cascarrafa',
    'Medali',
    'Montenevera',
    'Alfornada',
    'Glaseado Mountain',
    'Elite Rika',
    'Elite Poppy',
    'Elite Larry',
    'Elite Hassel',
    'Top Champion Geeta',
    'Champion Nemona',
    'Segin Squad\'s Base',
    'Schedar Squad\'s Base',
    'Navi Squad\'s Base',
    'Ruchbah Squad\'s Base',
    'Caph Squad\'s Base',
    'Director Clavell',
    'Penny of Team Star',
    'Stony Cliff Titan',
    'Open Sky Titan',
    'Lurking Steel Titan',
    'Asado Desert',
    'Casseroya Lake',
    'Pokémon Trainer Arven',
    'AI Sada',
    'AI Turo',
];

export const OrangeGyms = [
    'Mikan Island',
    'Navel Island',
    'Trovita Island',
    'Kumquat Island',
    'Supreme Gym Leader Drake',
];

export const OrreGyms = [
    'Cipher Admin Ein',
    'Cipher Admin Miror B.',
    'Cipher Admin Dakim',
    'Cipher Admin Venus',
    'Cipher Admin Lovrina',
    'Cipher Admin Snattle',
    'Cipher Admin Gorigan',
    'Cipher Admin Ardos',
    'Cipher Admin Eldes',
];

export const MagikarpJumpGyms = [
    'Friend League',
    'Quick League',
    'Heavy League',
    'Great League',
    'Fast League',
    'Luxury League',
    'Heal League',
    'Ultra League',
    'E4 League',
    'Master League',
];

export const RegionGyms = [
    KantoGyms,
    JohtoGyms,
    HoennGyms,
    SinnohGyms,
    UnovaGyms,
    KalosGyms,
    AlolaGyms,
    GalarGyms,
    HisuiGyms,
    PaldeaGyms,
    // Keep it at the bottom, as we want optional badges at the bottom
    OrangeGyms,
    MagikarpJumpGyms,
    OrreGyms,
];

export function getGymIndex(gym: string): number {
    return RegionGyms.flat().findIndex((g) => g === gym);
}

export function getGymRegion(gym: string): Region {
    return RegionGyms.findIndex((gyms) => gyms.find((g) => g === gym));
}

export const GymAutoRepeatRewardTiers = [
    // [reward modifier, clears threshold]
    [1, 1000],
    [0.75, 750],
    [0.5, 500],
    [0.25, 250],
    [0, 0],
];

export const KantoDungeons = [
    'Viridian Forest', // 0
    'Mt. Moon',
    'Diglett\'s Cave',
    'Rock Tunnel',
    'Rocket Game Corner',
    'Pokémon Tower',
    'Silph Co.',
    'Power Plant',
    'Seafoam Islands',
    'Pokémon Mansion',
    'Mt. Ember Summit',
    'Berry Forest',
    'New Island',
    'Victory Road',
    'Cerulean Cave',
    'Ruby Path',
    'Icefall Cave',
    'Sunburst Island',
    'Lost Cave',
    'Pattern Bush',
    'Altering Cave',
    'Tanoby Ruins',
    'Pinkan Mountain', // 22
];

export const JohtoDungeons = [
    'Sprout Tower', // 23
    'Ruins of Alph',
    'Union Cave',
    'Slowpoke Well',
    'Ilex Forest',
    'Burned Tower',
    'Olivine Lighthouse',
    'Tin Tower',
    'Whirl Islands',
    'Mt. Mortar',
    'Team Rocket\'s Hideout',
    'Radio Tower',
    'Ice Path',
    'Dark Cave',
    'Tohjo Falls',
    'Victory Road Johto',
    'Mt. Silver', // 39
];

export const HoennDungeons = [
    'Petalburg Woods', // 40
    'Rusturf Tunnel',
    'Granite Cave',
    'Fiery Path',
    'Meteor Falls',
    'Mt. Chimney Crater',
    'Jagged Pass',
    'New Mauville',
    'Weather Institute',
    'Mt. Pyre',
    'Magma Hideout',
    'Aqua Hideout',
    'Shoal Cave',
    'Seafloor Cavern',
    'Sealed Chamber',
    'Cave of Origin',
    'Sky Pillar',
    'Victory Road Hoenn',
    'Near Space',
    'Phenac City Battles',
    'Pyrite Town Battles',
    'Pyrite Colosseum',
    'Pyrite Building',
    'Pyrite Cave',
    'Relic Cave',
    'Mt. Battle',
    'The Under',
    'Cipher Lab',
    'Realgam Tower Battles',
    'Realgam Colosseum',
    'Snagem Hideout',
    'Deep Colosseum',
    'Phenac Stadium',
    'Under Colosseum',
    'Gateon Port Battles',
    'Cipher Key Lair',
    'Citadark Isle',
    'Citadark Isle Dome', // 77
];

export const SinnohDungeons = [
    'Oreburgh Gate', // 78
    'Valley Windworks',
    'Eterna Forest',
    'Old Chateau',
    'Team Galactic Eterna Building',
    'Wayward Cave',
    'Mt. Coronet South',
    'Solaceon Ruins',
    'Iron Island',
    'Lake Valor',
    'Lake Verity',
    'Mt. Coronet North',
    'Lake Acuity',
    'Team Galactic HQ',
    'Spear Pillar',
    'Distortion World',
    'Victory Road Sinnoh',
    'Sendoff Spring',
    'Fullmoon Island',
    'Newmoon Island',
    'Flower Paradise',
    'Snowpoint Temple',
    'Stark Mountain',
    'Hall of Origin', // 101
];

export const UnovaDungeons = [
    'Floccesy Ranch', // 102
    'Liberty Garden',
    'Castelia Sewers',
    'Relic Passage',
    'Relic Castle',
    'Lostlorn Forest',
    'Chargestone Cave',
    'Mistralton Cave',
    'Celestial Tower',
    'Reversal Mountain',
    'Seaside Cave',
    'Plasma Frigate',
    'Giant Chasm',
    'Cave of Being', // Contains gen 4 trio only
    'Abundant Shrine',
    'Victory Road Unova',
    'Twist Mountain',
    'Dragonspiral Tower',
    'Moor of Icirrus',
    'Pledge Grove',
    'Pinwheel Forest',
    'Dreamyard',
    'P2 Laboratory', // 124
];

export const KalosDungeons = [
    'Santalune Forest', // 125
    'Connecting Cave',
    'Glittering Cave',
    'Reflection Cave',
    // 'Tower of Mastery',
    'Sea Spirit\'s Den',
    'Kalos Power Plant',
    'Poké Ball Factory',
    'Lost Hotel',
    'Frost Cavern',
    'Team Flare Secret HQ',
    'Terminus Cave',
    'Pokémon Village',
    'Victory Road Kalos', // 137
    // 'Unknown Dungeon',
];

export const AlolaDungeons = [
    'Trainers\' School', // 138
    'Hau\'oli Cemetery',
    'Verdant Cavern',
    'Melemele Meadow',
    'Seaward Cave',
    'Ten Carat Hill',
    'Pikachu Valley',
    'Paniola Ranch',
    'Brooklet Hill',
    'Wela Volcano Park',
    'Lush Jungle',
    'Diglett\'s Tunnel',
    'Memorial Hill',
    'Malie Garden',
    'Hokulani Observatory',
    'Thrifty Megamart',
    'Ula\'ula Meadow',
    'Po Town',
    'Aether Foundation',
    'Exeggutor Island Hill',
    'Vast Poni Canyon',
    'Mina\'s Houseboat',
    'Mount Lanakila',
    'Lake of the Sunne and Moone',
    'Ruins of Conflict',
    'Ruins of Life',
    'Ruins of Abundance',
    'Ruins of Hope',
    'Poni Meadow',
    'Resolution Cave', // 167
];

export const GalarDungeons = [
    'Slumbering Weald Shrine', // 168
    'Galar Mine',
    'Galar Mine No. 2',
    'Glimwood Tangle',
    'Rose Tower',
    'Energy Plant',
    'Dusty Bowl',
    'Courageous Cavern',
    'Brawlers\' Cave',
    'Warm-Up Tunnel',
    'Tower of Darkness',
    'Tower of Waters',
    'Roaring-Sea Caves',
    'Rock Peak Ruins',
    'Iron Ruins',
    'Iceberg Ruins',
    'Split-Decision Ruins',
    'Lakeside Cave',
    'Dyna Tree Hill',
    'Tunnel to the Top',
    'Crown Shrine',
    'Max Lair', // 189
];

export const HisuiDungeons = [
    'Floaro Gardens', // 190
    'Oreburrow Tunnel',
    'Heartwood',
    'Ancient Solaceon Ruins',
    'Shrouded Ruins',
    'Veilstone Cape',
    'Firespit Island',
    'Ancient Wayward Cave',
    'Ancient Quarry',
    'Primeval Grotto',
    'Clamberclaw Cliffs',
    'Celestica Ruins',
    'Sacred Plaza',
    'Avalugg\'s Legacy',
    'Ice Column Chamber',
    'Icepeak Cavern',
    'Ancient Snowpoint Temple',
    'Seaside Hollow',
    'Ancient Lake Verity',
    'Ancient Lake Valor',
    'Ancient Lake Acuity',
    'Temple of Sinnoh',
    'Turnback Cave', // 212
];

export const PaldeaDungeons = [
    'Inlet Grotto', // 213
    'Glaseado Mountain',
    'Grasswither Shrine',
    'Icerend Shrine',
    'Groundblight Shrine',
    'Firescourge Shrine',
    'Area Zero',
    'Area Zero Depths', // 220
];

export const RegionDungeons = [
    KantoDungeons,
    JohtoDungeons,
    HoennDungeons,
    SinnohDungeons,
    UnovaDungeons,
    KalosDungeons,
    AlolaDungeons,
    GalarDungeons,
    HisuiDungeons,
    PaldeaDungeons,
];

export function getDungeonIndex(dungeon: string): number {
    return RegionDungeons.flat().findIndex((d) => d === dungeon);
}

export function getDungeonRegion(dungeon: string): Region {
    return RegionDungeons.findIndex((dungeons) => dungeons.find((d) => d === dungeon));
}

export const StartingTowns = [
    'Pallet Town', // Kanto
    'New Bark Town', // Johto
    'Littleroot Town', // Hoenn
    'Twinleaf Town', // Sinnoh
    'Aspertia City', // Unova
    'Vaniville Town', // Kalos
    'Iki Town Outskirts', // Alola
    'Postwick', // Galar
    'Prelude Beach', // Hisui
    'Cabo Poco', // Paldea
    'Final Region Town', // Final
];

export const StartingRoutes = [
    1, // Kanto
    29, // Johto
    101, // Hoenn
    201, // Sinnoh
    19, // Unova
    1, // Kalos
    1, // Alola
    1, // Galar
    1, // Hisui
    1, // Paldea
];

export const DockTowns = [
    'Vermilion City', // Kanto
    'Olivine City', // Johto
    'Slateport City', // Hoenn
    'Canalave City', // Sinnoh
    'Castelia City', // Unova
    'Coumarine City', // Kalos
    'Hau\'oli City', // Alola
    'Hulbury', // Galar
    'Prelude Beach', // Hisui
    'Porto Marinada', // Paldea
];

export const TemporaryBattles = [
    'Blue 1',
    'Blue 2',
    'Blue 3',
    'Blue 4',
    'Fighting Dojo',
    'Snorlax route 12',
    'Snorlax route 16',
    'Blue 5',
    'Biker Goon 1',
    'Biker Goon 2',
    'Biker Goon 3',
    'Cue Ball Paxton',
    'Ash Ketchum New Island',
    'Bill\'s Grandpa',
    'Blue 6',
    'Santa Jynx 1',
    'Santa Jynx 2',
    'Santa Jynx 3',
    'Santa Jynx 4',
    'Silver 1',
    'Silver 2',
    'Sudowoodo',
    'Silver 3',
    'Silver 4',
    'Silver 5',
    'Suicune 1',
    'Eusine',
    'Suicune 2',
    'Red Gyarados',
    'Suicune 3',
    'Suicune 4',
    'Suicune 5',
    'Suicune 6',
    'Silver 6',
    'Silver 7',
    'Red',
    'Youngster Joey',
    'May 1',
    'May 2',
    'May 3',
    'Wally 1',
    'May 4',
    'Kecleon 1',
    'Kecleon 2',
    'Kecleon 3',
    'May 5',
    'Wally 2',
    'Clown Jessie & James',
    'Butler 1',
    'Butler 2',
    'Meta Groudon',
    'Latios',
    'Latias',
    'Willie',
    'Folly',
    'Cipher Peon Doven',
    'Cipher Peon Silton',
    'Cipher Peon Kass',
    'Cipher Peon Naps',
    'Chobin 1',
    'Miror B. 1',
    'Chobin 2',
    'Cipher Peon Smarton',
    'Zook',
    'Miror B. 2',
    'Sevii Rocket Grunt 1',
    'Sevii Rocket Grunt 2',
    'Sevii Rocket Grunt 3',
    'Sevii Rocket Grunt 4',
    'Sevii Rocket Grunt 5',
    'Sevii Rocket Ariana',
    'Sevii Rocket Archer',
    'Scientist Gideon',
    'Pinkan Jessie & James',
    'Pinkan Officer Jenny',
    'Kimono Girls',
    'Spiky-eared Pichu',
    'Rocket Boss Giovanni',
    'Barry 1',
    'Barry 2',
    'Barry 3',
    'Barry 4',
    'Galactic Boss Cyrus',
    'Barry 5',
    'Barry 6',
    'Barry 7',
    'Manaphy Go-Rock MGrunt 1',
    'Manaphy Go-Rock MGrunt 2',
    'Manaphy Go-Rock MGrunt 3',
    'Manaphy Go-Rock MGrunt 4',
    'Manaphy Go-Rock FGrunt 1',
    'Manaphy Go-Rock FGrunt 2',
    'Manaphy Go-Rock Commander',
    'Manaphy Go-Rock Pincher',
    'Manaphy Egg Protectors',
    'Zero',
    'Hugh 1',
    'Hugh 2',
    'Team Plasma Grunt 1',
    'Colress 1',
    'Team Plasma Grunt 2',
    'Team Plasma Grunt 3',
    'Hugh 3',
    'Cheren',
    'Colress 2',
    'Team Plasma Grunt 4',
    'Team Plasma Grunt 5',
    'Team Plasma Grunts 1',
    'Team Plasma Grunts 2',
    'Hugh 4',
    'Team Plasma Grunt 6',
    'Zinzolin 1',
    'Team Plasma Grunt 7',
    'Team Plasma Grunt 8',
    'Team Plasma Grunt 9',
    'Zinzolin 2',
    'Plasma Shadow 1',
    'Colress 3',
    'Plasma Shadow 2',
    'Plasma Shadow 3',
    'Plasma Shadow 4',
    'Ghetsis 1',
    'Ghetsis 2',
    'Hugh 5',
    'Hugh 6',
    'Hugh 7',
    'Red Genesect 1',
    'Genesect Burn',
    'Genesect Chill',
    'Genesect Douse',
    'Genesect Shock',
    'Red Genesect 2',
    'Dream Researcher',
    'Shauna 1',
    'Sycamore 1',
    'Tierno 1',
    'Trevor & Tierno',
    'Team Flare Grunt 1',
    'Team Flare Grunt 2',
    'Calem 1',
    'Korrina',
    'Courtney 1',
    'Matt 1',
    'Zinnia 1',
    'Draconid Elder',
    'Aqua Grunt',
    'Magma Grunt',
    'Courtney 2',
    'Matt 2',
    'Delta Wallace',
    'Zinnia 2',
    'Deoxys',
    'Delta Giovanni',
    'Mr. Stone',
    'Shoal Fisherman',
    'Delta Brock',
    'Delta Tabitha',
    'Delta Shelly',
    'Icy Boulder',
    'Mega Draconid Elder',
    'Delta Steven',
    'Dr Cozmo',
    'Matt 3',
    'Courtney 3',
    'Hoenn Stone Salesman',
    'Kalos Stone Salesman',
    'Captain Stern',
    'Archie Primal',
    'Maxie Primal',
    'Primal Groudon',
    'Primal Kyogre',
    'Aipom Alley',
    'Mime Interview',
    'Underground Fighting Ring',
    'Lab Ambush',
    'Imposter',
    'Possessed Mewtwo',
    'Calem 2',
    'Calem 3',
    'Calem 4',
    'Hex Maniac Aster',
    'Team Flare Lysandre 1',
    'Team Flare Xerosic',
    'Xerneas',
    'Yveltal',
    'Hoopa 1',
    'Hoopa 2',
    'Hoopa 3',
    'Hoopa 4',
    'Hoopa 5',
    'Hoopa 6',
    'Team Flare Boss Lysandre 1',
    'Sycamore 2',
    'Shauna 2',
    'Tierno 2',
    'Trevor',
    'Calem 5',
    'Riot',
    'Merilyn',
    'Millis and Argus Steel',
    'Rampaging Yveltal',
    'AZ',
    'Ash Ketchum Kanto',
    'Ash Ketchum Johto',
    'Ash Ketchum Hoenn',
    'Ash Ketchum Sinnoh',
    'Ash Ketchum Unova',
    'Ash Ketchum Kalos',
    'Ash Ketchum Pinkan',
    'Calem 6',
    'Marquis Grant',
    'Grand Duchess Diantha',
    'Team Flare Boss Lysandre 2',
    'Wild Houndour Horde',
    'Wild Electrike Horde',
    'Unrivaled Red',
    'Unrivaled Blue',
    'Unrivaled Green',
    'Anomaly Mewtwo 1',
    'Anomaly Mewtwo 2',
    'Anomaly Mewtwo 3',
    'Anomaly Mewtwo 4',
    'Anomaly Mewtwo 5',
    'Hau 1',
    'Melemele Spearow',
    'Hau 2',
    'Skull 1',
    'Ilima',
    'Skull 2',
    'Recon Squad 1',
    'Hau 3',
    'Dexio',
    'Sina',
    'Hau 4',
    'Gladion 1',
    'Recon Squad 2',
    'Skull 3',
    'Battle Royal',
    'Plumeria 1',
    'Ultra Wormhole',
    'Hau 5',
    'Skull 4',
    'Molayne',
    'Psychium Z Trial',
    'Skull 5',
    'Plumeria 2',
    'Gladion 2',
    'Exeggutor Tree',
    'Skull 6',
    'Recon Squad 3',
    'Lusamine',
    'Necrozma',
    'Ultra Megalopolis',
    'Captain Mina',
    'Captain Ilima',
    'Captain Mallow',
    'Captain Lana',
    'Captain Kiawe',
    'Captain Sophocles',
    'Kahuna Nanu',
    'Gladion 3',
    'Lillie',
    'Guzma Bug Memory',
    'Kahili Flying Memory',
    'Plumeria Poison Memory',
    'Acerola Ghost Memory',
    'Faba Psychic Memory',
    'Molayne Steel Memory',
    'Ryuki Dragon Memory',
    'Anabel',
    'Captain Mina UB',
    'Kahuna Nanu UB',
    'Ash Ketchum Alola',
    'Rainbow Rocket Grunt 1',
    'Rainbow Rocket Grunt 2',
    'Aether Branch Chief Faba',
    'Team Aqua Leader Archie',
    'Team Magma Leader Maxie',
    'Team Galactic Leader Cyrus',
    'Team Flare Leader Lysandre',
    'Team Plasma Leader Ghetsis',
    'Team Rainbow Leader Giovanni',
    'Magikarp Jump Koylee',
    'Magikarp Jump Karpella',
    'Magikarp Jump Karpen',
    'Magikarp Jump Tykarp',
    'Magikarp Jump Karpress',
    'Magikarp Jump Karami',
    'Magikarp Jump Karson',
    'Magikarp Jump Karpress 2',
    'Magikarp Jump Karpen 2',
    'Magikarp Jump Karbuck',
    'Magikarp Jump Skyhopper',
    'Magikarp Jump Karpen 3',
    'Magikarp Jump Karpella 2',
    'Magikarp Jump Karbuck 2',
    'Magikarp Jump Kareign',
    'Magikarp Jump Koylee 2',
    'Magikarp Jump Karpress 3',
    'Magikarp Jump Karpen 4',
    'Magikarp Jump Karpella 3',
    'Magikarp Jump Skyhopper 2',
    'Magikarp Jump Tykarp 2',
    'Hop 1',
    'Mirages',
    'Hop 2',
    'Hop 3',
    'Bede 1',
    'Hop 4',
    'Bede 2',
    'Marnie 1',
    'Hop 5',
    'Bede 3',
    'Hop 6',
    'Hop 7',
    'Marnie 2',
    'Eternatus',
    'The Darkest Day',
    'Hop 8',
    'Sordward 1',
    'Shielbert 1',
    'Rampaging Tsareena',
    'Rampaging Gyarados',
    'Rampaging Torkoal',
    'Sordward & Shielbert',
    'Rampaging Conkeldurr',
    'Rampaging Dusknoir',
    'Gym Leader Bede',
    'Rampaging Gigalith',
    'Rampaging Froslass',
    'Gym Leader Marnie',
    'Rampaging Haxorus',
    'Sordward 2',
    'Shielbert 2',
    'Rampaging Zacian',
    'Rampaging Zamazenta',
    'Klara 1',
    'Avery 1',
    'Mustard',
    'Klara 2',
    'Avery 2',
    'Klara 3',
    'Avery 3',
    'Kubfu',
    'Zarude Tribe 1',
    'Zarude Tribe 2',
    'Zarude Tribe 3',
    'Ash Ketchum Galar',
    'Zarude (Dada)',
    'Flowering Celebi',
    'Peony',
    'Calyrex',
    'Glastrier',
    'Spectrier',
    'Dyna Tree Birds',
    'Galarian Articuno 1',
    'Galarian Articuno 2',
    'Galarian Articuno 3',
    'Galarian Zapdos 1',
    'Galarian Zapdos 2',
    'Galarian Zapdos 3',
    'Galarian Moltres 1',
    'Galarian Moltres 2',
    'Galarian Moltres 3',
    'Regigigas',
    'Max Raid Venusaur',
    'Max Raid Charizard',
    'Max Raid Blastoise',
    'Max Raid Butterfree',
    'Max Raid Pikachu',
    'Max Raid Meowth',
    'Max Raid Machamp',
    'Max Raid Gengar',
    'Max Raid Kingler',
    'Max Raid Lapras',
    'Max Raid Eevee',
    'Max Raid Snorlax',
    'Max Raid Garbodor',
    'Max Raid Rillaboom',
    'Max Raid Cinderace',
    'Max Raid Inteleon',
    'Max Raid Corviknight',
    'Max Raid Orbeetle',
    'Max Raid Drednaw',
    'Max Raid Coalossal',
    'Max Raid Flapple',
    'Max Raid Appletun',
    'Max Raid Sandaconda',
    'Max Raid Toxtricity',
    'Max Raid Centiskorch',
    'Max Raid Hatterene',
    'Max Raid Grimmsnarl',
    'Max Raid Alcremie',
    'Max Raid Copperajah',
    'Max Raid Duraludon',
    'Eternamax Eternatus',
    'Terrakion 1',
    'Swords of Justice 1',
    'Kyurem 1',
    'Kyurem 2',
    'Kyurem 3',
    'Twerps',
    'Destiny Deoxys Rayquaza',
    'Destiny Deoxys Army',
    'Destiny Rayquaza',
    'Volo 1',
    'Akari 1',
    'Warden Mai',
    'Alpha Kricketune',
    'Warden Lian',
    'Irida 1',
    'Lord of the Woods: Kleavor',
    'Akari 2',
    'Volo 2',
    'Coin 1',
    'Ursaluna',
    'Lady of the Ridge: Lilligant',
    'Irida 2',
    'Clover',
    'Coin 2',
    'Charm 1',
    'Lord of the Isles: Arcanine',
    'Adaman 1',
    'Melli 1',
    'Warden Ingo',
    'Melli 2',
    'Lord of the Hollow: Electrode',
    'Warden Gaeric',
    'Warden Sabi',
    'Hisuian Braviary',
    'Lord of the Tundra: Avalugg',
    'Beni',
    'Charm 2',
    'Dialga (Origin)',
    'Palkia (Origin)',
    'The Galaxy Team\'s Kamado',
    'Adaman 2',
    'Irida 3',
    'Volo 3',
    'Tornadus 1',
    'Tornadus 2',
    'Tornadus 3',
    'Thundurus 1',
    'Thundurus 2',
    'Thundurus 3',
    'Landorus 1',
    'Landorus 2',
    'Landorus 3',
    'Enamorus 1',
    'Enamorus 2',
    'Enamorus 3',
    'Arceus',
    'Paradise Protection Protocol',
];

export enum ShardTraderLocations {
    'None' = -1,
    'Cerulean City' = 0,
    'Vermilion City',
    'Lavender Town',
    'Saffron City',
    'Fuchsia City',
    'Cinnabar Island',
    'Azalea Town',
    'Ecruteak City',
    'Olivine City',
    'Cianwood City',
    'Mahogany Town',
    'Blackthorn City',
    'Petalburg City',
    'Dewford Town',
    'Slateport City',
    'Mauville City',
    'Verdanturf Town',
    'Lavaridge Town',
    'Fallarbor Town',
    'Fortree City',
    'Mossdeep City',
    'Pacifidlog Town',
    'Sootopolis City',
    'Ever Grande City',
    'Pokémon HQ Lab',
    'Sandgem Town',
    'Oreburgh City',
    'Floaroma Town',
    'Eterna City',
    'Hearthome City',
    'Solaceon Town',
    'Pastoria City',
    'Celestic Town',
    'Pal Park',
    'Canalave City',
    'Snowpoint City',
    'Sunyshore City',
    'Survival Area',
    'Resort Area',
    'Castelia City',
    'Nimbasa City',
    'Driftveil City',
    'Mistralton City',
    'Lentimas Town',
    'Undella Town',
    'Lacunosa Town',
    'Opelucid City',
    'Humilau City',
    'Icirrus City',
    'Black and White Park',
    'Nacrene City',
    'Striaton City',
    'Accumula Town',
    'Nuvema Town',
    'Camphrier Town',
    'Parfum Palace',
    'Ambrette Town',
    'Cyllage City',
    'Geosenge Town',
    'Shalour City',
    'Coumarine City',
    'Laverre City',
    'Dendemille Town',
    'Anistar City',
    'Couriway Town',
    'Snowbelle City',
    'Hau\'oli City',
    'Heahea City',
    'Paniola Town',
    'Konikoni City',
    'Aether Paradise',
    'Malie City',
    'Tapu Village',
    'Seafolk Village',
    'Exeggutor Island',
    'Altar of the Sunne and Moone',
    'Turffield',
    'Hulbury',
    'Motostoke',
    'Hammerlocke',
    'Stow-on-Side',
    'Ballonlea',
    'Circhester',
    'Spikemuth',
    'Master Dojo',
    'Jubilife Village',
}

export enum BerryTraderLocations {
    'None' = -1,
    'Goldenrod City' = 0,
    'Mauville City',
    'Pinkan Pokémon Reserve',
    'Hearthome City',
    'Secret Berry Shop',
    'Driftveil City',
}

export function getTemporaryBattlesIndex(temporaryBattle: string): number {
    return TemporaryBattles.findIndex((t) => t === temporaryBattle);
}

export enum DayOfWeek {
    'Sunday' = 0,
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
}

export enum Pokerus {
    'Uninfected' = 0,
    'Infected',
    'Contagious',
    'Resistant',
}

// Gender Types
export enum Genders {
    Genderless = 0,
    MaleFemale, // Default
}

// Wild/Trainer/BF Pokémon Gender
export enum BattlePokemonGender {
    NoGender = 0,
    Male,
    Female,
}

// Pokemon Statistics
export enum PokemonStatisticsType {
    Captured = 'Captured',
    Defeated = 'Defeated',
    Encountered = 'Encountered',
    Hatched = 'Hatched',
    Seen = 'Seen',
}

// Alcremie

export enum AlcremieSweet {
    'Strawberry Sweet',
    'Love Sweet',
    'Berry Sweet',
    'Clover Sweet',
    'Flower Sweet',
    'Star Sweet',
    'Ribbon Sweet',
}
export enum AlcremieSpins {
    dayClockwiseBelow5,
    dayCounterclockwiseBelow5,
    nightClockwiseBelow5,
    nightCounterclockwiseAbove5,
    nightClockwiseAbove5,
    nightCounterclockwiseBelow5,
    dayClockwiseAbove5,
    dayCounterclockwiseAbove5,
    at5Above10,
    Any3600,
}

export enum ExtraAchievementCategories {
    global = Region.final,
    sevii,
    orre,
    magikarpJump,
    secret, // secret should be last
}
export const DayCycleStartHours: Record<DayCyclePart, number> = {
    [DayCyclePart.Dawn]: 5,
    [DayCyclePart.Day]: 6,
    [DayCyclePart.Dusk]: 17,
    [DayCyclePart.Night]: 18,
};

export const MoonCycleValues: Record<MoonCyclePhase, number> = {
    [MoonCyclePhase.NewMoon]: 0,
    [MoonCyclePhase.WaxingCrescent]: 1,
    [MoonCyclePhase.FirstQuarter]: 2,
    [MoonCyclePhase.WaxingGibbous]: 3,
    [MoonCyclePhase.FullMoon]: 4,
    [MoonCyclePhase.WaningGibbous]: 5,
    [MoonCyclePhase.ThirdQuarter]: 6,
    [MoonCyclePhase.WaningCrescent]: 7,
};

export const MoonEvoPokemon = new Set<PokemonNameType>([
    'Nidoran(F)', // 29
    'Nidorina', // 30
    'Nidoqueen', // 31
    'Nidoran(M)', // 32
    'Nidorino', // 33
    'Nidoking', // 34
    'Clefairy', // 35
    'Clefable', // 36
    'Jigglypuff', // 39
    'Wigglytuff', // 40
    'Cleffa', // 173
    'Igglybuff', // 174
    //'Teddiursa', // 216
    //'Ursaring', // 217
    'Skitty', // 300
    'Delcatty', // 301
    //'Lunatone', // 337
    // 'Cresselia', // 488
    //'Darkrai', // 491
    'Munna', // 517
    'Musharna', // 518
    //'Lunala', // 792
    //'Lunala (Full Moon)', // 792.01
    //'Necrozma (Dawn Wings)', // 800.02
    //'Ursaluna', // 901
]);

export enum ShadowStatus {
    None,
    Shadow,
    Purified,
}

export enum MegaStoneType {
    Abomasite,
    Absolite,
    Aerodactylite,
    Aggronite,
    Alakazite,
    Altarianite,
    Ampharosite,
    Audinite,
    Banettite,
    Beedrillite,
    Blastoisinite,
    Blazikenite,
    Blue_Orb,
    Cameruptite,
    Charizardite_X,
    Charizardite_Y,
    Diancite,
    Galladite,
    Garchompite,
    Gardevoirite,
    Gengarite,
    Glalitite,
    Gyaradosite,
    Heracronite,
    Houndoominite,
    Kangaskhanite,
    Latiasite,
    Latiosite,
    Lopunnite,
    Lucarionite,
    Manectite,
    Mawilite,
    Medichamite,
    Metagrossite,
    Meteorite,
    Mewtwonite_X,
    Mewtwonite_Y,
    Pidgeotite,
    Pinsirite,
    Red_Orb,
    Sablenite,
    Salamencite,
    Sceptilite,
    Scizorite,
    Sharpedonite,
    Slowbronite,
    Steelixite,
    Swampertite,
    Tyranitarite,
    Venusaurite,
}

export enum GemShops {
    HoennFluteMaster,
    HoennStoneSalesman,
    UnovaFluteMaster,
    hoennBattleFrontierDeoxysDeal,
    FurfrouGemTrader,
    KalosStoneSalesman,
    SilvallyTrader,
    MagikarpJumpGemTrader,
}

export enum DungeonInteractionSource {
    Click,
    Keybind,
    HeldKeybind,
    DungeonGuide,
}

export const ModalCollapseList = [
    'achievementTrackerBody',
    'battleItemContainerBody',
    'dailyQuestDisplayBody',
    'questLineDisplayBody',
    'eggList',
    'fluteItemContainerBody',
    'oakItemsBody',
    'pokeballSelectorBody',
    'pokemonListBody',
    'shortcutsBody',
    'currencyBody',
    'undergroundCard',
    'undergroundDailyTradesCard',
    'undergroundDisplayHelpers',
    'undergroundDisplayBattery',
    'plotListCard',
    'zCrystalItemContainerBody',
];

export enum ConsumableType {
    Rare_Candy,
    Magikarp_Biscuit,
}

export const zCrystalItemType = [
    'Normalium Z',
    'Firium Z',
    'Waterium Z',
    'Electrium Z',
    'Grassium Z',
    'Icium Z',
    'Fightinium Z',
    'Poisonium Z',
    'Groundium Z',
    'Flyinium Z',
    'Psychium Z',
    'Buginium Z',
    'Rockium Z',
    'Ghostium Z',
    'Dragonium Z',
    'Darkinium Z',
    'Steelium Z',
    'Fairium Z',
];
export enum ZMoveStatus {
    inactive,
    counteractive,
    active,
}
export const ZMOVE_ACTIVE_MULTIPLIER = 1.5;
export const ZMOVE_COUNTERACTIVE_MULTIPLIER = 0.75;
export const ZMOVE_ACTIVE_TIME = 1 * MINUTE;
export const ZMOVE_COUNTERACTIVE_TIME = 4 * MINUTE;
