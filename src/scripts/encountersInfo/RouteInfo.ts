class RouteInfo {
    public static pokemonList = ko.pureComputed(() => {
        return RouteInfo.getPokemonList();
    });

    public static getPokemonList() {
        const pokemonList = Routes.getRoute(player.region, player.route)?.pokemon;
        const pokemonArray = [];
        if (pokemonList) {
            [...new Set(pokemonList.land)].forEach(pokemonName => {
                pokemonArray.push({id: PokemonHelper.getPokemonByName(pokemonName).id, name: pokemonName, type: 'land'});
            });

            if (App.game.keyItems.hasKeyItem(KeyItemType.Super_rod) || pokemonList.land.length == 0) {
                [...new Set(pokemonList.water)].forEach(pokemonName => {
                    pokemonArray.push({id: PokemonHelper.getPokemonByName(pokemonName).id, name: pokemonName, type: 'water', fishing: pokemonList.land.length != 0});
                });
            }

            [...new Set(pokemonList.headbutt)].forEach(pokemonName => {
                pokemonArray.push({id: PokemonHelper.getPokemonByName(pokemonName).id, name: pokemonName, type: 'headbutt'});
            });

            pokemonList.special.filter(p => p.isAvailable()).forEach(special => {
                [...new Set(special.pokemon)].forEach(pokemonName => {
                    pokemonArray.push({id: PokemonHelper.getPokemonByName(pokemonName).id, name: pokemonName, type: 'special', requirement: special.req});
                });
            });

            pokemonArray.sort((a, b) => a.id - b.id);
        }

        const roamerArray =
            RoamingPokemonList.getSubRegionalGroupRoamers(player.region, RoamingPokemonList.findGroup(player.region, player.subregion))
                .map((roamer) => ({id: roamer.pokemon.id, name: roamer.pokemonName, type: 'roamer', requirement: roamer.unlockRequirement}))
                .sort((a, b) => a.id - b.id);

        return roamerArray.length ? {pokemons: pokemonArray, roamers: roamerArray} : {pokemons: pokemonArray};
    }

    public static getInformations(pokemon) {
        if (pokemon.type == 'roamer') {
            if (RouteInfo.hasRequirement(pokemon.requirement, SpecialEventRequirement)) {
                return {tooltip: 'Event Roaming Pokémon', image: 'event_roaming.png'};
            } else {
                return {tooltip: 'Roaming Pokémon', image: 'roaming.png'};
            }
        } else if (pokemon.type == 'special') {
            if (RouteInfo.hasRequirement(pokemon.requirement, SpecialEventRequirement)) {
                return {tooltip: 'Event Pokémon', image: 'event.png'};
            } else if (RouteInfo.hasRequirement(pokemon.requirement, WeatherRequirement)) {
                return {tooltip: 'Weather Pokémon', image: 'weather.png'};
            } else if (RouteInfo.hasRequirement(pokemon.requirement, DayOfWeekRequirement)) {
                return {tooltip: 'Day of Week Pokémon', image: 'day_of_week.png'};
            }
        } else if (pokemon.type == 'water' && pokemon.fishing) {
            return {tooltip: 'Fishing Pokémon', image: 'fishing.png'};
        }
        return null;
    }

    private static hasRequirement(requirement, type) {
        //I traverse all the Requirement tree recursively to check if one of the requirements is the one I want
        if (requirement instanceof type) {
            return true;
        }
        if (requirement?.requirements) {
            for (const req of requirement.requirements) {
                if (RouteInfo.hasRequirement(req, type)) {
                    return true;
                }
            }
        }
        return false;
    }

    public static getFullName() {
        return `${RouteInfo.getRouteName()} - ${RouteInfo.getRegionName()} (${RouteInfo.getSubregionName()})`;
    }

    private static getRouteName() {
        return Routes.getName(player.route, player.region);
    }

    private static getRegionName() {
        return GameConstants.camelCaseToString(GameConstants.Region[player.region]);
    }

    private static getSubregionName() {
        return player.subregionObject()?.name;
    }
}
