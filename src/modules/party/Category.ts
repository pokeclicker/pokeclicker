/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import {
    Observable as KnockoutObservable,
    Subscription as KnockoutSubscription,
    ObservableArray as KnockoutObservableArray,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';

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
        this.addCategory('None', '#333333'); // dark grey
        this.addCategory('Favorite', '#e74c3c'); // red
    }

    public static reset() {
        App.game.party.caughtPokemon.forEach((p) => {
            if (p.category) {
                p.category = 0;
            }
        });
        let categoryIndex = this.categories().length;
        while (categoryIndex-- > 0) {
            this.removeCategory(categoryIndex, true);
        }
        this.initialize();
    }

    public static addCategory(name: string, color: string): void {
        this.categories.push({ name: ko.observable(name), color: ko.observable(color) });

        // Subscribe to color change event
        const root = document.documentElement;
        const index = this.categories().length - 1;
        this.categories()[index].subscriber = this.categories()[index].color.subscribe((value) => {
            root.style.setProperty(`--pokemon-category-${index + 1}`, value);
        });
        // Update the color now
        this.categories()[index].color.valueHasMutated();
    }

    public static removeCategory(index: number, force = false): void {
        // Cannot remove None category
        if ((!force && !index) || !this.categories()[index]) {
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
        this.categories()[index].subscriber?.dispose();
        // Remove category
        PokemonCategories.categories.splice(index, 1);
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
