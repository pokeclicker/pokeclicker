import { Pokerus } from '../GameConstants';

export type PokeballFilterOptions = {
    shiny?: boolean;
    caught?: boolean;
    caughtShiny?: boolean;
    pokerus?: Pokerus;
};

export const descriptions: {
    [K in keyof PokeballFilterOptions]-?: (value: PokeballFilterOptions[K]) => string
} = {
    shiny: (isShiny) => `are ${
        isShiny ? '' : 'not'
    } shiny`,

    caught: (isCaught) => `you have ${
        isCaught ? '' : 'not yet'
    } caught`,

    caughtShiny: (isCaughtShiny) => `you ${
        isCaughtShiny ? '' : 'don\'t'
    }  have shiny`,

    pokerus: (pokerusState) => `you have in the ${
        Pokerus[pokerusState]
    } pokerus state`,
};
