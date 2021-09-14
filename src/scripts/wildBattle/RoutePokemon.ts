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
    public kantooldrod: PokemonNameType [];
    public kantogoodrod: PokemonNameType [];
    public kantosuperrod: PokemonNameType [];
    public kantosurf: PokemonNameType[];
    public johtooldrod: PokemonNameType [];
    public johtogoodrod: PokemonNameType [];
    public johtosuperrod: PokemonNameType [];
    public johtosurf: PokemonNameType[];
    public headbutt: PokemonNameType[];
    public hoennoldrod: PokemonNameType [];
    public hoenngoodrod: PokemonNameType [];
    public hoennsuperrod: PokemonNameType [];
    public hoennsurf: PokemonNameType[];
    public dive: PokemonNameType[];
    public special: SpecialRoutePokemon[];

    constructor({
        land = [],
        water = [],
        kantooldrod = [],
        kantogoodrod = [],
        kantosuperrod = [],
        kantosurf = [],
        johtooldrod = [],
        johtogoodrod = [],
        johtosuperrod = [],
        johtosurf = [],
        headbutt = [],
        hoennoldrod = [],
        hoenngoodrod = [],
        hoennsuperrod = [],
        hoennsurf = [],
        dive = [],
        special = [],
    }: {
        land?: PokemonNameType[],
        water?: PokemonNameType[],
        kantooldrod?: PokemonNameType[],
        kantogoodrod?: PokemonNameType[],
        kantosuperrod?: PokemonNameType[],
        kantosurf?: PokemonNameType[],
        johtooldrod?: PokemonNameType[],
        johtogoodrod?: PokemonNameType[],
        johtosuperrod?: PokemonNameType[],
        johtosurf?: PokemonNameType[],
        headbutt?: PokemonNameType[],
        hoennoldrod?: PokemonNameType[],
        hoenngoodrod?: PokemonNameType[],
        hoennsuperrod?: PokemonNameType[],
        hoennsurf?: PokemonNameType[],
        dive?: PokemonNameType[],
        special?: SpecialRoutePokemon[],
    }) {
        this.land = land;
        this.water = water;
        this.kantooldrod = kantooldrod;
        this.kantogoodrod = kantogoodrod;
        this.kantosuperrod = kantosuperrod;
        this.kantosurf = kantosurf;
        this.johtooldrod = johtooldrod;
        this.johtogoodrod = johtogoodrod;
        this.johtosuperrod = johtosuperrod;
        this.johtosurf = johtosurf;
        this.headbutt = headbutt;
        this.hoennoldrod = hoennoldrod;
        this.hoenngoodrod = hoenngoodrod;
        this.hoennsuperrod = hoennsuperrod;
        this.hoennsurf = hoennsurf;
        this.dive = dive;
        this.special = special;
    }
}
