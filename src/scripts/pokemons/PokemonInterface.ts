/**
 * Created by dennis on 26-06-17.
 */
interface pokemonInterface {
    name: string;
    id: number;
    type1: GameConstants.PokemonType;
    type2: GameConstants.PokemonType;
    shiny?: boolean;
}