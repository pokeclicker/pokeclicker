class RouteInfo {
    public static getName() {
        return Routes.getName(player.route, player.region);
    }

    public static pokemonList = ko.pureComputed(() => {
        return RouteInfo.getPokemonList();
    });

    private static getPokemonList() {
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
                ?.map((roamer) => {
                    return {id: roamer.pokemon.id, name: roamer.pokemonName, type: 'roamer', requirement: roamer.unlockRequirement}
                })
                .sort((a, b) => a.id - b.id);
        return {
            pokemons: {category: 'Encounters', data: (pokemonArray ?? [])},
            roamers: {category: 'Roamers', data: (roamerArray ?? [])},
        };
    }
}
