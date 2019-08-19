import TypeColor = GameConstants.TypeColor;

class PokedexHelper {
    public static getBackgroundColors(name: string): string {
        let pokemon = PokemonHelper.getPokemonByName(name);

        if (!PokedexHelper.pokemonSeen(pokemon.id)()) {
            return "grey"
        }
        if (pokemon.type2 == GameConstants.PokemonType.None) {
            return TypeColor[pokemon.type1];
        }
        return 'linear-gradient(90deg,' + TypeColor[pokemon.type1] + ' 50%, ' + TypeColor[pokemon.type2] + ' 50%)';
    }

    /**
     * Returns true if you have seen the pokemon
     * @param {number} id
     * @returns {boolean}
     */
    public static pokemonSeen(id: number): KnockoutComputed<boolean> {
        return ko.computed(function () {
            return player.defeatedAmount[id]() > 0 || player.caughtAmount[id]() > 0;
        })
    }

    public static filteredList: KnockoutObservableArray<object> = ko.observableArray([]);

    public static populateTypeFilters() {
        var options = $("#pokedex-filter-type1");
        $.each(GameConstants.PokemonType, function () {
            if (isNaN(Number(this)) && this != GameConstants.PokemonType.None) {
                options.append($("<option />").val(GameConstants.PokemonType[this]).text(this));
            }
        });

        options = $("#pokedex-filter-type2");
        $.each(GameConstants.PokemonType, function () {
            if (isNaN(Number(this)) && this != GameConstants.PokemonType.None) {
                options.append($("<option />").val(GameConstants.PokemonType[this]).text(this));
            }
        });
    }

    public static updateList() {
        PokedexHelper.filteredList(PokedexHelper.getList());
    }

    public static getList(): Array<object> {
        let filter = PokedexHelper.getFilters();

        const highestDefeated = player.defeatedAmount.reduce((highest, pokemon, index)=> pokemon() && index > highest ? index : highest, 0);
        const highestCaught = player.caughtPokemonList.reduce((highest, pokemon)=> pokemon.id > highest ? pokemon.id : highest, 0);
        const highestDex = Math.max(highestDefeated, highestCaught);

        return pokemonList.filter(function (pokemon) {
            if ((filter['name'] || "") != "" && pokemon.name.toLowerCase().indexOf(filter['name'].toLowerCase()) == -1) {
                return false;
            }
            let type1 = parseInt(filter['type1'] || -1);
            if (type1 != -1 && pokemon.type.indexOf(GameConstants.PokemonType[type1]) == -1) {
                return false;
            }

            let type2 = parseInt(filter['type2'] || -1);
            if (type2 != -1 && pokemon.type.indexOf(GameConstants.PokemonType[type2]) == -1) {
                return false;
            }

            if (filter['caught'] && player.caughtAmount[pokemon.id]() == 0) {
                return false;
            }

            if (filter['shiny'] && !player.alreadyCaughtPokemonShiny(pokemon.name)) {
                return false;
            }

            if (filter['uncaught'] && player.caughtAmount[pokemon.id]() !== 0) {
                return false;
            }

            if (pokemon.id > highestDex) {
                return false;
            }

            return true;
        });
    }

    private static getFilters() {
        let res = {};
        res['name'] = (<HTMLInputElement>document.getElementById('nameFilter')).value;
        let type1 = <HTMLSelectElement>document.getElementById('pokedex-filter-type1');
        res['type1'] = type1.options[type1.selectedIndex].value;
        let type2 = <HTMLSelectElement>document.getElementById('pokedex-filter-type2');
        res['type2'] = type2.options[type2.selectedIndex].value;
        res['caught'] = (<HTMLInputElement> document.getElementById('pokedex-filter-caught')).checked;
        res['uncaught'] = (<HTMLInputElement> document.getElementById('pokedex-filter-uncaught')).checked;
        res['shiny'] = (<HTMLInputElement> document.getElementById('pokedex-filter-shiny')).checked;
        return res;
    }

    private static getImage(id: number, name: string) {
        let src = "assets/images/";
        if (player.alreadyCaughtPokemonShiny(name)) {
            src += "shiny";
        }
        src += "pokemon/" + id + ".png";
        return src;
    }
}
