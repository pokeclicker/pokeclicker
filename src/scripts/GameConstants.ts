/**
 * Contains all game constants for easy access.
 */

namespace GameConstants {

    // Ticks
    export const TICK_TIME = 10;
    export const BATTLE_TICK = 1000;
    export const UNDERGROUND_TICK = 1000;
    export const DUNGEON_TIME = 6000;
    export const DUNGEON_TICK = 1;
    export const EFFECT_ENGINE_TICK = 1000;
    export const FARM_TICK = 1000;
    export const SAVE_TICK = 10000;
    export const GYM_TIME = 3000;
    export const GYM_COUNTDOWN = 1000;
    export const GYM_TICK = 1;
    export const ACHIEVEMENT_TICK = 1000;
    export const MIN_LOAD_TIME = 500;

    export const AMOUNT_OF_POKEMONS = 251;
    export const AMOUNT_OF_POKEMONS_GEN1 = 151;
    export const AMOUNT_OF_POKEMONS_GEN2 = 251;
    export const AMOUNT_OF_BADGES = 16;
    export const ITEM_USE_TIME = 30;

    export const ROAMING_MIN_CHANCE = 8192;
    export const ROAMING_MAX_CHANCE = 4096;

    export const RoamingPokemon = {
        0: ["Mew"],
        1: ["Raikou", "Entei", "Suicune"],
    }

    // Shinies
    export const SHINY_CHANCE_BATTLE = 8192;
    export const SHINY_CHANCE_DUNGEON = 4096;
    export const SHINY_CHANCE_BREEDING = 1024;
    export const SHINY_CHANCE_SHOP = 2048;
    export const SHINY_CHANCE_STONE = 4096;
    export const SHINY_CHANCE_SAFARI = 2048;

    export const ITEM_PRICE_MULTIPLIER = 1.001;
    export const ITEM_PRICE_DEDUCT = 1.0005;



    export const PLATE_VALUE = 100;

    // Oak items
    export const OAKITEM_XP_REQUIREMENT = [1000, 2500, 5000, 10000, 20000, Number.MAX_VALUE];
    export const OAKITEM_MONEY_COST = [1000, 2500, 5000, 10000, 20000, Number.MAX_VALUE,];
    export const AMOUNT_OF_OAKITEMS = 8;
    export const OAKITEM_MAX_LEVEL = 5;
    export const OAKITEM_FIRST_UNLOCK = 20;
    export const OAKITEM_SECOND_UNLOCK = 50;
    export const OAKITEM_THIRD_UNLOCK = 100;

    // Breeding
    export const BREEDING_AMOUNT = 1;
    export const BREEDING_ATTACK_BONUS = 25;

    // Farm
    export const AMOUNT_OF_BERRIES = 8;
    export const AMOUNT_OF_PLOTS = 25;

    export const BerryDistribution = [0.39, 0.63, 0.78, 0.87, 0.93, 0.96, 0.98, 1];

    export enum PlotStage {
        Seed,
        Sprout,
        Taller,
        Bloom,
        Berry
    }

    export enum OakItem {
        Magic_Ball = 0,
        Amulet_Coin,
        Poison_Barb,
        Exp_Share,
        Sprayduck,
        Shiny_Charm,
        Blaze_Cassette,
        Cell_Battery,
    }

    export function normalize(n: number, max:number){
        return Math.min( max, Math.max(0, n));
    }


    // Prestige
    export enum PrestigeType {
        "Easy" = 0,
        "Medium",
        "Hard"
    }

    export const AMOUNT_OF_PRESTIGE_UPGRADES = 37;

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
        danger
    }

    export enum DungeonTile {
        empty,
        enemy,
        chest,
        boss,
    }

    //Shards
    export const SHARD_UPGRADE_COST = 500;
    export const SHARD_UPGRADE_STEP = 0.1;
    export const MAX_SHARD_UPGRADES = 10;

    export const DUNGEON_SHARDS = 3;
    export const DUNGEON_BOSS_SHARDS = 20;
    export const GYM_SHARDS = 5;

    //Safari
    export const Safari = {
        "SizeY": Math.floor((window.innerHeight - 74 - 50) / 32),
        "SizeX": 25,
    }

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
        24
    ];

    export const SAFARI_CATCH_MESSAGES = [
        "Oh, no!<br>The Pokemon broke free!",
        "Aww! It appeared to be caught!",
        "Aargh! Almost had it!",
        "Shoot! It was so close, too!"
    ];

    export const SAFARI_OUT_OF_BALLS = "Game Over!<br>You have run out of safari balls to use."

    //Quests

    // Numbers calculated by Dimava assumes ability to 1 shot on high routes and some use oak items,
    //   which are now nerfed slightly until upgraded, so those numbers may need further adjusting
    const questBase = 1; // change this to scale all quest points
    export const DEFEAT_POKEMONS_BASE_REWARD  = questBase * 1;
    export const CAPTURE_POKEMONS_BASE_REWARD = GameConstants.DEFEAT_POKEMONS_BASE_REWARD / 0.8; // Defeat reward divided by chance to catch (guessed)
    export const GAIN_MONEY_BASE_REWARD       = questBase * 0.0017;  // Dimava
    export const GAIN_TOKENS_BASE_REWARD      = CAPTURE_POKEMONS_BASE_REWARD / 13 // <route number> tokens gained for every capture
    export const HATCH_EGGS_BASE_REWARD       = questBase * 33;      // Dimava
    export const MINE_LAYERS_BASE_REWARD      = questBase * 720;     // Average of 1/4 squares revealed = 75 energy ~ 12 minutes ~ 720 pokemons
    export const SHINY_BASE_REWARD            = questBase * 6000;    // Dimava
    export const USE_OAK_ITEM_BASE_REWARD     = GameConstants.DEFEAT_POKEMONS_BASE_REWARD; // not balanced at all for some oak items

    export const ACTIVE_QUEST_MULTIPLIER      = 4;

    export const QuestTypes = [
        "DefeatPokemons",
        "CapturePokemons",
        "GainMoney",
        "GainTokens",
        "GainShards",
        "HatchEggs",
        "MineLayers",
        "CatchShinies",
        "DefeatGym",
        "DefeatDungeon",
        "UsePokeball",
        "UseOakItem",
        "HarvestBerriesQuest",
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
        "None" = -1,
        "Pokeball" = 0,
        "Greatball" = 1,
        "Ultraball" = 2,
        "Masterball" = 3,
    }

    export enum Currency {
        money,
        questPoint,
        dungeontoken,
        diamond,
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

    export const PokeballCatchBonus = [
        0,
        5,
        10,
        100,
    ];

    export function getCatchBonus(ball: GameConstants.Pokeball) {
        return GameConstants.PokeballCatchBonus[ball];
    }

    export function humanifyString(str: string) {
        return str.replace(/_/g, ' ');
    }

    export function formatTime(time) {
        if (time == 0) {
            return "Ready"
        }
        let sec_num = parseInt('' + time, 10); // don't forget the second param
        let hours: any = Math.floor(sec_num / 3600);
        let minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds: any = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    }

    export enum Region {
        kanto = 0,
        johto = 1,
        hoenn = 2
    }

    export enum SortOptionsEnum {
        "id" = 0,
        "name" = 1,
        "attack" = 2,
        "levelObservable" = 3,
        "shiny" = 4
    }

    export class Option {
        text: String;
        value: any;

        constructor(text, value) {
            this.text = text;
            this.value = value;
        }
    }

    export const SortOptions = [
        new Option("Pokedex #", GameConstants.SortOptionsEnum.id),
        new Option("Name", GameConstants.SortOptionsEnum.name),
        new Option("Attack", GameConstants.SortOptionsEnum.attack),
        new Option("Level", GameConstants.SortOptionsEnum.levelObservable),
        new Option("Shiny", GameConstants.SortOptionsEnum.shiny),
    ];

    export const RegionRoute = {
        0: 25,
        1: 48,
        2: 0
    };

    export function randomIntBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export function clipNumber(num: number, min: number, max: number) {
        return Math.min(Math.max(num, min), max);
    }

    export enum Badge {
        "None" = 0,
        "Boulder" = 1,
        "Cascade" = 2,
        "Thunder" = 3,
        "Rainbow" = 4,
        "Soul" = 5,
        "Marsh" = 6,
        "Volcano" = 7,
        "Earth" = 8,
        "Elite_Lorelei" = 9,
        "Elite_Bruno" = 10,
        "Elite_Agatha" = 11,
        "Elite_Lance" = 12,
        "Elite_Champion" = 13,
        "Zephyr" = 14,
        "Hive" = 15,
        "Plain" = 16,
        "Fog" = 17,
        "Storm" = 18,
        "Mineral" = 19,
        "Glacier" = 20,
        "Rising" = 21,
        "Elite_Will" = 22,
        "Elite_Koga" = 23,
        "Elite_Bruno2" = 24,
        "Elite_Karen" = 25,
        "Elite_JohtoChampion" = 26,
    }

    export enum PokemonType {
        "None" = -1,
        "Normal" = 0,
        "Fire" = 1,
        "Water" = 2,
        "Electric" = 3,
        "Grass" = 4,
        "Ice" = 5,
        "Fighting" = 6,
        "Poison" = 7,
        "Ground" = 8,
        "Flying" = 9,
        "Psychic" = 10,
        "Bug" = 11,
        "Rock" = 12,
        "Ghost" = 13,
        "Dragon" = 14,
        "Dark" = 15,
        "Steel" = 16,
        "Fairy" = 17,
    }

    export enum TypeColor {
        Normal = "#A8A77A",
        Fire = "#EE8130",
        Water = "#6390F0",
        Electric = "#F7D02C",
        Grass = "#7AC74C",
        Ice = "#96D9D6",
        Fighting = "#C22E28",
        Poison = "#A33EA1",
        Ground = "#E2BF65",
        Flying = "#A98FF3",
        Psychic = "#F95587",
        Bug = "#A6B91A",
        Rock = "#B6A136",
        Ghost = "#735797",
        Dragon = "#6F35FC",
        Dark = "#705746",
        Steel = "#B7B7CE",
        Fairy = "#D685AD"
    }

    export enum LevelType {
        "slow",
        "mediumslow",
        "medium",
        "mediumfast",
        "fast"
    }

    // Map navigation
    export const AMOUNT_OF_ROUTES = 48;
    export const AMOUNT_OF_ROUTES_KANTO = 25;

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
        }
    };

    export const routeBadgeRequirements = {
        0: {
            3: GameConstants.Badge.Boulder,
            5: GameConstants.Badge.Cascade,
            7: GameConstants.Badge.Thunder,
            8: GameConstants.Badge.Thunder,
            9: GameConstants.Badge.Cascade,
            11: GameConstants.Badge.Thunder,
            12: GameConstants.Badge.Marsh,
            13: GameConstants.Badge.Marsh,
            16: GameConstants.Badge.Marsh,
            19: GameConstants.Badge.Soul,
            21: GameConstants.Badge.Volcano,
            22: GameConstants.Badge.Earth,
            24: GameConstants.Badge.Cascade,
        },
        1: {
            28: GameConstants.Badge.Elite_JohtoChampion,
            32: GameConstants.Badge.Zephyr,
            34: GameConstants.Badge.Hive,
            35: GameConstants.Badge.Plain,
            38: GameConstants.Badge.Fog,
            42: GameConstants.Badge.Mineral,
            43: GameConstants.Badge.Glacier,
            44: GameConstants.Badge.Glacier,
            45: GameConstants.Badge.Rising,
        }
    };

    export const routeDungeonRequirements = {
        0: {
            4: "Mt. Moon",
            20: "Seafoam Islands",
        },
        1: {
            33: "Union Cave",
            34: "Ilex Forest"
        }
    }

    export enum Starter {
        "None" = -1,
        "Bulbasaur" = 0,
        "Charmander" = 1,
        "Squirtle" = 2,
    }

    export const ItemPrice = {
        // Money
        "Pokeball": 100,
        "Greatball": 500,
        "Ultraball": 2000,
        "Masterball": 2500,

        "xAttack": 600,
        "xClick": 400,
        "xExp": 800,
        "Token_collector": 1000,
        "Item_magnet": 1500,
        "Lucky_incense": 2000,

        "SmallRestore": 20000,
        "MediumRestore": 40000,
        "LargeRestore": 100000,

        "PokeBlock": Infinity,

        "Protein": Infinity,
        "RareCandy": Infinity,

        // Quest points
        "Eevee": 5000,
        "Porygon": 2000,
        "Jynx": 2500,
        "Mr. Mime": 1500,
        "Lickitung": 1000,
        "Togepi": 2500,

        // TODO: Set prices for different kinds of eggs and stones
        "Egg": 1000,
        "EvolutionStone": 2500,

        "Dungeon_ticket": 250,
        "Explorer_kit": 5000,
    };

    export enum StoneType {
        Fire_stone,
        Water_stone,
        Thunder_stone,
        Leaf_stone,
        Moon_stone,
        Sun_stone,
        Trade_stone,
        Dragon_scale,
        Metal_coat,
        Kings_rock,
        Upgrade,
        Time_stone,
    }

    export enum BattleItemType {
        xAttack = "xAttack",
        xClick = "xClick",
        xExp = "xExp",
        Token_collector = "Token_collector",
        Item_magnet = "Item_magnet",
        Lucky_incense = "Lucky_incense"
    }

    export enum PokemonItemType {
        "Eevee",
        "Porygon",
        "Jynx",
        "Mr. Mime",
        "Lickitung",
        "Togepi",
    }

    export enum BerryType {
        Cheri,
        Chesto,
        Pecha,
        Rawst,
        Aspear,
        Leppa,
        Oran,
        Sitrus
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
        Fire_egg,
        Water_egg,
        Grass_egg,
        Fighting_egg,
        Electric_egg,
        Dragon_egg,
        Pokemon_egg,
        Mystery_egg,
    }

    export enum KeyItemType {
        Dungeon_ticket,
        Explorer_kit,
    }

    export enum EggType {
        Fire,
        Water,
        Grass,
        Fighting,
        Electric,
        Dragon,
        Pokemon,
        Mystery,
        Fossil
    }

    export const EnergyRestoreEffect = {
        SmallRestore: 0.1,
        MediumRestore: 0.2,
        LargeRestore: 0.5,
    }

    export const KeyToDirection = {
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        65: "left", //a
        68: "right", //d
        83: "down", //s
        87: "up", //w
    }

    export const FossilToPokemon = {
        "Helix Fossil": "Omanyte",
        "Dome Fossil": "Kabuto",
        "Old Amber": "Aerodactyl",
    }

    //Used for image name
    export const PokemonToFossil = {
        "Omanyte": "helix",
        "Kabuto": "dome",
        "Aerodactyl": "amber",

    }

    // For random quest, name matches entry in gymList (created in Gym.ts)
    export const KantoGyms = [
        "Pewter City",
        "Cerulean City",
        "Vermillion City",
        "Celadon City",
        "Saffron City",
        "Fuchsia City",
        "Cinnabar Island",
        "Viridian City",
        "Elite Lorelei",
        "Elite Bruno",
        "Elite Agatha",
        "Elite Lance",
        "Champion Blue",
    ];

    export const JohtoGyms = [
        "Violet City",
        "Azalea Town",
        "Goldenrod City",
        "Ecruteak City",
        "Cianwood City",
        "Olivine City",
        "Mahogany Town",
        "Blackthorn City",
        "Elite Will",
        "Elite Koga",
        "Elite Bruno2",
        "Elite Karen",
        "Champion Lance"
    ];

    export const RegionGyms = [
      KantoGyms,
      JohtoGyms
    ];

    export const KantoDungeons = [
        "Viridian Forest",
        "Digletts Cave",
        "Mt. Moon",
        "Rock Tunnel",
        "Power Plant",
        "Pokemon Tower",
        "Seafoam Islands",
        "Pokemon Mansion",
        "Victory Road",
        "Cerulean Cave"
    ];

    export const JohtoDungeons = [
        "Sprout Tower",
        "Ruins of Alph",
        "Union Cave",
        "Slowpoke Well",
        "Ilex Forest",
        "Burned Tower",
        "Tin Tower",
        "Whirl Islands",
        "Mt Mortar",
        "Ice Path",
        "Dark Cave",
        "Mt Silver"
    ];

    export const RegionDungeons = [
      KantoDungeons,
      JohtoDungeons
    ];

    export const StartingTowns = [
        "Pallet Town",
        "New Bark Town",
    ];

    export const pokemonsNeededToTravel = [
        151,
        252, // Should be 251, set to 252 in case gen 3 isn't added before beta
    ];
}
