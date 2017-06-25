namespace gameConstants {
    export const TICK_TIME = 10;
    export const BATTLE_TICK = 1000;
    export const UNDERGROUND_TICK = 1000;
    export const FARM_TICK = 1000;
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
        normal = 0,
        fight = 1,
        flying = 2,
        poison = 3,
        ground = 4,
        rock = 5,
        bug = 6,
        ghost = 7,
        steel = 8,
        fire = 9,
        water = 10,
        grass = 11,
        electric = 12,
        psychic = 13,
        ice = 14,
        dragon = 15,
        dark = 16,
        fairy = 17,
    }
}

