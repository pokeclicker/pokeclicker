class RouteFactory {

    static createRoute(number: number, pokemon: PokemonPerRoute, requirements: WorldRequirement[] = [], isWater = false) {
        pokemon = RouteFactory.cleanPokemonPerRoute(pokemon);
        return new Route(number, pokemon, requirements, isWater);
    }

    private static cleanPokemonPerRoute(pokemon: PokemonPerRoute) {
        if (pokemon.land === undefined) {
            pokemon.land = [];
        }
        if (pokemon.water === undefined) {
            pokemon.water = [];
        }
        if (pokemon.headButt === undefined) {
            pokemon.headButt = [];
        }
        return pokemon;
    }
}