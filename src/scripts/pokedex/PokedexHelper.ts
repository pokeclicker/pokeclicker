import TypeColor = GameConstants.TypeColor;

class PokedexHelper {
    public static getBackgroundColors(name: string): string {
        const pokemon = PokemonHelper.getPokemonByName(name);

        if (!this.pokemonSeen(pokemon.id)()) {
            return 'grey';
        }
        if (pokemon.type2 == PokemonType.None) {
            return TypeColor[pokemon.type1];
        }
        return `linear-gradient(90deg,${TypeColor[pokemon.type1]} 50%, ${TypeColor[pokemon.type2]} 50%)`;
    }

    /**
     * Returns true if you have seen the pokemon
     * @param {number} id
     * @returns {boolean}
     */
    public static pokemonSeen(id: number): KnockoutComputed<boolean> {
        return ko.pureComputed(function () {
            try {
                return App.game.statistics.pokemonEncountered[id]() > 0 || App.game.statistics.pokemonDefeated[id]() > 0 || App.game.statistics.pokemonCaptured[id]() > 0 || App.game.party.alreadyCaughtPokemon(id);
            } catch (error) {
                return false;
            }
        });
    }

    public static filteredList: KnockoutObservableArray<object> = ko.observableArray([]);

    public static populateTypeFilters() {
        let options = $('#pokedex-filter-type1');
        $.each(PokemonType, function () {
            if (isNaN(Number(this)) && this != PokemonType.None) {
                options.append($('<option />').val(PokemonType[this]).text(this));
            }
        });

        options = $('#pokedex-filter-type2');
        $.each(PokemonType, function () {
            if (isNaN(Number(this)) && this != PokemonType.None) {
                options.append($('<option />').val(PokemonType[this]).text(this));
            }
        });
    }

    public static updateList() {
        PokedexHelper.filteredList(PokedexHelper.getList());
    }

    public static getList(): Array<object> {
        const filter = PokedexHelper.getFilters();

        const highestEncountered = App.game.statistics.pokemonEncountered.highestID;
        const highestDefeated = App.game.statistics.pokemonDefeated.highestID;
        const highestCaught = App.game.statistics.pokemonCaptured.highestID;
        const highestDex = Math.max(highestEncountered, highestDefeated, highestCaught);

        return pokemonList.filter(function (pokemon) {
            // If the Pokemon shouldn't be unlocked yet
            if (PokemonHelper.calcNativeRegion(pokemon.name) > GameConstants.MAX_AVAILABLE_REGION) {
                return false;
            }

            // If we haven't seen a pokemon this high yet
            if (pokemon.id > highestDex) {
                return false;
            }

            // Check if the name contains the string
            if (filter['name'] && !pokemon.name.toLowerCase().includes(filter['name'].toLowerCase())) {
                return false;
            }

            // Check if either of the types match
            const type1: PokemonType = parseInt(filter['type1'] || PokemonType.None);
            const type2: PokemonType = parseInt(filter['type2'] || PokemonType.None);
            if ((type1 != PokemonType.None && !pokemon.type.includes(type1)) || (type2 != PokemonType.None && !pokemon.type.includes(type2))) {
                return false;
            }

            // Checks based on caught/shiny status
            const alreadyCaught = App.game.party.alreadyCaughtPokemon(pokemon.id);
            const alreadyCaughtShiny = App.game.party.alreadyCaughtPokemon(pokemon.id, true);

            // If not caught
            if (filter['caught'] && !alreadyCaught) {
                return false;
            }

            // If not caught shiny variant
            if (filter['shiny'] && !alreadyCaughtShiny) {
                return false;
            }

            // If not caught, or already caught shiny
            if (filter['not-shiny'] && (!alreadyCaught || alreadyCaughtShiny)) {
                return false;
            }

            // If already caught
            if (filter['uncaught'] && alreadyCaught) {
                return false;
            }

            return true;
        });
    }

    private static getFilters() {
        const res = {};
        res['name'] = (<HTMLInputElement>document.getElementById('nameFilter')).value;
        const type1 = <HTMLSelectElement>document.getElementById('pokedex-filter-type1');
        res['type1'] = type1.options[type1.selectedIndex].value;
        const type2 = <HTMLSelectElement>document.getElementById('pokedex-filter-type2');
        res['type2'] = type2.options[type2.selectedIndex].value;
        res['caught'] = (<HTMLInputElement> document.getElementById('pokedex-filter-caught')).checked;
        res['uncaught'] = (<HTMLInputElement> document.getElementById('pokedex-filter-uncaught')).checked;
        res['shiny'] = (<HTMLInputElement> document.getElementById('pokedex-filter-shiny')).checked;
        res['not-shiny'] = (<HTMLInputElement> document.getElementById('pokedex-filter-not-shiny')).checked;
        return res;
    }

    private static getImage(id: number, name: string) {
        let src = 'assets/images/';
        if (App.game.party.alreadyCaughtPokemon(id, true)) {
            src += 'shiny';
        }
        src += `pokemon/${id}.png`;
        return src;
    }
}
