///<reference path="PokemonsPerRoute.ts"/>

/**
 * Helper class to retrieve information from PokemonsPerRoute
 */
class RouteHelper {
    /**
     * Retrieves a list of all Pokémon that can be caught on that route.
     * @param route
     * @param region
     * @param includeHeadbutt
     * @returns {string[]} list of all Pokémons that can be caught
     */
    public static getAvailablePokemonList(route: number, region: GameConstants.Region, includeHeadbutt: boolean = true): string[] {
        // If the route is somehow higher than allowed, use the first route to generateWildPokemon Pokémon
        if (route > GameConstants.RegionRoute[region]) {
            route = 1;
        }
        let possiblePokemons = pokemonsPerRoute[region][route];
        if (possiblePokemons == null) {
            return ["Rattata"];
        }
        let pokemonList = possiblePokemons.land;
        if (player.hasKeyItem("Super rod") || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.water);
        }
        if (includeHeadbutt) {
            pokemonList = pokemonList.concat(possiblePokemons.headbutt);
        }
        return pokemonList;
    }

    /**
     * Checks if all Pokémons on this route are caught by the player.
     * @param route
     * @param region
     * @param includeShiny
     * @param includeHeadbutt
     * @returns {boolean} true if all Pokémon on this route are caught.
     */

    public static routeCompleted(route: number, region: GameConstants.Region, includeShiny: boolean, includeHeadbutt: boolean = true): boolean {
        let possiblePokemon: string[] = RouteHelper.getAvailablePokemonList(route, region, includeHeadbutt);
        return RouteHelper.listCompleted(possiblePokemon, includeShiny);
    }

    public static listCompleted(possiblePokemon: string[], includeShiny: boolean) {
        for (let i = 0; i < possiblePokemon.length; i++) {
            if (!player.alreadyCaughtPokemon(possiblePokemon[i])) {
                return false;
            }
            if (includeShiny && !player.alreadyCaughtPokemonShiny((possiblePokemon[i]))) {
                return false;
            }
        }
        return true;
    }

}