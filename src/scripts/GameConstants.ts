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
}

