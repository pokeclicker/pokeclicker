///<reference path="PokemonsPerRoute.ts"/>

class RouteHelper {
    public static getAvailablePokemonList(route: number, region: GameConstants.Regions, includeWater: boolean = false): string[] {
        // If the route is somehow higher than allowed, use the first route to generateWildPokemon Pokémon
        if (route > GameConstants.RegionRoutes[region]) {
            route = 1;
        }
        let possiblePokemons = pokemonsPerRoute[region][route];
        if (includeWater || possiblePokemons.land.length == 0) {
            return possiblePokemons.land.concat(possiblePokemons.water);
        } else {
            return possiblePokemons.land;
        }
    }

    public static routeCompleted(route: number, region: GameConstants.Regions, includeShiny: boolean = false, includeWater: boolean = false) {

        let possiblePokemon: string[] = this.getAvailablePokemonList(route, region, includeWater);


        for (let i = 0; i < possiblePokemon.length; i++) {
            // TODO fix if alreadyCaught is implemented
            // if (!alreadyCaught(possiblePokemon[i])) {
            //     return false;
            // }
        }
        return true;
    }


}