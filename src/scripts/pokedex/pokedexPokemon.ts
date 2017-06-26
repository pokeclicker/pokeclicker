/**
 * Created by dennis on 26-06-17.
 */
class pokedexPokemon implements pokemonInterface {
    name: string;
    id: number;
    type1: gameConstants.PokemonType;
    type2: gameConstants.PokemonType;
    kills: number;
    catches: number;
    shiny: boolean;


    constructor(name: string, id: number, type1: gameConstants.PokemonType, type2: gameConstants.PokemonType, kills: number, catches: number, shiny: boolean) {
        this.name = name;
        this.id = id;
        this.type1 = type1;
        this.type2 = type2;
        this.kills = kills;
        this.catches = catches;
        this.shiny = shiny;
    }
}