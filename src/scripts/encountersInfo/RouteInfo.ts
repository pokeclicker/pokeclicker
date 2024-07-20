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
                    pokemonArray.push({id: PokemonHelper.getPokemonByName(pokemonName).id, name: pokemonName, type: 'water', super_rod: pokemonList.land.length != 0});
                });
            }
            [...new Set(pokemonList.headbutt)].forEach(pokemonName => {
                pokemonArray.push({id: PokemonHelper.getPokemonByName(pokemonName).id, name: pokemonName, type: 'headbutt'});
            });
            
            [...new Set(pokemonList.special.filter(p => p.isAvailable()))].forEach(special => {
                [...new Set(special.pokemon)].forEach(pokemonName => {
                    pokemonArray.push({id: PokemonHelper.getPokemonByName(pokemonName).id, name: pokemonName, type: 'special', requirement: special.req});
                })
            });
            pokemonArray.sort((a, b) => {return a.id - b.id;});
        }
        const roamerList = RoamingPokemonList.getSubRegionalGroupRoamers(player.region, RoamingPokemonList.findGroup(player.region, player.subregion));
        const roamerArray = [];
        if (roamerList) {
            [...new Set(roamerList)].forEach(roamer => {
                roamerArray.push({id: roamer.pokemon.id, name: roamer.pokemonName, type: 'roamer', requirement: roamer.unlockRequirement});
            });
            roamerArray.sort((a, b) => {return a.id - b.id;});
        }
        return {pokemons: pokemonArray, roamers: roamerArray};
    }

    public static hasInformation(pokemon) {
        return (pokemon.type == 'roamer')  || (pokemon.type == 'special') || (pokemon.type == 'water' && pokemon.super_rod);
    }

    public static getInformations(pokemon) {
        if (pokemon.type == 'roamer') {
            if (RouteInfo.isSpecialEventRequirement(pokemon.requirement)) {
                return {tooltip: "Event Roaming Pokémon", image: "event_roaming.png"};
            }
            else {
                return {tooltip: "Roaming Pokémon", image: "roaming.png"};
            }
        }
        else if (pokemon.type == 'special') {
            if (RouteInfo.isSpecialEventRequirement(pokemon.requirement)) {
                return {tooltip: "Event Pokémon", image: "event.png"};
            }
            else if (RouteInfo.isWeatherRequirement(pokemon.requirement)) {
                return {tooltip: "Weather Pokémon", image: "weather.png"};
            }
            else if (RouteInfo.isDayOfWeekRequirement(pokemon.requirement)) {
                return {tooltip: "Day of Week Pokémon", image: "day_of_week.png"};
            }
            else {
                return {tooltip: "Special Pokémon", image: "special.png"};
            }
        } 
        else if (pokemon.type == 'water' && pokemon.super_rod) {
            return {tooltip: "Super Rod Pokémon", image: "super_rod.png"};
        }
        return {tooltip: "", image: ""};
    }

    private static isSpecialEventRequirement(requirement) {
        if (requirement instanceof SpecialEventRequirement) return true;
        if (requirement instanceof MultiRequirement) {
            for (let req of requirement.requirements) {
                if (RouteInfo.isSpecialEventRequirement(req)) return true;
            }
        }
        return false;
    }

    private static isWeatherRequirement(requirement) {
        if (requirement instanceof WeatherRequirement) return true;
        if (requirement instanceof MultiRequirement) {
            for (let req of requirement.requirements) {
                if (RouteInfo.isWeatherRequirement(req)) return true;
            }
        }
        return false;
    }

    private static isDayOfWeekRequirement(requirement) {
        if (requirement instanceof DayOfWeekRequirement) return true;
        if (requirement instanceof MultiRequirement) {
            for (let req of requirement.requirements) {
                if (RouteInfo.isDayOfWeekRequirement(req)) return true;
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
