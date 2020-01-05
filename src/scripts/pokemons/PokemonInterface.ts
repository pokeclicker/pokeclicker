/**
 * Created by dennis on 26-06-17.
 */
interface PokemonInterface {
    name: string;
    id: number;
    type1: PokemonTypes;
    type2: PokemonTypes;
    shiny?: boolean;
}