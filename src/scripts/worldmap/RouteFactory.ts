class RouteFactory {

    static createRoute(number: number, pokemons: PokemonPerRoute, requirements: WorldRequirement[] = [], isWater = false) {

        pokemons = RouteFactory.cleanPokemonPerRoute(pokemons);
        return new Route(number, pokemons, requirements, isWater);
    }

    private static cleanPokemonPerRoute(pokemons: PokemonPerRoute) {
        if (pokemons.land === undefined) {
            pokemons.land = [];
        }
        if (pokemons.water === undefined) {
            pokemons.water = [];
        }
        if (pokemons.headButt === undefined) {
            pokemons.headButt = [];
        }
        return pokemons;
    }
}