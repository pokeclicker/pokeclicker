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
        this.addCategory('None', '#333');           // dark grey
        this.addCategory('Red', '#e74c3c');         // red
        this.addCategory('Red 2', '#c0392b');       // dark red
        this.addCategory('Blue', '#3498db');        // blue
        this.addCategory('Blue 2', '#2980b9');      // dark blue
        this.addCategory('Green', '#2ecc71');       // green
        this.addCategory('Green 2', '#27ae60');     // dark green
        this.addCategory('Purple', '#9b59b6');      // purple
        this.addCategory('Purple 2', '#8e44ad');    // dark purple
        this.addCategory('Yellow', '#f1c40f');      // yellow
        this.addCategory('Yellow 2', '#f39c12');      // yellow
        this.addCategory('Orange', '#e67e22');      // orange
        this.addCategory('Orange 2', '#d35400');    // dark orange
        this.addCategory('Turquoise', '#1abc9c');   // turquoise
        this.addCategory('Turquoise 2', '#16a085'); // dark turquoise
    }

    public static reset() {
        App.game.party.caughtPokemon.forEach(p => {
            p.category = 0;
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
