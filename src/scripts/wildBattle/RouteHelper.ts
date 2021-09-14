///<reference path="RoutePokemon.ts"/>

/**
 * Helper class to retrieve information from RoutePokemon
 */
class RouteHelper {
    /**
     * Retrieves a list of all Pokémon that can be caught on that route.
     * @param route
     * @param region
     * @returns {string[]} list of all Pokémons that can be caught
     */
    public static getAvailablePokemonList(route: number, region: GameConstants.Region): PokemonNameType[] {
        // If the route is somehow higher than allowed, use the first route to generateWildPokemon Pokémon
        const possiblePokemons = Routes.getRoute(region, route)?.pokemon;
        if (!possiblePokemons) {
            return ['Rattata'];
        }

        // Land Pokémon
        let pokemonList = possiblePokemons.land;

        // Water Pokémon
        if (App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Fishing_rod) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.water);
        }

        // Kanto Old Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.kanto][6]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kantooldrod);
        }

        // Kanto Good Rod Pokémon
        if (MapHelper.accessToTown('Fuchsia City') || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kantogoodrod);
        }

        // Kanto Super Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.kanto][12]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kantosuperrod);
        }

        // Kanto Surf Pokémon
        if (App.game.badgeCase.hasBadge(BadgeEnums.Soul) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kantosurf);
        }

        // Johto Old Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.johto][32]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtooldrod);
        }

        // Johto Good Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.johto][39]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtogoodrod);
        }

        // Johto Super Rod Pokémon
        if (App.game.badgeCase.hasBadge(BadgeEnums.Elite_JohtoChampion) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtosuperrod);
        }

        // Johto Surf Pokémon
        if (App.game.badgeCase.hasBadge(BadgeEnums.Plain) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtosurf);
        }

        // Headbutt Pokémon
        if (App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Ilex Forest')]() > 0) {
            pokemonList = pokemonList.concat(possiblePokemons.headbutt);
        }

        // Special requirement Pokémon
        pokemonList = pokemonList.concat(...possiblePokemons.special.filter(p => p.isAvailable()).map(p => p.pokemon));

        return pokemonList;
    }

    /**
     * Checks if all Pokémons on this route are caught by the player.
     * @param route
     * @param region
     * @param includeShiny
     * @returns {boolean} true if all Pokémon on this route are caught.
     */

    public static routeCompleted(route: number, region: GameConstants.Region, includeShiny: boolean): boolean {
        const possiblePokemon: PokemonNameType[] = RouteHelper.getAvailablePokemonList(route, region);
        return RouteHelper.listCompleted(possiblePokemon, includeShiny);
    }

    public static listCompleted(possiblePokemon: PokemonNameType[], includeShiny: boolean) {
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
