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
    public kantooldrod: PokemonNameType [];
    public kantogoodrod: PokemonNameType [];
    public kantosuperrod: PokemonNameType [];
    public kantosurf: PokemonNameType[];
    public johtooldrod: PokemonNameType [];
    public johtogoodrod: PokemonNameType [];
    public johtosuperrod: PokemonNameType [];
    public johtosurf: PokemonNameType[];
    public johtoheadbutt: PokemonNameType[];
    public special: SpecialRoutePokemon[];

    constructor({
        land = [],
        water = [],
        headbutt = [],
        kantooldrod = [],
        kantogoodrod = [],
        kantosuperrod = [],
        kantosurf = [],
        johtooldrod = [],
        johtogoodrod = [],
        johtosuperrod = [],
        johtosurf = [],
        johtoheadbutt = [],
        special = [],
    }: {
        land?: PokemonNameType[],
        water?: PokemonNameType[],
        headbutt?: PokemonNameType[],
        kantooldrod?: PokemonNameType[],
        kantogoodrod?: PokemonNameType[],
        kantosuperrod?: PokemonNameType[],
        kantosurf?: PokemonNameType[],
        johtooldrod?: PokemonNameType[],
        johtogoodrod?: PokemonNameType[],
        johtosuperrod?: PokemonNameType[],
        johtosurf?: PokemonNameType[],
        johtoheadbutt?: PokemonNameType[],
        special?: SpecialRoutePokemon[],
    }) {
        this.land = land;
        this.water = water;
        this.headbutt = headbutt;
        this.kantooldrod = kantooldrod;
        this.kantogoodrod = kantogoodrod;
        this.kantosuperrod = kantosuperrod;
        this.kantosurf = kantosurf;
        this.johtooldrod = johtooldrod;
        this.johtogoodrod = johtogoodrod;
        this.johtosuperrod = johtosuperrod;
        this.johtosurf = johtosurf;
        this.johtoheadbutt = johtoheadbutt;
        this.special = special;
    }
}
