type PokemonCategory = {
    name: KnockoutObservable<string>,
    color: KnockoutObservable<string>,
}

class PokemonCategories implements Saveable {
    saveKey = 'categories';
    defaults = {};

    public static categories: KnockoutObservableArray<PokemonCategory> = ko.observableArray([]);
    
    constructor() {}

    public static initialize() {
        this.addCategory('None', '#333');        // dark grey
        this.addCategory('Favorite', '#e74c3c'); // red
    }

    public static reset() {
        App.game.party.caughtPokemon.forEach(p => {
            if (p.category) {
                p.category = 0;
            }
        });
        this.categories([]);
        this.initialize();
    }

    public static addCategory(name: string, color: string): void {
        this.categories.push({ name: ko.observable(name), color: ko.observable(color) });
    }

    public static removeCategory(index: number): void {
        // Cannot remove None category
        if (!index || !this.categories()[index]) {
            return;
        }

        App.game.party.caughtPokemon.forEach(p => {
            if (p.category == index) {
                p.category = 0;
            }
            if (p.category > index) {
                p.category--;
            }
        });
        PokemonCategories.categories.splice(index, 1);
    }

    toJSON(): Record<string, any> {
        return {
            categories: ko.toJS(PokemonCategories.categories),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }

        json.categories?.forEach((category, index) => {
            const cat = PokemonCategories.categories()[index];
            if (cat) {
                cat.name(category.name);
                cat.color(category.color);
            } else {
                PokemonCategories.categories()[index] = { name: ko.observable(category.name), color: ko.observable(category.color) };
            }
        });
    }
}

PokemonCategories.initialize();
