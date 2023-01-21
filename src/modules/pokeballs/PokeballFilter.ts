import { Pokerus } from '../GameConstants';

export type PokeballFilterOptions = {
    shiny?: boolean;
    caught?: boolean;
    pokerus?: Pokerus;
};

export type PokeballFilterParams = {
    name: PokeballFilter['name'];
    options: PokeballFilter['options'];
};

export default class PokeballFilter {
    constructor(
        public name: string,
        public options: PokeballFilterOptions,
    ) {}

    test(pokemon: PokeballFilterOptions) {
        Object.entries(this.options).every(
            ([key, value]) => pokemon[key] === value,
        );
    }

    toJSON() {
        return {
            name: this.name,
            options: this.options,
        };
    }
}
