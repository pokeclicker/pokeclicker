export enum SortOptions {
    id = 0,
    name = 1,
    attack = 2,
    level = 3,
    shiny = 4,
    baseAttack = 5,
    attackBonus = 6,
    breedingEfficiency = 7,
    eggCycles = 8,
    timesHatched = 9,
    category = 10,
    vitaminsUsed = 11,
    evs = 12,
}

export type SortOptionConfig = {
    // Display text in sort dropdown
    text: string;

    // How to get the comparison value from a PartyPokemon
    // TODO: type this p as a PartyPokemon when it is available as a module
    getValue: (p) => any;

    // true if the default sort direction should be descending
    invert?: boolean;
};

export const SortOptionConfigs: Record<SortOptions, SortOptionConfig> = {
    [SortOptions.id]: {
        text: 'Pokémon ID #',
        getValue: (p) => p.id,
    },

    [SortOptions.name]: {
        text: 'Name',
        getValue: (p) => p.displayName,
    },

    [SortOptions.attack]: {
        text: 'Attack',
        getValue: (p) => p.attack,
    },

    [SortOptions.level]: {
        text: 'Level',
        getValue: (p) => p.level,
    },

    [SortOptions.shiny]: {
        text: 'Shiny',
        getValue: (p) => p.shiny,
    },

    [SortOptions.baseAttack]: {
        text: 'Base Attack',
        getValue: (p) => p.baseAttack,
    },

    [SortOptions.attackBonus]: {
        text: 'Attack Bonus',
        getValue: (p) => p.getBreedingAttackBonus(),
    },

    [SortOptions.breedingEfficiency]: {
        text: 'Breeding Efficiency',
        getValue: (p) => p.breedingEfficiency(),
    },

    [SortOptions.eggCycles]: {
        text: 'Egg Steps',
        getValue: (p) => p.getEggSteps(),
    },

    [SortOptions.timesHatched]: {
        text: 'Times Hatched',
        getValue: (p) => App.game.statistics.pokemonHatched[p.id]() || 0,
    },

    [SortOptions.category]: {
        text: 'Category',
        getValue: (p) => p.category,
        invert: true,
    },

    [SortOptions.vitaminsUsed]: {
        text: 'Vitamins Used',
        getValue: (p) => p.totalVitaminsUsed() || 0,
    },

    [SortOptions.evs]: {
        text: 'EVs',
        getValue: (p) => p.evs() || 0,
    },
};
