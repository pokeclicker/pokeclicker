/* eslint-disable class-methods-use-this */
import { ObservableArray } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import PokeballFilter from './PokeballFilter';

export default class PokeballFilters implements Feature {
    name = 'Pokeball Filters';
    saveKey = 'pokeballFilters';
    defaults = {
        list: [],
    };

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

        json.list?.forEach((filterConfig) => {
            this.list.push(new PokeballFilter(
                filterConfig.name,
                filterConfig.options,
            ));
        });
    }
}
