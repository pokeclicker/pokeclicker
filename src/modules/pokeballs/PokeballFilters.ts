/* eslint-disable class-methods-use-this */
import { ObservableArray } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import KeyItemType from '../enums/KeyItemType';
import { Pokeball, Pokerus } from '../GameConstants';
import PokeballFilter, { PokeballFilterParams } from './PokeballFilter';
import { PokeballFilterOptions } from './PokeballFilterOptions';

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
        () => this.list()
            .filter((f) => !PokeballFilters.hideFilter(f))
            .reverse(),
    );

    public static hideFilter(filter: PokeballFilter) {
        return filter.options.pokerus !== undefined && !App.game.keyItems.hasKeyItem(KeyItemType.Pokerus_virus);
    }

    initialize() {}

    canAccess() { return true; }

    update() {}

    getFilterByName(name: string) {
        return this.list().find((filter) => filter.name === name);
    }

    findMatch(data: PokeballFilterOptions): PokeballFilter | undefined {
        return this.list().find((filter) => filter.test(data));
    }

    toJSON() {
        return {
            list: ko.toJS(this.list),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json === null) {
            return;
        }

        const list: PokeballFilterParams[] = json.list.length > 0
            ? json.list
            : this.presets;

        list.forEach(({ name, options, ball }) => {
            this.list.push(new PokeballFilter(
                name,
                options,
                ball,
            ));
        });
    }
}
