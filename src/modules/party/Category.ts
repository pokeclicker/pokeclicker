/* eslint-disable no-param-reassign */
import {
    Observable as KnockoutObservable,
    Subscription as KnockoutSubscription,
    ObservableArray as KnockoutObservableArray,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import BreedingFilters from '../settings/BreedingFilters';
import PokedexFilters from '../settings/PokedexFilters';
import Settings from '../settings/Settings';

export type PokemonCategory = {
    id: KnockoutObservable<number>,
    name: KnockoutObservable<string>,
    color: KnockoutObservable<string>,
    subscriber?: KnockoutSubscription,
};

export default class PokemonCategories implements Saveable {
    public static categories: KnockoutObservableArray<PokemonCategory> = ko.observableArray([]);

    saveKey = 'categories';
    defaults: Record<string, any> = {};

    public static initialize() {
        PokemonCategories.addCategory('None', '#333333'); // dark grey
        PokemonCategories.addCategory('Favorite', '#e74c3c'); // red
    }

    public static reset() {
        App.game.party.caughtPokemon.forEach((p) => {
            if (p.category) {
                p.category = 0;
            }
        });
        let max = 0;
        PokemonCategories.categories().forEach(c => {
            max = Math.max(max, c.id());
        });
        while (max >= 0) {
            PokemonCategories.removeCategory(max, true);
            max--;
        }
        PokemonCategories.initialize();
    }

    public static addCategory(name: string, color: string, id: number = -1): void {
        if (id === -1) {
            PokemonCategories.categories().forEach(c => {
                id = Math.max(id, c.id());
            });
            id++;
        }
        const cat: PokemonCategory = { name: ko.observable(name), color: ko.observable(color), id : ko.observable(id) };
        PokemonCategories.categories.push(cat);

        // Subscribe to color change event
        const root = document.documentElement;
        cat.subscriber = cat.color.subscribe((value) => {
            root.style.setProperty(`--pokemon-category-${id + 1}`, value);
        });
        // Update the color now
        cat.color.valueHasMutated();
    }

    public static removeCategory(id: number, force = false): void {
        // Cannot remove None or Favorite categories
        if ((!force && id < 2)) {
            return;
        }
        const index = PokemonCategories.categories().findIndex(c => c.id() == id);
        // Is this case expected to happen ?
        if (index === -1) {
            return;
        }
        const cat = PokemonCategories.categories()[index];

        App.game.party.caughtPokemon.forEach((p) => {
            if (+p.category === cat.id()) {
                p.category = 0;
            }
        });
        // Remove subscriber
        cat.subscriber?.dispose();
        // Remove category
        PokemonCategories.categories.splice(index, 1);
        // Update Pokedex/Breeding filters
        if (PokedexFilters.category.value() === cat.id()) {
            PokedexFilters.category.value(-1);
        }
        Settings.setSettingByName('pokedexCategoryFilter', PokedexFilters.category.value());
        
        if (BreedingFilters.category.value() === cat.id()) {
            BreedingFilters.category.value(-1);
        }
        Settings.setSettingByName('breedingCategoryFilter', BreedingFilters.category.value());
    }

    toJSON(): Record<string, any> {
        const categories = [];
        PokemonCategories.categories().forEach((c) => {
            categories.push({
                id: c.id(),
                name: encodeURI(c.name()),
                color: c.color(),
            });
        });
        return {
            categories,
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }

        json.categories?.forEach((category) => {
            const cat = PokemonCategories.categories().find(c => c.id() == category.id);
            if (cat) {
                cat.name(decodeURI(category.name));
                cat.color(category.color);
            } else {
                PokemonCategories.addCategory(decodeURI(category.name), category.color, category.id);
            }
        });
    }
}

PokemonCategories.initialize();
