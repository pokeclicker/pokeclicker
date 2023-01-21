/* eslint-disable class-methods-use-this */
import { ObservableArray } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import { Pokeball, Pokerus } from '../GameConstants';
import PokeballFilter, { PokeballFilterParams } from './PokeballFilter';

export default class PokeballFilters implements Feature {
    name = 'Pokeball Filters';
    saveKey = 'pokeballFilters';
    defaults = {};

    public presets: PokeballFilterParams[] = [
        { name: 'New Shiny', options: { shiny: true, caught: false }, ball: Pokeball.Pokeball },
        { name: 'New', options: { caught: false }, ball: Pokeball.Pokeball },
        { name: 'Caught Shiny', options: { shiny: true, caught: true }, ball: Pokeball.Pokeball },
        { name: 'Caught Contagious', options: { caught: true, pokerus: Pokerus.Contagious } },
        { name: 'Caught', options: { caught: true } },
    ];

    public list: ObservableArray<PokeballFilter> = ko.observableArray([]);

    initialize() {}

    canAccess() { return true; }

    update() {}

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

        list.forEach((filterConfig) => {
            this.list.push(new PokeballFilter(
                filterConfig.name,
                filterConfig.options,
            ));
        });
    }
}
