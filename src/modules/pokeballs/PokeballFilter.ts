import { Observable } from 'knockout';
import { Pokeball } from '../GameConstants';
import Setting from '../settings/Setting';
import { descriptions, PokeballFilterOptions, settingsMap } from './PokeballFilterOptions';

export type PokeballFilterParams = {
    name: PokeballFilter['name'];
    options: PokeballFilterOptions;
    ball?: Pokeball;
};

export default class PokeballFilter {
    public ball: Observable<Pokeball>;
    public options: {
        [K in keyof PokeballFilterOptions]:Setting<PokeballFilterOptions[K]>
    };

    constructor(
        public name: string,
        options: PokeballFilterOptions,
        ball: Pokeball = Pokeball.None,
    ) {
        this.ball = ko.observable(ball);
        console.log(options);
        this.options = Object.fromEntries(
            Object.entries(options).map(([k, v]) => [k, settingsMap[k](v)]),
        );
    }

    test(data: PokeballFilterOptions) {
        return Object.entries(this.options).every(
            ([key, setting]) => data[key] === setting.value,
        );
    }

    get description(): string {
        return `This filter matches pokemon that: ${
            Object.entries(this.options)
                .map(([opt, setting]) => descriptions[opt](setting.value))
                .join('; ')
        }.`;
    }

    toJSON() {
        return {
            name: this.name,
            options: Object.fromEntries(
                Object.entries(this.options).map(([k, s]) => [k, s.value]),
            ),
            ball: this.ball(),
        };
    }
}
