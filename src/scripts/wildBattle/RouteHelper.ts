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
     * @returns {string[]} list of all Pokémon that can be caught
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
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 0) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kantooldrod);
        }

        // Kanto Good Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 1) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kantogoodrod);
        }

        // Kanto Super Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 2) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kantosuperrod);
        }

        // Kanto Surf Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.HM03_surf, 0) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kantosurf);
        }

        // Johto Old Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 3) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtooldrod);
        }

        // Johto Good Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 4) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtogoodrod);
        }

        // Johto Super Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 5) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtosuperrod);
        }

        // Johto Headbutt Pokémon
        if (App.game.keyItems.hasKeyItem(KeyItemType.TM02_headbutt) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtoheadbutt);
        }

        // Johto Surf Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.HM03_surf, 1) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.johtosurf);
        }

        // Hoenn Old Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 6) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoennoldrod);
        }

        // Hoenn Good Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 7) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoenngoodrod);
        }

        // Hoenn Super Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 8) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoennsuperrod);
        }

        // Hoenn Surf Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.HM03_surf, 2) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoennsurf);
        }

        // Hoenn Dive Pokémon
        if (App.game.keyItems.hasKeyItem(KeyItemType.HM08_dive) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.hoenndive);
        }

        // Sinnoh Old Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 9) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.sinnoholdrod);
        }

        // Sinnoh Good Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 10) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.sinnohgoodrod);
        }

        // Sinnoh Super Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 11) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.sinnohsuperrod);
        }

        // Sinnoh Surf Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.HM03_surf, 3) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.sinnohsurf);
        }

        // Unova Super Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 12) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.unovasuperrod);
        }

        // Unova Surf Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.HM03_surf, 4) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.unovasurf);
        }

        // Kalos Old rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 13) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kalosoldrod);
        }

        // Kalos Good Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 14) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kalosgoodrod);
        }

        // Kalos Super Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 15) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kalossuperrod);
        }

        // Kalos Surf Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.HM03_surf, 5) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.kalossurf);
        }

        // Alola Fishing Rod Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.Fishing_rod, 16) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.alolafishingrod);
        }

        // Alola Surf Pokémon
        if (App.game.keyItems.hasKeyItemLevel(KeyItemType.HM03_surf, 6) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.alolasurf);
        }

        // Special requirement Pokémon
        pokemonList = pokemonList.concat(...possiblePokemons.special.filter(p => p.isAvailable()).map(p => p.pokemon));

        return pokemonList;
    }

    /**
     * Checks if all Pokémon on this route are caught by the player.
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

    public static isThereQuestAtLocation(route: number, region: GameConstants.Region) {
        return App.game.quests.currentQuests().some(q => {
            return q instanceof DefeatPokemonsQuest && q.route == route && q.region == region;
        });
    }

}
