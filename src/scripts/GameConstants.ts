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
    export const FARM_TICK = 1000;
    export const SAVE_TICK = 10000;
    export const GYM_TIME = 3000;
    export const GYM_TICK = 1;

    export const AMOUNT_OF_POKEMONS = 151;

    // Shinies
    export const SHINY_CHANCE_BATTLE = 8192;
    export const SHINY_CHANCE_DUNGEON = 4096;
    export const SHINY_CHANCE_BREEDING = 4096;
    export const SHINY_CHANCE_SAFARI = 2048;

    export const ITEM_PRICE_MULTIPLIER = 1.02;
    export const ITEM_PRICE_DEDUCT = 0.003;

    //Underground
    export const Mine = {
        "sizeY": 12,
        "sizeX": 25
    }

    export const HAMMER_ENERGY = 3;
    export const CHISEL_ENERGY = 1;

    export enum MineTool {
        "Chisel" = 0,
        "Hammer" = 1,
    }

    export const EvoStones = [
        "Fire Stone",
        "Water Stone",
        "Thunder Stone",
        "Leaf Stone",
        "Moon Stone"
    ];

    export const PLATE_VALUE = 25;

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

    export enum OakItem {
        "Magic Ball" = 0,
        "Amulet Coin",
        "Poison Barb",
        "Exp Share",
        "Sprayduck",
        "Shiny Charm",
        "Blaze Cassette",
        "Cell Battery",
    }

    // Dungeons
    export const DUNGEON_SIZE = 5;
    export const DUNGEON_CHEST_SHOW = 2;
    export const DUNGEON_MAP_SHOW = 4;

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
        questpoint,
        dungeontoken,
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

    class Option {
        optionText: String;
        optionValue: GameConstants.SortOptionsEnum;

        constructor(text, value) {
            this.optionText = text;
            this.optionValue = value;
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
        1: 0,
        2: 0
    };

    export function randomIntBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
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
        "Lorelei" = 9,
        "Bruno" = 10,
        "Agatha" = 11,
        "Lance" = 12,
        "Champion" = 13,
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

    export enum LevelType {
        "slow",
        "mediumslow",
        "medium",
        "mediumfast",
        "fast"
    }

    // Map navigation
    export const AMOUNT_OF_ROUTES = 25;
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
        }
    };

    export enum Starter {
        "None" = -1,
        "Bulbasaur" = 0,
        "Charmander" = 1,
        "Squirtle" = 2,
    }

    export enum StoneType {
        Fire,
        Water,
        Thunder,
        Leaf,
        Moon,
        Sun,
    }

    export enum BattleItemType {
        xAttack,
        xClick,
        xExp,
        XToken,
        xItem
    }

    export enum BerryType {
        Cheri,
        Chesto,
        Pecha,
        Rawst,
        Aspear,
        Leppa,
        Oran
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

    export enum EggType {
        Fire,
        Water,
        Grass,
        Fight,
        Electric,
        Dragon,
        Pokemon,
        Mystery,
        Fossil,
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
}

