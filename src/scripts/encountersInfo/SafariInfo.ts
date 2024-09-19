class SafariInfo {
    public static getName() {
        return player.town.name;
    }

    public static itemList = ko.pureComputed(() => {
        return SafariInfo.getItemList();
    });

    private static getItemList() {
        const itemsArray =
            SafariItemController.list[player.region]
                ?.filter((item) => (PokemonHelper.getPokemonByName(item.item.id).name == 'MissingNo.'))
                .map((item) => ({item: item.item.id, type: 'item', requirement: item.requirement}));
        const pokemonsArray =
            SafariItemController.list[player.region]
                ?.filter((item) => (PokemonHelper.getPokemonByName(item.item.id).name != 'MissingNo.'))
                .map((item) => ({item: item.item.id, type: 'pokemon', requirement: item.requirement}));
        return {
            items: {category: 'Items', data: (itemsArray ?? [])},
            pokemons: {category: 'Pokémons', data: (pokemonsArray ?? [])},
        };
    }
}
