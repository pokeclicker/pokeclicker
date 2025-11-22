/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */

import { PokemonNameType } from '../pokemons/PokemonNameType';
import SpecialRoutePokemon from './SpecialRoutePokemon';

export default class RoutePokemon {
    public land: PokemonNameType[];
    public water: PokemonNameType[];
    public headbutt: PokemonNameType[];
    public special: SpecialRoutePokemon[];
    public kantooldrod: PokemonNameType [];
    public kantogoodrod: PokemonNameType [];
    public kantosuperrod: PokemonNameType [];
    public kantosurf: PokemonNameType[];

    constructor({
        land = [],
        water = [],
        headbutt = [],
        special = [],
        kantooldrod = [],
        kantogoodrod = [],
        kantosuperrod = [],
        kantosurf = [],
    }: {
        land?: PokemonNameType[],
        water?: PokemonNameType[],
        headbutt?: PokemonNameType[],
        special?: SpecialRoutePokemon[],
        kantooldrod?: PokemonNameType[],
        kantogoodrod?: PokemonNameType[],
        kantosuperrod?: PokemonNameType[],
        kantosurf?: PokemonNameType[],
    }) {
        this.land = land;
        this.water = water;
        this.headbutt = headbutt;
        this.special = special;
        this.kantooldrod = kantooldrod;
        this.kantogoodrod = kantogoodrod;
        this.kantosuperrod = kantosuperrod;
        this.kantosurf = kantosurf;
    }
}
