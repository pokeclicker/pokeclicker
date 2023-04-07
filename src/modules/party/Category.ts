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
import GameHelper from '../GameHelper';

export type PokemonCategory = {
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
        let categoryIndex = PokemonCategories.categories().length;
        while (categoryIndex-- > 0) {
            PokemonCategories.removeCategory(categoryIndex, true);
        }
        PokemonCategories.initialize();
    }

    public static addCategory(name: string, color: string): void {
        PokemonCategories.categories.push({ name: ko.observable(name), color: ko.observable(color) });

        // Subscribe to color change event
        const root = document.documentElement;
        const index = PokemonCategories.categories().length - 1;
        PokemonCategories.categories()[index].subscriber = PokemonCategories.categories()[index].color.subscribe((value) => {
            root.style.setProperty(`--pokemon-category-${index + 1}`, value);
        });
        // Update the color now
        PokemonCategories.categories()[index].color.valueHasMutated();
    }

    public static removeCategory(index: number, force = false): void {
        // Cannot remove None category
        if ((!force && !index) || !PokemonCategories.categories()[index]) {
            return;
        }

        App.game.party.caughtPokemon.forEach((p) => {
            if (+p.category === index) {
                p.category = 0;
            }
            if (p.category > index) {
                p.category--;
            }
        });
        // Remove subscriber
        PokemonCategories.categories()[index].subscriber?.dispose();
        // Remove category
        PokemonCategories.categories.splice(index, 1);
        // Update Pokedex/Breeding filters
        if (PokedexFilters.category.value() === index) {
            PokedexFilters.category.value(-1);
        }
        if (PokedexFilters.category.value() > index) {
            GameHelper.incrementObservable(PokedexFilters.category.value, -1);
        }
        Settings.setSettingByName('pokedexCategoryFilter', PokedexFilters.category.value());
        
        if (BreedingFilters.category.value() === index) {
            BreedingFilters.category.value(-1);
        }
        if (BreedingFilters.category.value() > index) {
            GameHelper.incrementObservable(BreedingFilters.category.value, -1);
        }
        Settings.setSettingByName('breedingCategoryFilter', BreedingFilters.category.value());

        // Update CSS
        PokemonCategories.categories().forEach((cat, id) => {
            if (id >= index) {
                document.documentElement.style.setProperty(`--pokemon-category-${id + 1}`, cat.color());
            }
        });
    }

    toJSON(): Record<string, any> {
        const categories = [];
        PokemonCategories.categories().forEach((c) => {
            categories.push({
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

        json.categories?.forEach((category, index) => {
            const cat = PokemonCategories.categories()[index];
            if (cat) {
                cat.name(decodeURI(category.name));
                cat.color(category.color);
            } else {
                PokemonCategories.addCategory(decodeURI(category.name), category.color);
            }
        });
    }
}

PokemonCategories.initialize();
