/**
 * Contains all game constants for easy access.
 */

namespace GameConstants {
    export const TICK_TIME = 10;
    export const BATTLE_TICK = 1000;
    export const UNDERGROUND_TICK = 1000;
    export const FARM_TICK = 1000;


    // Shinies
    export const SHINY_CHANCE_BATTLE = 8192;
    export const SHINY_CHANCE_DUNGEON = 4096;
    export const SHINY_CHANCE_BREEDING = 4096;
    export const SHINY_CHANCE_SAFARI = 2048;

    export enum GameState {
        idle = 0,
        paused = 1,
        fighting = 2,
        gym = 3,
        dungeon = 4,
        safari = 5,
    }

    export enum Pokeball {
        "None" = -1,
        "Pokeball" = 0,
        "Greatball" = 1,
        "Ultraball" = 2,
        "Masterball" = 3,
    }

    export enum Region {
        kanto = 0,
        johto = 1,
        hoenn = 2
    }

    export const RegionRoute = {
        0: 25,
        1: 0,
        2: 0
    };

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
        "Fighting" = 1,
        "Flying" = 2,
        "Poison" = 3,
        "Ground" = 4,
        "Rock" = 5,
        "Bug" = 6,
        "Ghost" = 7,
        "Steel" = 8,
        "Fire" = 9,
        "Water" = 10,
        "Grass" = 11,
        "Electric" = 12,
        "Psychic" = 13,
        "Ice" = 14,
        "Dragon" = 15,
        "Dark" = 16,
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
            11: [6, 12],
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
            13: GameConstants.Badge.Soul,
            16: GameConstants.Badge.Soul,
            19: GameConstants.Badge.Marsh,
            21: GameConstants.Badge.Volcano,
            22: GameConstants.Badge.Earth,
            24: GameConstants.Badge.Cascade,
        }
    };
}

