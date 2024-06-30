class RouteInfo {
    public static pokemonList = ko.pureComputed(() => {
        return RouteInfo.getPokemonList();
    });

    public static getPokemonList() {
        const route = player.route;
        const region = player.region;
        const subregion = player.subregion;

        const pokemonArray = [];
        const roamerGroup = RoamingPokemonList.findGroup(region, subregion);
        const roamingList = RoamingPokemonList.getSubRegionalGroupRoamers(region, roamerGroup);
        [...new Set(RouteHelper.getAvailablePokemonList(route, region))].forEach(pokemonName => {
            pokemonArray.push({id: PokemonHelper.getPokemonByName(pokemonName).id, name: pokemonName, roamer: false});
        });
        if (roamingList.length) {
            [...new Set(RoamingPokemonList.getSubRegionalGroupRoamers(region, roamerGroup))].forEach(pokemon => {
                pokemonArray.push({id: PokemonHelper.getPokemonByName(pokemon.pokemonName).id, name: pokemon.pokemonName, roamer: true});
            });
        }
        return pokemonArray;
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
