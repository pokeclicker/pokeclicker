///<reference path="RoutePokemon.ts"/>

/**
 * Helper class to retrieve information from RoutePokemon
 */
class RouteHelper {
    /**
     * Retrieves a list of all Pokémon that can be caught on that route.
     * @param route
     * @param region
     * @param includeHeadbutt
     * @returns {string[]} list of all Pokémons that can be caught
     */
    public static getAvailablePokemonList(route: number, region: GameConstants.Region, includeHeadbutt = true): string[] {
        // If the route is somehow higher than allowed, use the first route to generateWildPokemon Pokémon
        if (!MapHelper.validRoute(route, region)) {
            route = GameConstants.RegionRoute[region][0];
        }
        const routeData = Routes.getRoute(region, route);
        const possiblePokemons = routeData.pokemon;
        if (possiblePokemons == null) {
            return ['Rattata'];
        }
        let pokemonList = possiblePokemons.land;
        if (App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Super_rod) || possiblePokemons.land.length == 0) {
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

    public static routeCompleted(route: number, region: GameConstants.Region, includeShiny: boolean, includeHeadbutt = true): boolean {
        const possiblePokemon: string[] = RouteHelper.getAvailablePokemonList(route, region, includeHeadbutt);
        return RouteHelper.listCompleted(possiblePokemon, includeShiny);
    }

    public static listCompleted(possiblePokemon: string[], includeShiny: boolean) {
        for (let i = 0; i < possiblePokemon.length; i++) {
            if (!App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(possiblePokemon[i]).id)) {
                return false;
            }
            if (includeShiny && !App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(possiblePokemon[i]).id, true)) {
                return false;
            }
        }
        return true;
    }

}
