/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */

interface SpecialReqPokemon {
    pokemon: PokemonNameType[],
    req: (OneFromManyRequirement | Requirement)[],
}

class RoutePokemon {
    public land: PokemonNameType[];
    public water: PokemonNameType[];
    public headbutt: PokemonNameType[];

    public specialReq: SpecialReqPokemon[];

    constructor({
        land = [],
        water = [],
        headbutt = [],
        specialReq,
    }: {
        land?: PokemonNameType[],
        water?: PokemonNameType[],
        headbutt?: PokemonNameType[],
        specialReq?: SpecialReqPokemon[],
    }) {
        this.land = land;
        this.water = water;
        this.headbutt = headbutt;
        this.specialReq = specialReq;
    }
}
