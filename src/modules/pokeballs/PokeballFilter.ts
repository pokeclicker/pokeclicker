import { Observable, Unwrapped } from 'knockout';
import { Pokeball } from '../GameConstants';
import Setting from '../settings/Setting';
import { PokeballFilterMatchData, PokeballFilterOptions, pokeballFilterOptions } from './PokeballFilterOptions';

export type PokeballFilterParams = {
    name: string;
    options: PokeballFilterOptions;
    ball?: Pokeball;
    inverted?: boolean;
    enabled?: boolean;
};

export default class PokeballFilter {
    public ball: Observable<Pokeball>;
    public _options: Observable<{
        [K in keyof PokeballFilterOptions]:Setting<PokeballFilterOptions[K]>
    }>;
    public _name: Observable<string>;
    public enabled: Observable<boolean>;
    public inverted: Observable<boolean>;

    public uuid: string;

    constructor(
        name: string,
        options: PokeballFilterOptions,
        ball: Pokeball = Pokeball.None,
        enabled = true,
        inverted = false,
    ) {
        this._name = ko.observable(name);
        this.ball = ko.observable(ball);
        this._options = ko.observable(Object.fromEntries(
            Object.entries(options).map(
                ([k, v]) => [k, pokeballFilterOptions[k].createSetting(v)]),
        ));
        this.enabled = ko.observable(enabled);
        this.inverted = ko.observable(inverted);
        this.uuid = crypto.randomUUID();
    }

    test(data: PokeballFilterMatchData): boolean {
        if (!this.enabled()) {
            return false;
        }

        return this.inverted()
            // true if any option doesn't match
            ? Object.entries(this.options).some(
                ([key, setting]) => !pokeballFilterOptions[key].matchTest(
                    setting.observableValue(),
                    data[key],
                ),
            )
            // true only when all options match
            : Object.entries(this.options).every(
                ([key, setting]) => pokeballFilterOptions[key].matchTest(
                    setting.observableValue(),
                    data[key],
                ),
            );
    }

    get description(): string {
        const disabledText = this.enabled()
            ? ''
            : 'This filter is disabled.</br></br>';

        const optionList = Object.entries(this.options);
        if (optionList.length === 0) {
            return `${disabledText}${[
                'This filter will catch all Pokémon.',
            ].join('</br>')}`;
        }

        const bulletPoints = `<ul class="pokeballFilterOptionDescriptions">${
            optionList
                .map(([opt, setting]) => `<li>${
                    pokeballFilterOptions[opt].describe(
                        setting.observableValue(),
                    )
                }</li>`)
                .join('')
        }</ul>`;

        return `${disabledText}This filter affects wild Pokémon ${
            this.inverted()
                ? 'without'
                : 'with'
        } the combined traits of: ${bulletPoints}`;
    }

    get name(): string {
        return this._name();
    }

    set name(value: string) {
        this._name(value);
    }

    get options(): Unwrapped<typeof this._options> {
        return this._options();
    }

    set options(value: Unwrapped<typeof this._options>) {
        this._options(value);
    }

    toJSON(): Required<PokeballFilterParams> {
        return {
            name: this.name,
            options: Object.fromEntries(
                Object.entries(this.options).map(([k, s]) => [k, s.observableValue()]),
            ),
            ball: this.ball(),
            inverted: this.inverted(),
            enabled: this.enabled(),
        };
    }
}
