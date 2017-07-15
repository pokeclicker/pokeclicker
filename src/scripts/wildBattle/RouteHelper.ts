///<reference path="PokemonsPerRoute.ts"/>

/**
 * Helper class to retrieve information from PokemonsPerRoute
 */
class RouteHelper {
    /**
     * Retrieves a list of all Pokémon that can be caught on that route.
     * @param route
     * @param region
     * @param includeWater
     * @returns {string[]} list of all Pokémons that can be caught
     */
    public static getAvailablePokemonList(route: number, region: GameConstants.Region, includeWater: boolean = false): string[] {
        // If the route is somehow higher than allowed, use the first route to generateWildPokemon Pokémon
        if (route > GameConstants.RegionRoute[region]) {
            route = 1;
        }
        let possiblePokemons = pokemonsPerRoute[region][route];
        if (includeWater || possiblePokemons.land.length == 0) {
            return possiblePokemons.land.concat(possiblePokemons.water);
        } else {
            return possiblePokemons.land;
        }
    }

    /**
     * Checks if all Pokémons on this route are caught by the player.
     * @param route
     * @param region
     * @param includeShiny
     * @param includeWater
     * @returns {boolean} true if all Pokémon on this route are caught.
     */

    public static routeCompleted(route: number, region: GameConstants.Region, includeShiny: boolean, includeWater: boolean): boolean {
        let possiblePokemon: string[] = RouteHelper.getAvailablePokemonList(route, region, includeWater);
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

    public static dungeonCompleted(dungeon: Dungeon, includeShiny: boolean) {
        let possiblePokemon: string[] = dungeon.allPokemonNames;
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