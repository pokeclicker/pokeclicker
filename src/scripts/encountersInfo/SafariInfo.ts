class SafariInfo {
    public static getName() : string {
        return player.town.name;
    }

    public static pokemonList : KnockoutObservable<InfoPokemonList[]> = ko.pureComputed(() => {
        return SafariInfo.getPokemonList();
    });

    public static itemList : KnockoutObservable<InfoItemList[]> = ko.pureComputed(() => {
        return SafariInfo.getItemList();
    });

    private static getPokemonList() : InfoPokemonList[] {
        const grassArray : InfoPokemon[] =
            SafariPokemonList.getDisplayList()
                .filter((encounter) => encounter.grass)
                .map((encounter) => (new InfoPokemon(PokemonHelper.getPokemonByName(encounter.pokemonName).id, encounter.pokemonName, 'grass', encounter.image, null, encounter.lock, encounter.lockMessage)))
                .sort((a, b) => a.id - b.id);
        const waterArray : InfoPokemon[] =
            SafariPokemonList.getDisplayList()
                .filter((encounter) => encounter.water)
                .map((encounter) => (new InfoPokemon(PokemonHelper.getPokemonByName(encounter.pokemonName).id, encounter.pokemonName, 'water', encounter.image, null, encounter.lock, encounter.lockMessage)))
                .sort((a, b) => a.id - b.id);
        const itemsArray : InfoPokemon[] =
            SafariItemController.list[player.region]
                ?.filter((item) => (PokemonHelper.getPokemonByName(item.item.id).name != 'MissingNo.'))
                .map((item) => (new InfoPokemon(PokemonHelper.getPokemonByName(item.item.id).id, item.item.id, 'item', PokemonHelper.getImage(PokemonHelper.getPokemonByName(item.item.id).id, undefined, undefined, GameConstants.ShadowStatus.None), item.requirement, !item.requirement?.isCompleted(), item.requirement?.hint())))
                .sort((a, b) => a.id - b.id);
        const array: InfoPokemonList[] = [];
        array.push(new InfoPokemonList('grass', 'Grass', (grassArray ?? [])));
        array.push(new InfoPokemonList('water', 'Water', (waterArray ?? [])));
        array.push(new InfoPokemonList('items', 'Items', (itemsArray ?? [])));
        return array;
    }

    private static getItemList() : InfoItemList[] {
        const itemsArray : InfoItem[] =
            SafariItemController.list[player.region]
                ?.map((item) => (new InfoItem(String(item.item.id), 'item', item.requirement)));
        const array: InfoItemList[] = [];
        array.push(new InfoItemList('items', 'Items', (itemsArray ?? [])));
        return array;
    }
}
