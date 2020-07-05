///<reference path="./badgeCase/BadgeCase.ts" />

/**
 * Contains all game constants for easy access.
 */

namespace GameConstants {

    // Ticks
    export const TICK_TIME = 100;
    export const BATTLE_TICK = 1000;
    export const UNDERGROUND_TICK = 1000;
    export const DUNGEON_TIME = 6000;
    export const DUNGEON_TICK = 10;
    export const EFFECT_ENGINE_TICK = 1000;
    export const SAVE_TICK = 10000;
    export const GYM_TIME = 3000;
    export const GYM_COUNTDOWN = 1000;
    export const GYM_TICK = 10;
    export const ACHIEVEMENT_TICK = 1000;
    export const MIN_LOAD_TIME = 500;

    export const MAX_AVAILABLE_REGION = 2; // Hoenn

    export const TotalPokemonsPerRegion = [
        151, // 151 - Kanto
        251, // 100 - Johto
        386, // 135 - Hoenn
        493, // 107 - Sinnoh
        649, // 156 - Unova
        721, // 72 - Kalos
        809, // 88 - Alola
    ];

    export const ITEM_USE_TIME = 30;


    export const MINUTE = 1000 * 60;
    export const HOUR = 1000 * 60 * 60;
    export const DAY = 1000 * 60 * 60 * 24;

    export const ROAMING_MIN_CHANCE = 8192;
    export const ROAMING_MAX_CHANCE = 4096;

    export const RoamingPokemon = {
        0: ['Mew'],
        1: ['Raikou', 'Entei', 'Suicune'],
        2: ['Latios', 'Latias', 'Regice', 'Regirock', 'Registeel', 'Jirachi', 'Deoxys'],
    };

    // Shinies
    export const SHINY_CHANCE_BATTLE = 8192;
    export const SHINY_CHANCE_DUNGEON = 4096;
    export const SHINY_CHANCE_BREEDING = 1024;
    export const SHINY_CHANCE_SHOP = 2048;
    export const SHINY_CHANCE_STONE = 4096;
    export const SHINY_CHANCE_SAFARI = 2048;

    export const ITEM_PRICE_MULTIPLIER = 1.00045;
    export const ITEM_PRICE_DEDUCT = 1.0005;

    export const PLATE_VALUE = 100;

    // Breeding
    export const BREEDING_ATTACK_BONUS = 25;

    export const BerryDistribution = [0.39, 0.63, 0.78, 0.87, 0.93, 0.96, 0.98, 1];

    // Dungeons
    export const DUNGEON_SIZE = 5;
    export const DUNGEON_CHEST_SHOW = 2;
    export const DUNGEON_MAP_SHOW = 4;

    // Achievements
    export enum AchievementOption {
        less,
        equal,
        more,
    }

    export enum NotificationOption {
        info,
        success,
        warning,
        danger,
        primary,
        secondary,
        dark,
        light,
    }

    export enum DungeonTile {
        empty,
        enemy,
        chest,
        boss,
    }

    //Shards from battle
    export const DUNGEON_SHARDS = 3;
    export const DUNGEON_BOSS_SHARDS = 20;
    export const GYM_SHARDS = 5;

    //Safari
    export const Safari = {
        'SizeY': Math.floor((window.innerHeight - 150) / 32),
        'SizeX': 25,
    };

    export const SAFARI_BATTLE_CHANCE = 5;

    export const SAFARI_BASE_POKEBALL_COUNT = 30;

    export const LEGAL_WALK_BLOCKS = [
        0,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
    ];

    export const SAFARI_OUT_OF_BALLS = 'Game Over!<br>You have run out of safari balls to use.';

    //Quests

    // Numbers calculated by Dimava assumes ability to 1 shot on high routes and some use oak items,
    //   which are now nerfed slightly until upgraded, so those numbers may need further adjusting
    const questBase = 1; // change this to scale all quest points
    export const DEFEAT_POKEMONS_BASE_REWARD  = questBase * 1;
    export const CAPTURE_POKEMONS_BASE_REWARD = DEFEAT_POKEMONS_BASE_REWARD / 0.8; // Defeat reward divided by chance to catch (guessed)
    export const GAIN_MONEY_BASE_REWARD       = questBase * 0.0017;  // Dimava
    export const GAIN_TOKENS_BASE_REWARD      = CAPTURE_POKEMONS_BASE_REWARD / 13; // <route number> tokens gained for every capture
    export const HATCH_EGGS_BASE_REWARD       = questBase * 33;      // Dimava
    export const MINE_LAYERS_BASE_REWARD      = questBase * 720;     // Average of 1/4 squares revealed = 75 energy ~ 12 minutes ~ 720 pokemons
    export const SHINY_BASE_REWARD            = questBase * 3000;    // Dimava
    export const USE_OAK_ITEM_BASE_REWARD     = DEFEAT_POKEMONS_BASE_REWARD; // not balanced at all for some oak items

    export const ACTIVE_QUEST_MULTIPLIER      = 4;

    // Some active quests may be quicker if passive pokemon attack is used instead of active clicking
    // This number is used to estimate time taken in terms of clicks, for reward calculation
    export const QUEST_CLICKS_PER_SECOND      = 5;

    export const QuestTypes = [
        'DefeatPokemons',
        'CapturePokemons',
        'GainMoney',
        'GainTokens',
        'GainShards',
        'HatchEggs',
        'MineLayers',
        'CatchShinies',
        'DefeatGym',
        'DefeatDungeon',
        'UsePokeball',
        'UseOakItem',
        'HarvestBerriesQuest',
    ];

    export const QUESTS_PER_SET = 10;

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
        idle = 0,
        paused = 1,
        fighting = 2,
        gym = 3,
        dungeon = 4,
        safari = 5,
        town = 6,
        shop = 7,
    }

    export enum Pokeball {
        'None' = -1,
        'Pokeball' = 0,
        'Greatball' = 1,
        'Ultraball' = 2,
        'Masterball' = 3,
    }

    export enum Currency {
        money,
        questPoint,
        dungeonToken,
        diamond,
        farmPoint
    }

    export enum TypeEffectiveness {
        Immune,
        NotVery,
        Normal,
        Very
    }

    export enum TypeEffectivenessValue {
        Immune = 0,
        NotVery = 0.5,
        Normal = 1,
        Very = 2
    }

    export function humanifyString(str: string) {
        return str.replace(/_/g, ' ');
    }

    export function camelCaseToString(str: string) {
        return str.replace(/([A-Z])/g, ' $1').replace(/\b\w/g, (w) => (w.replace(/\w/, (c) => c.toUpperCase())));
    }

    export function formatTime(time) {
        if (time == 0) {
            return 'Ready';
        }

        time = parseInt(`${time}`, 10); // don't forget the second param
        const hours: any = `${Math.floor(time / 3600)}`.padStart(2, '0');
        const minutes: any = `${Math.floor((time - (hours * 3600)) / 60)}`.padStart(2, '0');
        const seconds: any = `${time - (hours * 3600) - (minutes * 60)}`.padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    export function formatTimeShortWords(time: number): string {
        if (isNaN(+time) || time == 0) {
            return 'now';
        }
        time = Math.abs(time);

        if (time > GameConstants.DAY) {
            const days = Math.ceil(time / GameConstants.DAY);
            return `${time % GameConstants.DAY ? '< ' : ''}${days} day${days == 1 ? '' : 's'}`;
        }
        if (time > GameConstants.HOUR) {
            const hours = Math.ceil(time / GameConstants.HOUR);
            return `${time % GameConstants.HOUR ? '< ' : ''}${hours} hour${hours == 1 ? '' : 's'}`;
        }
        const minutes = Math.ceil(time / GameConstants.MINUTE);
        return `${time % GameConstants.MINUTE ? '< ' : ''}${minutes} min${minutes == 1 ? '' : 's'}`;
    }

    export enum Region {
        kanto = 0,
        johto = 1,
        hoenn = 2,
        sinnoh = 3,
        unova = 4,
        kalos = 5,
        alola = 6,
        galar = 7,
    }

    export class Option {
        text: string;
        value: any;

        constructor(text, value) {
            this.text = text;
            this.value = value;
        }
    }


    export const RegionRoute = {
        0: [1, 25],
        1: [26, 48],
        2: [101, 134],
    };

    export function randomIntBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export function randomElement(array: any[]) {
        return array[GameConstants.randomIntBetween(0, array.length - 1)];
    }

    export function clipNumber(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max);
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

    // Map navigation
    export const HIGHEST_ROUTE_NUMBER = 134;
    export const AMOUNT_OF_ROUTES_KANTO = 25;

    export const ROUTE_KILLS_NEEDED = 10;
    /**
     * Each route contains a list of routenumbers that need to be completed
     * Access with routeRequirements.region.routeNumber
     */
    export const routeRequirements = {
        0: {
            1: [],
            2: [1],
            3: [2],
            4: [3],
            5: [4],
            6: [5],
            7: [5, 10],
            8: [5, 6, 7],
            9: [4],
            10: [9],
            11: [6],
            12: [7, 10, 11],
            13: [11, 12],
            14: [13],
            15: [14],
            16: [8],
            17: [16],
            18: [17],
            19: [15, 18],
            20: [19],
            21: [20],
            22: [1],
            23: [22],
            24: [4],
            25: [24],
        },
        1: {
            30: [29],
            31: [30],
            33: [32],
            36: [35],
            37: [36],
            39: [38],
            40: [39],
            41: [40],
            46: [45],
            26: [46],
            27: [26],
            48: [47],
        },
        2: {
            102: [101],
            103: [101],
            104: [102],
            105: [104],
            106: [105],
            107: [106],
            108: [107],
            109: [108],
            110: [116],
            111: [117],
            112: [111],
            113: [111],
            114: [113],
            115: [114],
            116: [104],
            117: [110],
            118: [117],
            119: [118],
            120: [119],
            121: [120],
            122: [121],
            123: [122],
            124: [121],
            125: [124],
            126: [125],
            127: [126],
            128: [127],
            129: [128],
            130: [129],
            131: [130],
            132: [131],
            133: [132],
            134: [133],
        },
    };

    export const routeBadgeRequirements = {
        0: {
            3: BadgeCase.Badge.Boulder,
            5: BadgeCase.Badge.Cascade,
            7: BadgeCase.Badge.Thunder,
            8: BadgeCase.Badge.Thunder,
            9: BadgeCase.Badge.Cascade,
            11: BadgeCase.Badge.Thunder,
            12: BadgeCase.Badge.Marsh,
            13: BadgeCase.Badge.Marsh,
            16: BadgeCase.Badge.Marsh,
            19: BadgeCase.Badge.Soul,
            21: BadgeCase.Badge.Volcano,
            22: BadgeCase.Badge.Earth,
            24: BadgeCase.Badge.Cascade,
        },
        1: {
            28: BadgeCase.Badge.Elite_JohtoChampion,
            32: BadgeCase.Badge.Zephyr,
            34: BadgeCase.Badge.Hive,
            35: BadgeCase.Badge.Plain,
            38: BadgeCase.Badge.Fog,
            42: BadgeCase.Badge.Mineral,
            43: BadgeCase.Badge.Glacier,
            44: BadgeCase.Badge.Glacier,
            45: BadgeCase.Badge.Rising,
            47: BadgeCase.Badge.Elite_JohtoChampion,
        },
        2: {
            116: BadgeCase.Badge.Stone,
            117: BadgeCase.Badge.Knuckle,
            111: BadgeCase.Badge.Dynamo,
            112: BadgeCase.Badge.Heat,
            105: BadgeCase.Badge.Balance,
            118: BadgeCase.Badge.Balance,
            120: BadgeCase.Badge.Feather,
            126: BadgeCase.Badge.Mind,
            127: BadgeCase.Badge.Rain,
        },
    };

    export const WaterRoutes = {
        0: new Set([19,20,21]),
        1: new Set([40,41]),
        2: new Set([105,106,107,108,109,122,124,125,126,127,128,129,130,131,132,133,134]),
    };

    export const routeDungeonRequirements = {
        0: {
            4: 'Mt. Moon',
            20: 'Seafoam Islands',
        },
        1: {
            33: 'Union Cave',
            34: 'Ilex Forest',
        },
        2: {
            116: 'Petalburg Woods',
            110: 'Granite Cave',
            113: 'Fiery Path',
            115: 'Meteor Falls',
            112: 'Jagged Pass',
            124: 'Mt. Pyre',
            128: 'Seafloor Cavern',
        },
    };

    export enum Starter {
        'None' = -1,
        'Bulbasaur' = 0,
        'Charmander' = 1,
        'Squirtle' = 2,
    }

    export const ItemPrice = {
        // Money
        'Pokeball': 100,
        'Greatball': 500,
        'Ultraball': 2000,
        'Masterball': 2500,

        'xAttack': 600,
        'xClick': 400,
        'xExp': 800,
        'Token_collector': 1000,
        'Item_magnet': 1500,
        'Lucky_incense': 2000,

        'SmallRestore': 20000,
        'MediumRestore': 40000,
        'LargeRestore': 100000,

        'PokeBlock': Infinity,

        'Protein': Infinity,
        'RareCandy': Infinity,

        // Quest points
        'Eevee': 5000,
        'Porygon': 2000,
        'Jynx': 2500,
        'Mr. Mime': 1500,
        'Lickitung': 1000,
        'Togepi': 2500,
        'Beldum': 5000,

        // TODO: Set prices for different kinds of eggs and stones
        'Egg': 1000,
        'EvolutionStone': 2500,

    };

    export enum StoneType {
        'None' = -1,
        'Fire_stone',
        'Water_stone',
        'Thunder_stone',
        'Leaf_stone',
        'Moon_stone',
        'Sun_stone',
        'Trade_stone',
        'Dragon_scale',
        'Metal_coat',
        'Kings_rock',
        'Upgrade',
        'Time_stone',
    }

    export enum BattleItemType {
        'xAttack' = 'xAttack',
        'xClick' = 'xClick',
        'xExp' = 'xExp',
        'Token_collector' = 'Token_collector',
        'Item_magnet' = 'Item_magnet',
        'Lucky_incense' = 'Lucky_incense'
    }

    export enum PokemonItemType {
        'Eevee',
        'Porygon',
        'Jynx',
        'Mr. Mime',
        'Lickitung',
        'Togepi',
        'Beldum',
    }

    export enum PokeBlockColor {
        Black,
        Red,
        Gold,
        Purple,
        Gray,
        White
    }

    export enum VitaminType {
        Protein,
        RareCandy
    }

    export enum EnergyRestoreSize {
        SmallRestore,
        MediumRestore,
        LargeRestore
    }

    export enum EggItemType {
        'Fire_egg',
        'Water_egg',
        'Grass_egg',
        'Fighting_egg',
        'Electric_egg',
        'Dragon_egg',
        'Pokemon_egg',
        'Mystery_egg',
    }

    export const EnergyRestoreEffect = {
        SmallRestore: 0.1,
        MediumRestore: 0.2,
        LargeRestore: 0.5,
    };

    export const KeyToDirection = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left', //a
        68: 'right', //d
        83: 'down', //s
        87: 'up', //w
    };

    export const FossilToPokemon = {
        'Helix Fossil': 'Omanyte',
        'Dome Fossil': 'Kabuto',
        'Old Amber': 'Aerodactyl',
        'Root Fossil': 'Lileep',
        'Claw Fossil': 'Anorith',
    };

    //Used for image name
    export const PokemonToFossil = {
        'Omanyte': 'helix',
        'Kabuto': 'dome',
        'Aerodactyl': 'amber',
        'Lileep': 'root',
        'Anorith': 'claw',

    };

    // For random quest, name matches entry in gymList (created in Gym.ts)
    export const KantoGyms = [
        'Pewter City',
        'Cerulean City',
        'Vermillion City',
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

    export const RegionGyms = [
        KantoGyms,
        JohtoGyms,
        HoennGyms,
    ];

    export const KantoDungeons = [
        'Viridian Forest',
        'Digletts Cave',
        'Mt. Moon',
        'Rock Tunnel',
        'Power Plant',
        'Pokemon Tower',
        'Seafoam Islands',
        'Pokemon Mansion',
        'Victory Road',
        'Cerulean Cave',
    ];

    export const JohtoDungeons = [
        'Sprout Tower',
        'Ruins of Alph',
        'Union Cave',
        'Slowpoke Well',
        'Ilex Forest',
        'Burned Tower',
        'Tin Tower',
        'Whirl Islands',
        'Mt Mortar',
        'Ice Path',
        'Dark Cave',
        'Mt Silver',
    ];

    export const HoennDungeons = [
        'Rusturf Tunnel',
        'Granite Cave',
        'Jagged Pass',
        'Fiery Path',
        'Mt. Chimney',
        'Meteor Falls',
        'Mt. Pyre',
        'Shoal Cave',
        'Seafloor Cavern',
        'Cave of Origin',
        'Sky Pillar',
        'Victory Road Hoenn',
        'Petalburg Woods',
        'New Mauville',
        // These aren't implemented anywhere yet
        /*
        "Island Cave",
        "Desert Ruins",
        "Scorched Slab",
        "Ancient Tomb",
        "Aqua Hideout",
        "Magma Hideout",
        "Sealed Chamber",
        "Artisan Cave",
        "Desert Underpass",
        "Marine Cave",
        "Terra Cave",
        "Southern Island",
        "Faraway Island",
        "Birth Island",
        "Devon Corporation",
        "Oceanic Museum",
        "Mirage Tower",
        "Weather Institute",
        "Safari Zone",
        "Mirage Island",
        "Battle Tower",
        "Trainer Hill",
        "Abandoned Ship",
        "Battle Maison",
        "Battle Resort",
        "Mirage Spots",
        */
    ];

    export const RegionDungeons = [
        KantoDungeons,
        JohtoDungeons,
        HoennDungeons,
    ];

    export const StartingTowns = [
        'Pallet Town',
        'New Bark Town',
        'Littleroot Town',
    ];
}
