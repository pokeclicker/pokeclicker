type PokemonCategory = {
    name: KnockoutObservable<string>,
    color: KnockoutObservable<string>,
}

class PokemonCategories implements Saveable {
    saveKey = 'categories';
    defaults = {};

    public static categories: Array<PokemonCategory> = [];
    
    constructor() {}

    public static addCategory(name: string, color: string) {
        PokemonCategories.categories.push({ name: ko.observable(name), color: ko.observable(color) });
    }

    toJSON() {
        return {
            categories: ko.toJSON(PokemonCategories.categories),
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }

        json.categories?.forEach((category, index) => {
            const cat = PokemonCategories.categories[index];
            if (cat) {
                cat.name(category.name);
                cat.color(category.color);
            } else {
                PokemonCategories.categories[index] = { name: ko.observable(category.name), color: ko.observable(category.color) };
            }
        });
    }
}

PokemonCategories.addCategory('default', '#333');
PokemonCategories.addCategory('red', '#e74c3c');
PokemonCategories.addCategory('red2', '#c0392b');
PokemonCategories.addCategory('blue', '#3498db');
PokemonCategories.addCategory('blue2', '#2980b9');
PokemonCategories.addCategory('green', '#2ecc71');
PokemonCategories.addCategory('green2', '#27ae60');
