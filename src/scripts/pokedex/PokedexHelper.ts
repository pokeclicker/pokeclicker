import TypeColor = GameConstants.TypeColor;

class PokedexHelper {
    public static getBackgroundColors(name: string): string {
        let pokemon = PokemonHelper.getPokemonByName(name);

        if (!PokedexHelper.pokemonSeen(pokemon.id)()) {
            return "grey"
        }
        if (pokemon.type2 == PokemonType.None) {
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

}