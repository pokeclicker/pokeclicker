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
     * @param includeHeadbutt
     * @returns {string[]} list of all Pokémon that can be caught
     */
    public static getAvailablePokemonList(route: number, region: GameConstants.Region, includeHeadbutt = true): PokemonNameType[] {
        // If the route is somehow higher than allowed, use the first route to generateWildPokemon Pokémon
        const possiblePokemons = Routes.getRoute(region, route)?.pokemon;
        if (!possiblePokemons) {
            return ['Rattata'];
        }

        // Land Pokémon
        let pokemonList = possiblePokemons.land;

        // Water Pokémon
        if (App.game.keyItems.hasKeyItem(KeyItemType.Super_rod) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.water);
        }

        // Headbutt Pokémon
        if (includeHeadbutt) {
            pokemonList = pokemonList.concat(possiblePokemons.headbutt);
        }

        // Special requirement Pokémon
        pokemonList = pokemonList.concat(...possiblePokemons.special.filter(p => p.isAvailable()).map(p => p.pokemon));

        return pokemonList;
    }

    public static routePokerusEVs(route:number, region:GameConstants.Region): string {
        const possiblePokemon: PokemonNameType[] = [...new Set(RouteHelper.getAvailablePokemonList(route, region))];
        if (this.minPokerus(possiblePokemon) == GameConstants.Pokerus.Resistant) {
            return 'All Pokémon on this route are resistant!';
        }
        const currentEVs = this.getEvs(possiblePokemon);
        return `EVs until all Pokémon are resistant on this route: ${currentEVs}&nbsp;/&nbsp;${50 * possiblePokemon.length}.`;
    }

    public static dungeonPokerusEVs(dungeon: Dungeon): string {
        const possiblePokemon: PokemonNameType[] = [...new Set(dungeon.allAvailablePokemon())];
        if (this.minPokerus(possiblePokemon) == GameConstants.Pokerus.Resistant) {
            return 'All Pokémon in this dungeon are resistant!';
        }
        const currentEVs = this.getEvs(possiblePokemon);
        return `EVs until all Pokémon are resistant in this dungeon: ${currentEVs}&nbsp;/&nbsp;${50 * possiblePokemon.length}.`;

    }

    private static getEvs(possiblePokemon: PokemonNameType[]): number {
        let currentEVs = 0;
        possiblePokemon.forEach(pkmn => {
            const partyPokemon: PartyPokemon = App.game.party.getPokemonByName(pkmn);
            if (partyPokemon.pokerus == GameConstants.Pokerus.Resistant) {
                currentEVs += 50;
            } else if (partyPokemon.pokerus == GameConstants.Pokerus.Contagious) {
                currentEVs += partyPokemon.evs();
            }
        });
        return Math.round(currentEVs);
    }

    /**
     * Checks if all Pokémon on this route are caught by the player.
     * @param route
     * @param region
     * @param includeShiny
     * @param includeHeadbutt
     * @returns {boolean} true if all Pokémon on this route are caught.
     */

    public static routeCompleted(route: number, region: GameConstants.Region, includeShiny: boolean, includeHeadbutt = true): boolean {
        return RouteHelper.listCompleted(RouteHelper.getAvailablePokemonList(route, region, includeHeadbutt), includeShiny);
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

    public static minPokerus(possiblePokemon: PokemonNameType[]): number {
        let pokerus = 3;
        for (let i = 0; i < possiblePokemon.length; i++) {
            const pokerusStatus = App.game.party.getPokemonByName(possiblePokemon[i])?.pokerus;
            pokerus = Math.min(pokerus, pokerusStatus);
        }
        return pokerus;
    }

    public static minPokerusCheck(possiblePokemon: PokemonNameType[]): boolean {
        if (possiblePokemon.length == 0) {
            return false;
        }
        return this.minPokerus(possiblePokemon) > 0;
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
