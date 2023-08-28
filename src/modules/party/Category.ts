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
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';

export type PokemonCategory = {
    id: number,
    name: KnockoutObservable<string>,
    color: KnockoutObservable<string>,
    subscriber?: KnockoutSubscription,
};

export default class PokemonCategories implements Saveable {
    public static categories: KnockoutObservableArray<PokemonCategory> = ko.observableArray([]);

    saveKey = 'categories';
    defaults: Record<string, any> = {};

    public static initialize() {
        PokemonCategories.addCategory('None', '#333333', 0); // dark grey
        PokemonCategories.addCategory('Favorite', '#e74c3c', 1); // red
    }

    public static reset() {
        App.game.party.caughtPokemon.forEach((p) => {
            if (p.category) {
                p.category = 0;
            }
        });
        [...PokemonCategories.categories()].forEach(c => {
            PokemonCategories.removeCategory(c.id, true);
        });
        PokemonCategories.initialize();
    }

    public static addCategory(name: string, color: string, id: number = -1): void {
        if (id === -1) {
            PokemonCategories.categories().forEach(c => {
                id = Math.max(id, c.id);
            });
            id++;
        }
        const cat: PokemonCategory = { name: ko.observable(name), color: ko.observable(color), id : id };
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
        const index = PokemonCategories.categories().findIndex(c => c.id == id);
        // Is this case expected to happen ?
        if (index === -1) {
            return;
        }
        const cat = PokemonCategories.categories()[index];
        // Cannot remove None or Favorite categories
        if (!force && cat.id < 2) {
            return;
        }

        const pokeballFilter = App.game.pokeballFilters.list().find(f => f.options?.category?.observableValue() == cat.id);
        if (pokeballFilter) {
            Notifier.notify({
                title: 'Remove Category',
                message: `This category is in use by the <strong>${pokeballFilter.name}</strong> Pokéball filter and cannot be removed.`,
                type: NotificationConstants.NotificationOption.danger,
                timeout: 1e4,
            });
            return;
        }

        App.game.party.caughtPokemon.forEach((p) => {
            if (+p.category === cat.id) {
                p.category = 0;
            }
        });

        // Remove category from hatchery helper filters if selected
        App.game.breeding.hatcheryHelpers.available().forEach((helper) => {
            const idx = helper.categories().indexOf(cat.id);
            if (idx > -1) {
                helper.categories().splice(idx, 1);
            }
        });

        // Remove subscriber
        cat.subscriber?.dispose();
        // Remove category
        PokemonCategories.categories.splice(index, 1);
        // Update Pokedex/Breeding filters
        if (PokedexFilters.category.value() === cat.id) {
            PokedexFilters.category.value(-1);
            Settings.setSettingByName('pokedexCategoryFilter', PokedexFilters.category.value());
        }
        if (BreedingFilters.category.value() === cat.id) {
            BreedingFilters.category.value(-1);
            Settings.setSettingByName('breedingCategoryFilter', BreedingFilters.category.value());
        }
    }

    toJSON(): Record<string, any> {
        const categories = [];
        PokemonCategories.categories().forEach((c) => {
            categories.push({
                id: c.id,
                name: c.name(),
                color: c.color(),
            });
        });
        return {
            categories,
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (!json?.categories) {
            return;
        }

        const categoryOrder = json.categories?.map(c => c.id);
        json.categories?.forEach((category) => {
            const cat = PokemonCategories.categories().find(c => c.id == category.id);
            if (cat) {
                cat.name(category.name);
                cat.color(category.color);
            } else {
                PokemonCategories.addCategory(category.name, category.color, category.id);
            }
        });

        PokemonCategories.categories().sort((a, b) => categoryOrder.indexOf(a.id) - categoryOrder.indexOf(b.id));
    }
}

PokemonCategories.initialize();
