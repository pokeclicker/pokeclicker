/// <reference path="../enums/PokemonType.d.ts"/>
declare interface PokemonInterface {
    name: string;
    id: number;
    type1: PokemonType;
    type2: PokemonType;
    shiny?: boolean;
}
