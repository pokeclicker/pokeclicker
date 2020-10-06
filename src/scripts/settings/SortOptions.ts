enum SortOptions {
    'id' = 0,
    'name' = 1,
    'attack' = 2,
    'level' = 3,
    'shiny' = 4,
    'baseAttack' = 5,
    'breedingEfficiency' = 6,
    'eggCycles' = 7,
}

type SortOptionConfig = {
    // Display text in sort dropdown
    text: string;

    // How to get the comparison value from a PartyPokemon
    getValue: (p: PartyPokemon) => any;
}

const SortOptionConfigs: Record<SortOptions, SortOptionConfig> = {
    [SortOptions.id]: {
        'text': 'Pokemon #',
        'getValue': p => p.id,
    },

    [SortOptions.name]: {
        'text': 'Name',
        'getValue': p => p.name,
    },

    [SortOptions.attack]: {
        'text': 'Attack',
        'getValue': p => p.calculateAttack(),
    },

    [SortOptions.level]: {
        'text': 'Level',
        'getValue': p => p.level,
    },

    [SortOptions.shiny]: {
        'text': 'Shiny',
        'getValue': p => +App.game.party.shinyPokemon.includes(p.id),
    },

    [SortOptions.baseAttack]: {
        'text': 'Base Attack',
        'getValue': p => p.baseAttack,
    },

    [SortOptions.breedingEfficiency]: {
        'text': 'Breeding Efficiency',
        'getValue': p => (p.baseAttack / pokemonMap[p.name].eggCycles),
    },

    [SortOptions.eggCycles]: {
        'text': 'Egg Steps',
        'getValue': p => pokemonMap[p.name].eggCycles,
    },
};
