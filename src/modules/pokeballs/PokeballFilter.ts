import { Observable } from 'knockout';
import { Pokeball } from '../GameConstants';
import Setting from '../settings/Setting';
import { descriptions, PokeballFilterOptions, settingsMap } from './PokeballFilterOptions';

export type PokeballFilterParams = {
    name: string;
    options: PokeballFilterOptions;
    ball?: Pokeball;
};

export default class PokeballFilter {
    public ball: Observable<Pokeball>;
    public options: {
        [K in keyof PokeballFilterOptions]:Setting<PokeballFilterOptions[K]>
    };
    public _name: Observable<string>;

    constructor(
        name: string,
        options: PokeballFilterOptions,
        ball: Pokeball = Pokeball.None,
    ) {
        this._name = ko.observable(name);
        this.ball = ko.observable(ball);
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

    get name(): string {
        return this._name();
    }

    set name(value: string) {
        this._name(value);
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
