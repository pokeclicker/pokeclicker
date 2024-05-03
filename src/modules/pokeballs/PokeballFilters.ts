/* eslint-disable class-methods-use-this */
import { ObservableArray } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import { Pokeball, Pokerus } from '../GameConstants';
import PokeballFilter, { PokeballFilterParams } from './PokeballFilter';
import { PokeballFilterMatchData, PokeballFilterOptions, pokeballFilterOptions } from './PokeballFilterOptions';
import Notifier from '../notifications/Notifier';
import NotificationOption from '../notifications/NotificationOption';
import { findRight } from '../utilities/arrayUtils';
import Settings from '../settings';
import PokemonType from '../enums/PokemonType';

export default class PokeballFilters implements Feature {
    name = 'Pokeball Filters';
    saveKey = 'pokeballFilters';
    defaults = {};

    public presets: PokeballFilterParams[] = [
        { name: 'New Shiny', options: { shiny: true, caughtShiny: false }, ball: Pokeball.Pokeball },
        { name: 'New', options: { caught: false }, ball: Pokeball.Pokeball },
        { name: 'Caught Shiny', options: { shiny: true, caughtShiny: true }, ball: Pokeball.Pokeball },
        { name: 'Contagious', options: { pokerus: Pokerus.Contagious } },
        { name: 'Caught', options: { caught: true } },
    ];

    public list: ObservableArray<PokeballFilter> = ko.observableArray([]);
    public displayList = ko.pureComputed(
        () => this.list().filter((f) => !PokeballFilters.hideFilter(f)),
    );

    public testSettings = (() => {
        const settings = Object.fromEntries(
            Object.entries(pokeballFilterOptions).map(([k, pfo]) => [k, pfo.createSetting()]),
        );

        // Create two Pokemon Type settings
        delete settings.pokemonType;
        settings.type1 = pokeballFilterOptions.pokemonType.createSetting(
            PokemonType.Normal, 'pokeballFilterPokemonType1', 'Pokémon Type 1',
        );
        settings.type2 = pokeballFilterOptions.pokemonType.createSetting(
            PokemonType.Normal, 'pokeballFilterPokemonType2', 'Pokémon Type 2',
        );

        return settings;
    })();
    public testSettingsData = ko.pureComputed(() => {
        const data: any = Object.fromEntries(Object.entries(this.testSettings).map(([k, v]) => [k, v.observableValue()]));

        // Handle Pokemon Types
        data.pokemonType = [data.type1, data.type2];
        delete data.type1;
        delete data.type2;

        data.category = [data.category];

        return data;
    });

    public static hideFilter(filter: PokeballFilter) {
        return Object.keys(filter.options).some(
            (k) => !pokeballFilterOptions[k].canUse(),
        );
    }

    initialize() {
        this.testSettings.caught.observableValue.subscribe((isCaught) => {
            if (!isCaught) {
                // If not caught, we can't have shiny or shadow either
                this.testSettings.caughtShiny.observableValue(false);
                this.testSettings.caughtShadow.observableValue(false);
            }
        }, undefined, undefined);

        this.testSettings.caughtShiny.observableValue.subscribe((isCaughtShiny) => {
            if (isCaughtShiny) {
                this.testSettings.caught.observableValue(true);
            }
        }, undefined, undefined);

        this.testSettings.caughtShadow.observableValue.subscribe((isCaughtShadow) => {
            if (isCaughtShadow) {
                this.testSettings.caught.observableValue(true);
            }
        }, undefined, undefined);

        Settings.getSetting('catchFilters.invertPriorityOrder').observableValue.subscribe(() => this.list.reverse());
    }

    canAccess() { return true; }

    update() {}

    getFilterByName(name: string) {
        return this.list().find((filter) => filter.name === name);
    }

    findMatch(data: PokeballFilterMatchData): PokeballFilter | undefined {
        return Settings.getSetting('catchFilters.invertPriorityOrder').value
            ? findRight(this.displayList(), (filter) => filter.test(data))
            : this.displayList().find((filter) => filter.test(data));
    }

    async deleteFilter(filter: PokeballFilter) {
        if (await Notifier.confirm({
            title: 'Delete pokeball filter',
            message: `Are you sure you want to delete "${filter.name}"?`,
            type: NotificationOption.danger,
            confirm: 'Delete',
        })) {
            this.list.remove(filter);
        }
    }

    createFilter() {
        const enabled = Settings.getSetting('catchFilters.initialEnabled').value;
        this.list.unshift(new PokeballFilter('New Filter', {}, Pokeball.Pokeball, enabled));
    }

    addFilterOption(filter: PokeballFilter, option: keyof PokeballFilterOptions) {
        if (filter.options[option]) {
            // Don't replace the option if it exists already
            return;
        }
        const newOptions = {
            ...filter.options,
            [option]: pokeballFilterOptions[option].createSetting(),
        };
        filter.options = newOptions;
    }

    removeFilterOption(filter: PokeballFilter, option: keyof PokeballFilterOptions) {
        // Make a copy to put in observable, to make sure UI is updated properly
        const newOptions = { ...filter.options };
        delete newOptions[option];
        filter.options = newOptions;
    }

    async reset() {
        if (!(await Notifier.confirm({
            title: 'Reset filters to defaults',
            message: 'Are you sure you want to reset your filters to the default ones?',
        }))) {
            return;
        }

        const defaultFilters = this.presets.map(({ name, options, ball, enabled, inverted }) => (
            new PokeballFilter(name, options, ball, enabled, inverted)
        ));

        if (Settings.getSetting('catchFilters.invertPriorityOrder').value) {
            defaultFilters.reverse();
        }

        this.list(defaultFilters);
    }

    toJSON() {
        return {
            list: this.list().map((pf) => pf.toJSON()),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json === null) {
            return;
        }

        const list: PokeballFilterParams[] = json.list?.length > 0
            ? json.list
            : Settings.getSetting('catchFilters.invertPriorityOrder').value
                ? [...this.presets].reverse()
                : this.presets;

        list.forEach(({ name, options, ball, inverted, enabled }) => {
            this.list.push(new PokeballFilter(
                name,
                options,
                ball,
                enabled,
                inverted,
            ));
        });
    }
}
