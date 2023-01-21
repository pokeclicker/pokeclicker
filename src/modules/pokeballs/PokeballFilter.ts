import { Observable } from 'knockout';
import { Pokeball, Pokerus } from '../GameConstants';

export type PokeballFilterOptions = {
    shiny?: boolean;
    caught?: boolean;
    caughtShiny?: boolean;
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

    test(data: PokeballFilterOptions) {
        return Object.entries(this.options).every(
            ([key, value]) => data[key] === value,
        );
    }

    toJSON() {
        return {
            name: this.name,
            options: this.options,
            ball: this.ball(),
        };
    }
}
