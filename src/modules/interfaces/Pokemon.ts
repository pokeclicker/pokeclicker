import PokemonType from '../enums/PokemonType';

export default interface PokemonInterface {
    name: string;
    id: number;
    type1: PokemonType;
    type2: PokemonType;
    shiny?: boolean;
}
