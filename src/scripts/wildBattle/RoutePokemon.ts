/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */

class SpecialRoutePokemon {
    constructor (
        public pokemon: PokemonNameType[],
        public req: OneFromManyRequirement | Requirement | MultiRequirement
    ) {}

    isAvailable(): boolean {
        return this.req.isCompleted();
    }
}

class RoutePokemon {
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
        this.special = special;
    }
}
