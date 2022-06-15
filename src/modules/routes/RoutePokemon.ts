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
    public hoennoldrod: PokemonNameType [];
    public hoenngoodrod: PokemonNameType [];
    public hoennsuperrod: PokemonNameType [];
    public hoennsurf: PokemonNameType[];
    public hoenndive: PokemonNameType[];
    public sinnoholdrod: PokemonNameType [];
    public sinnohgoodrod: PokemonNameType [];
    public sinnohsuperrod: PokemonNameType [];
    public sinnohsurf: PokemonNameType[];
    public unovasuperrod: PokemonNameType [];
    public unovasurf: PokemonNameType[];
    public kalosoldrod: PokemonNameType [];
    public kalosgoodrod: PokemonNameType [];
    public kalossuperrod: PokemonNameType [];
    public kalossurf: PokemonNameType[];
    public alolafishingrod: PokemonNameType[];
    public alolasurf: PokemonNameType[];
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
        hoennoldrod = [],
        hoenngoodrod = [],
        hoennsuperrod = [],
        hoennsurf = [],
        hoenndive = [],
        sinnoholdrod = [],
        sinnohgoodrod = [],
        sinnohsuperrod = [],
        sinnohsurf = [],
        unovasuperrod = [],
        unovasurf = [],
        kalosoldrod = [],
        kalosgoodrod = [],
        kalossuperrod = [],
        kalossurf = [],
        alolafishingrod = [],
        alolasurf = [],
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
        hoennoldrod?: PokemonNameType[],
        hoenngoodrod?: PokemonNameType[],
        hoennsuperrod?: PokemonNameType[],
        hoennsurf?: PokemonNameType[],
        hoenndive?: PokemonNameType[],
        sinnoholdrod?: PokemonNameType[],
        sinnohgoodrod?: PokemonNameType[],
        sinnohsuperrod?: PokemonNameType[],
        sinnohsurf?: PokemonNameType[],
        unovasuperrod?: PokemonNameType[],
        unovasurf?: PokemonNameType[],
        kalosoldrod?: PokemonNameType[],
        kalosgoodrod?: PokemonNameType[],
        kalossuperrod?: PokemonNameType[],
        kalossurf?: PokemonNameType[],
        alolafishingrod?: PokemonNameType[],
        alolasurf?: PokemonNameType[],
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
        this.hoennoldrod = hoennoldrod;
        this.hoenngoodrod = hoenngoodrod;
        this.hoennsuperrod = hoennsuperrod;
        this.hoennsurf = hoennsurf;
        this.hoenndive = hoenndive;
        this.sinnoholdrod = sinnoholdrod;
        this.sinnohgoodrod = sinnohgoodrod;
        this.sinnohsuperrod = sinnohsuperrod;
        this.sinnohsurf = sinnohsurf;
        this.unovasuperrod = unovasuperrod;
        this.unovasurf = unovasurf;
        this.kalosoldrod = kalosoldrod;
        this.kalosgoodrod = kalosgoodrod;
        this.kalossuperrod = kalossuperrod;
        this.kalossurf = kalossurf;
        this.alolafishingrod = alolafishingrod;
        this.alolasurf = alolasurf;
        this.special = special;
    }
}
