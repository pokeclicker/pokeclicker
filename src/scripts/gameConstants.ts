namespace gameConstants {
    export const TICK_TIME = 10;
    export const BATTLE_TICK = 1000;
    export const UNDERGROUND_TICK = 1000;
    export const FARM_TICK = 1000;


    // Shinies
    export const SHINY_CHANCE_BATTLE = 8192;
    export const SHINY_CHANCE_DUNGEON = 4096;
    export const SHINY_CHANCE_BREEDING = 4096;
    export const SHINY_CHANCE_SAFARI = 2048;

    export enum GameStates {
        paused = 0,
        fighting = 1,
        gym = 2,
        dungeon = 3,
        safari = 4,
    }

    export enum Regions {
        kanto = 0,
        johto = 1,
        hoenn = 2
    }

    export const RegionRoutes = {
        0: 25,
        1: 0,
        2: 0
    };


    export enum PokemonType {
        "Normal" = 0,
        "Fight" = 1,
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
}

