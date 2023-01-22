import { Observable } from 'knockout';
import { Pokeball } from '../GameConstants';
import { descriptions, PokeballFilterOptions } from './PokeballFilterOptions';

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

    get description(): string {
        return `This filter matches pokemon that: ${
            Object.entries(this.options)
                .map(([opt, value]) => descriptions[opt](value))
                .join('; ')
        }.`;
    }

    toJSON() {
        return {
            name: this.name,
            options: this.options,
            ball: this.ball(),
        };
    }
}
