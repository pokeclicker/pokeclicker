/**
 * Created by dennis on 26-06-17.
 */
interface pokemonInterface {
    name: string | KnockoutObservable<string>;
    id: number | KnockoutObservable<number>;
    type1: PokemonTypes;
    type2: PokemonTypes;
    shiny?: boolean;
}