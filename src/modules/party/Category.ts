/* eslint-disable no-param-reassign */
import {
    Observable as KnockoutObservable,
    Subscription as KnockoutSubscription,
    ObservableArray as KnockoutObservableArray,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
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
    public static playerCategories = ko.pureComputed(() => PokemonCategories.categories().filter((cat) => cat.id > 0));
    // Pokedex & Hatchery category assign mode
    public static categoryAssignEnabled = ko.observable(false);
    public static categoryAssignSelected = ko.observable(0);

    saveKey = 'categories';
    defaults: Record<string, any> = {};

    public static initialize() {
        PokemonCategories.addCategory('None', '#333333', 0); // dark grey
        PokemonCategories.addCategory('Favorite', '#e74c3c', 1); // red
    }

    public static reset() {
        PokemonCategories.categoryAssignSelected(0);
        App.game.party.caughtPokemon.forEach((p) => {
            p.resetCategory();
        });
        [...PokemonCategories.categories()].forEach(c => {
            PokemonCategories.removeCategory(c.id, true);
        });
        ko.tasks.runEarly();
        PokemonCategories.initialize();
        const none = PokemonCategories.getCategoryById(0);
        none.name('None');
        none.color('#333333');
    }

    public static addCategory(name: string, color: string, id: number = -1): void {
        if (id === -1) {
            // Get next unused ID
            PokemonCategories.categories().forEach(c => {
                id = Math.max(id, c.id);
            });
            id++;
        } else {
            // Prevent adding an existing category
            // Really only used when resetting to preserve the None category
            if (PokemonCategories.categories().some(c => c.id === id)) {
                return;
            }
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
        // Cannot remove None category
        if (id === 0) {
            return;
        }

        const index = PokemonCategories.categories().findIndex(c => c.id == id);
        // Is this case expected to happen ?
        if (index === -1) {
            return;
        }

        const cat = PokemonCategories.categories()[index];
        const pokeballFilters = App.game.pokeballFilters.list().filter(f => f.options?.category?.observableValue() == cat.id);

        if (pokeballFilters.length) {
            if (force) {
                // Forced remove (reset filters)
                // When the category is used in a pokeball filter disable the filter and remove the category option.
                pokeballFilters.forEach(filter => {
                    filter.enabled(false);
                    App.game.pokeballFilters.removeFilterOption(filter, 'category');
                });
            } else {
                const filterNames = pokeballFilters.map(f => `<strong>${f.name}</strong>`);
                if (filterNames.length > 1) {
                    filterNames[filterNames.length - 1] = `and ${filterNames[filterNames.length - 1]}`;
                }
                const namesString = filterNames.join(filterNames.length > 2 ? ', ' : ' ');
                Notifier.notify({
                    title: 'Remove Category',
                    message: `This category is in use by the ${namesString} Pokéball filter${filterNames.length > 1 ? 's' : ''} and cannot be removed.`,
                    type: NotificationConstants.NotificationOption.danger,
                    timeout: 1e4,
                });
                return;
            }
        }

        // Remove category from pokemon
        App.game.party.caughtPokemon.forEach((p) => p.removeCategory(cat.id));

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
        if (Settings.getSetting('pokedexCategoryFilter').value === cat.id) {
            Settings.setSettingByName('pokedexCategoryFilter', -1);
        }
        if (Settings.getSetting('breedingCategoryFilter').value === cat.id) {
            Settings.setSettingByName('breedingCategoryFilter', -1);
        }
    }

    static getCategoryById(id: number) {
        return PokemonCategories.categories().find(c => c.id === id);
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
            const cat = PokemonCategories.getCategoryById(category.id);
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
