import { Pokerus } from '../GameConstants';

interface PokeballFilterOptions {
    shiny?: boolean;
    caught?: boolean;
    pokerus?: Pokerus
}

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
