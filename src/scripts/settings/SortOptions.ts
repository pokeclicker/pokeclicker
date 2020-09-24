enum SortOptions {
    'id' = 0,
    'name' = 1,
    'attack' = 2,
    'level' = 3,
    'shiny' = 4,
    'baseAttack' = 5,
    'breedingEffiency' = 6,
    'highestRegionBreedingEfficiency' = 7,
}

type SortOptionConfig = {
    // Display text in sort dropdown
    text: string;

    // How to get the comparison value from a PartyPokemon
    getValue: (p: PartyPokemon) => any;

    // true if the default sort direction should be descending
    invert?: boolean;
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
        'invert': true,
    },

    [SortOptions.level]: {
        'text': 'Level',
        'getValue': p => p.level,
        'invert': true,
    },

    [SortOptions.shiny]: {
        'text': 'Shiny',
        'getValue': p => +App.game.party.shinyPokemon.includes(p.id),
        'invert': true,
    },

    [SortOptions.baseAttack]: {
        'text': 'Base Attack',
        'getValue': p => p.baseAttack,
        'invert': true,
    },

    [SortOptions.breedingEffiency]: {
        'text': 'Breeding Efficiency',
        'getValue': p => (p.baseAttack / pokemonMap[p.name].eggCycles),
        'invert': true,
    },

    [SortOptions.highestRegionBreedingEfficiency]: {
        'text': 'HRBE',
        'getValue': p => (p.baseAttack / pokemonMap[p.name].eggCycles * (PokemonHelper.calcNativeRegion(p.name) < player.highestRegion() ? (player.highestRegion() + 1) * 0.1 : 1)),
        'invert': true,
    },
};
