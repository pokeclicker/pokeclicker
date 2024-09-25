class SafariInfo {
    public static getName() : string {
        return player.town.name;
    }
    
    public static itemList : KnockoutObservable<InfoItemList[]> = ko.pureComputed(() => {
        return SafariInfo.getItemList();
    });

    public static itemList = ko.pureComputed(() => {
        return SafariInfo.getItemList();
    });

    private static getPokemonList() {
        const grassArray =
            SafariPokemonList.getDisplayList()
                .filter((encounter) => encounter.grass)
                .map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, name: encounter.pokemonName, image: encounter.image, lock: encounter.lock, lockMessage: encounter.lockMessage, type: 'grass'}))
                .sort((a, b) => a.id - b.id);
        const waterArray =
            SafariPokemonList.getDisplayList()
                .filter((encounter) => encounter.water)
                .map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, name: encounter.pokemonName, image: encounter.image, lock: encounter.lock, lockMessage: encounter.lockMessage, type: 'water'}))
                .sort((a, b) => a.id - b.id);
        const itemsArray =
            SafariItemController.list[player.region]
                ?.filter((item) => (PokemonHelper.getPokemonByName(item.item.id).name != 'MissingNo.'))
                .map((item) => ({id: PokemonHelper.getPokemonByName(item.item.id).id, name: item.item.id, lock: !item.requirement.isCompleted(), image: PokemonHelper.getImage(PokemonHelper.getPokemonByName(item.item.id).id, undefined, undefined, GameConstants.ShadowStatus.None), lockMessage: item.requirement.hint(), type: 'item'}))
                .sort((a, b) => a.id - b.id);
        return {
            grass: {category: 'Grass', data: (grassArray ?? [])},
            water: {category: 'Water', data: (waterArray ?? [])},
            items: {category: 'Items', data: (itemsArray ?? [])},
        };
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
