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
            categories: ko.toJS(PokemonCategories.categories),
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

PokemonCategories.addCategory('Default', '#333');
PokemonCategories.addCategory('Red', '#e74c3c');
PokemonCategories.addCategory('Red 2', '#c0392b');
PokemonCategories.addCategory('Blue', '#3498db');
PokemonCategories.addCategory('Blue 2', '#2980b9');
PokemonCategories.addCategory('Green', '#2ecc71');
PokemonCategories.addCategory('Green 2', '#27ae60');
PokemonCategories.addCategory('Purple', '#9b59b6');
PokemonCategories.addCategory('Purple 2', '#8e44ad');
PokemonCategories.addCategory('Orange', '#e67e22');
PokemonCategories.addCategory('Orange 2', '#d35400');
PokemonCategories.addCategory('Yellow', '#f1c40f');
PokemonCategories.addCategory('Turquoise', '#1abc9c');
PokemonCategories.addCategory('Turquoise 2', '#16a085');
