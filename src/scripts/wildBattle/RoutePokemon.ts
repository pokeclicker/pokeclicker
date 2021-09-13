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
    public surfing: PokemonNameType[];
    public headbutt: PokemonNameType[];
    public special: SpecialRoutePokemon[];

    constructor({
        land = [],
        water = [],
        kantooldrod = [],
        kantogoodrod = [],
        kantosuperrod = [],
        surfing = [],
        headbutt = [],
        special = [],
    }: {
        land?: PokemonNameType[],
        water?: PokemonNameType[],
        kantooldrod?: PokemonNameType[],
        kantogoodrod?: PokemonNameType[],
        kantosuperrod?: PokemonNameType[],
        surfing?: PokemonNameType[],
        headbutt?: PokemonNameType[],
        special?: SpecialRoutePokemon[],
    }) {
        this.land = land;
        this.water = water;
        this.kantooldrod = kantooldrod;
        this.kantogoodrod = kantogoodrod;
        this.kantosuperrod = kantosuperrod;
        this.surfing = surfing;
        this.headbutt = headbutt;
        this.special = special;
    }
}
