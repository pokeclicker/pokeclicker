import { Observable } from 'knockout';
import { Pokeball, Pokerus } from '../GameConstants';

export type PokeballFilterOptions = {
    shiny?: boolean;
    caught?: boolean;
    pokerus?: Pokerus;
};

export type PokeballFilterParams = {
    name: PokeballFilter['name'];
    options: PokeballFilter['options'];
    ball?: Pokeball;
};

export default class PokeballFilter {
    public ball: Observable<Pokeball>;

    constructor(
        public name: string,
        public options: PokeballFilterOptions,
        ball: Pokeball = Pokeball.None,
    ) {
        this.ball = ko.observable(ball);
    }

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
