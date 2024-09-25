class RouteInfo {
    public static getName() : string {
        return Routes.getName(player.route, player.region);
    }
    
    public static pokemonList : KnockoutObservable<InfoPokemonList[]> = ko.pureComputed(() => {
        return RouteInfo.getPokemonList();
    });

    private static getPokemonList() : InfoPokemonList[] {
        const pokemonList = Routes.getRoute(player.region, player.route)?.pokemon;
        const pokemonArray : InfoPokemon[] = [];
        if (pokemonList) {
            [...new Set(pokemonList.land)].forEach(pokemonName => {
                pokemonArray.push(new InfoPokemon(PokemonHelper.getPokemonByName(pokemonName).id, pokemonName, 'land'));
            });
            if (App.game.keyItems.hasKeyItem(KeyItemType.Super_rod) || pokemonList.land.length == 0) {
                [...new Set(pokemonList.water)].forEach(pokemonName => {
                    pokemonArray.push(new InfoPokemon(PokemonHelper.getPokemonByName(pokemonName).id, pokemonName, 'water', null, pokemonList.land.length != 0));
                });
            }
            [...new Set(pokemonList.headbutt)].forEach(pokemonName => {
                pokemonArray.push(new InfoPokemon(PokemonHelper.getPokemonByName(pokemonName).id, pokemonName, 'headbutt'));
            });
            pokemonList.special.filter(p => p.isAvailable()).forEach(special => {
                [...new Set(special.pokemon)].forEach(pokemonName => {
                    pokemonArray.push(new InfoPokemon(PokemonHelper.getPokemonByName(pokemonName).id, pokemonName, 'special', special.req));
                });
            });
            pokemonArray.sort((a, b) => a.id - b.id);
        }
        const roamerArray : InfoPokemon[] =
            RoamingPokemonList.getSubRegionalGroupRoamers(player.region, RoamingPokemonList.findGroup(player.region, player.subregion))
                ?.map((roamer) => (new InfoPokemon(roamer.pokemon.id, roamer.pokemonName, 'roamer', roamer.unlockRequirement)))
                .sort((a, b) => a.id - b.id);
        const boosted = (RoamingPokemonList.getIncreasedChanceRouteBySubRegionGroup(player.region, player.subregion)?.().number == player.route);
        const array: InfoPokemonList[] = [];
        array.push(new InfoPokemonList('encounters', 'Encounters', (pokemonArray ?? [])));
        array.push(new InfoPokemonList('roamers', `Roamers${boosted ? ' (Boosted)' : ''}`, (roamerArray ?? [])));
        return array;
    }
}