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
                pokemonArray.push(new InfoPokemon(PokemonHelper.getPokemonByName(pokemonName).id, pokemonName, 'land', PokemonHelper.getImage(PokemonHelper.getPokemonByName(pokemonName).id, undefined, undefined, GameConstants.ShadowStatus.None)));
            });
            if (App.game.keyItems.hasKeyItem(KeyItemType.Super_rod) || pokemonList.land.length == 0) {
                [...new Set(pokemonList.water)].forEach(pokemonName => {
                    pokemonArray.push(new InfoPokemon(PokemonHelper.getPokemonByName(pokemonName).id, pokemonName, (pokemonList.land.length != 0) ? 'fishing' : 'water', PokemonHelper.getImage(PokemonHelper.getPokemonByName(pokemonName).id, undefined, undefined, GameConstants.ShadowStatus.None)));
                });
            }
            [...new Set(pokemonList.headbutt)].forEach(pokemonName => {
                pokemonArray.push(new InfoPokemon(PokemonHelper.getPokemonByName(pokemonName).id, pokemonName, 'headbutt', PokemonHelper.getImage(PokemonHelper.getPokemonByName(pokemonName).id, undefined, undefined, GameConstants.ShadowStatus.None)));
            });
            pokemonList.special.filter(p => p.isAvailable()).forEach(special => {
                [...new Set(special.pokemon)].forEach(pokemonName => {
                    pokemonArray.push(new InfoPokemon(PokemonHelper.getPokemonByName(pokemonName).id, pokemonName, 'special', PokemonHelper.getImage(PokemonHelper.getPokemonByName(pokemonName).id, undefined, undefined, GameConstants.ShadowStatus.None), special.req, !special.req?.isCompleted(), special.req?.hint()));
                });
            });
            pokemonArray.sort((a, b) => a.id - b.id);
        }
        const roamerArray : InfoPokemon[] =
            RoamingPokemonList.getSubRegionalGroupRoamers(player.region, RoamingPokemonList.findGroup(player.region, player.subregion))
                ?.map((roamer) => (new InfoPokemon(roamer.pokemon.id, roamer.pokemonName, 'roamer', PokemonHelper.getImage(roamer.pokemon.id, undefined, undefined, GameConstants.ShadowStatus.None), roamer.unlockRequirement, !roamer.unlockRequirement?.isCompleted(), roamer.unlockRequirement?.hint())))
                .sort((a, b) => a.id - b.id);
        const boosted = (RoamingPokemonList.getIncreasedChanceRouteBySubRegionGroup(player.region, player.subregion)?.().number == player.route);
        const array: InfoPokemonList[] = [];
        array.push(new InfoPokemonList('encounters', 'Encounters', (pokemonArray ?? [])));
        array.push(new InfoPokemonList('roamers', `Roamers${boosted ? ' (Boosted)' : ''}`, (roamerArray ?? [])));
        return array;
    }
}
