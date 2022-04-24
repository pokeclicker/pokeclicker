///<reference path="../../declarations/routes/Routes.d.ts"/>
///<reference path="../../declarations/routes/RoutePokemon.d.ts"/>

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
        if (App.game.keyItems.hasKeyItem(KeyItemType.Fishing_rod) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.water);
        }

        // Headbutt Pokémon
        if (App.game.keyItems.hasKeyItem(KeyItemType.TM02_headbutt) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.headbutt);
        }

        // Kanto Old Rod Pokémon
        if (App.game.keyItems.hasKeyItem(KeyItemType.Fishing_rod) || possiblePokemons.land.length == 0) {
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
        if (App.game.keyItems.hasKeyItem(KeyItemType.HM03_surf) || possiblePokemons.land.length == 0) {
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
        if (App.game.statistics.routeKills[GameConstants.Region.johto][28]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtosuperrod);
        }

        // Johto Headbutt Pokémon
        if (App.game.keyItems.hasKeyItem(KeyItemType.TM02_headbutt) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtoheadbutt);
        }

        // Johto Surf Pokémon
        if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Ecruteak City')]() >= 1 || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtosurf);
        }

        // Hoenn Old Rod Pokémon
        if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Dewford Town')]() >= 1 || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoennoldrod);
        }

        // Hoenn Good Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.hoenn][118]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoenngoodrod);
        }

        // Hoenn Super Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.hoenn][125]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoennsuperrod);
        }

        // Hoenn Surf Pokémon
        if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Petalburg City')]() >= 1 || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoennsurf);
        }

        // Hoenn Dive Pokémon
        if (App.game.keyItems.hasKeyItem(KeyItemType.HM08_dive) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoenndive);
        }

        // Sinnoh Old Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.sinnoh][202]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.sinnoholdrod);
        }

        // Sinnoh Good Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.sinnoh][209]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.sinnohgoodrod);
        }

        // Sinnoh Super Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.sinnoh][225]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.sinnohsuperrod);
        }

        // Sinnoh Surf Pokémon
        if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Pastoria City')]() >= 1 || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.sinnohsurf);
        }

        // Unova Super Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.unova][1]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.unovasuperrod);
        }

        // Unova Surf Pokémon
        if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Driftveil City')]() >= 1 || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.unovasurf);
        }

        // Kalos Old rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.kalos][8]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kalosoldrod);
        }

        // Kalos Good Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.kalos][12]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kalosgoodrod);
        }

        // Kalos Super Rod Pokémon
        if (App.game.statistics.routeKills[GameConstants.Region.kalos][16]() >= GameConstants.ROUTE_KILLS_NEEDED || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kalossuperrod);
        }

        // Kalos Surf Pokémon
        if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Shalour City')]() >= 1 || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kalossurf);
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

    public static isAchievementsComplete(route: number, region: GameConstants.Region) {
        return AchievementHandler.achievementList.every(achievement => {
            return !(achievement.property instanceof RouteKillRequirement && achievement.property.region === region && achievement.property.route === route && !achievement.isCompleted());
        });
    }

}