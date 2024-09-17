class SafariInfo {
    public static getName() {
        return player.town.name;
    }

    public static pokemonList = ko.pureComputed(() => {
        return SafariInfo.getPokemonList();
    });

    public static itemList = ko.pureComputed(() => {
        return SafariInfo.getItemList();
    });

    private static getPokemonList() {
        const grassArray =
            SafariPokemonList.list[player.region]?.()
                .filter((encounter) => {
                    return encounter.isAvailable() && encounter.environments.find((env) => env == SafariEnvironments.Grass) != undefined;
                })
                .map((encounter) => {
                    return {id: PokemonHelper.getPokemonByName(encounter.name).id, name: encounter.name, type: 'grass', requirement: encounter.requirement};
                })
                .sort((a, b) => a.id - b.id);
        const waterArray =
            SafariPokemonList.list[player.region]?.()
                .filter((encounter) => {
                    return encounter.isAvailable() && encounter.environments.find((env) => env == SafariEnvironments.Water) != undefined;
                })
                .map((encounter) => {
                    return {id: PokemonHelper.getPokemonByName(encounter.name).id, name: encounter.name, type: 'water', requirement: encounter.requirement};
                })
                .sort((a, b) => a.id - b.id);
        const itemsArray =
            SafariItemController.list[player.region]
                ?.filter((item) => {
                    return PokemonHelper.getPokemonByName(item.item.id).name != 'MissingNo.' && item.requirement.isCompleted();
                })
                .map((item) => {
                    return {id: PokemonHelper.getPokemonByName(item.item.id).id, name: item.item.id, type: 'item', requirement: item.requirement};
                })
                .sort((a, b) => a.id - b.id);
        return {
            pokemon: {category: 'Grass', data: (grassArray ?? [])},
            water: {category: 'Water', data: (waterArray ?? [])},
            items: {category: 'Items', data: (itemsArray ?? [])},
        };
    }

    private static getItemList() {
        const itemsArray =
            SafariItemController.list[player.region]
                ?.filter((item) => {
                    return PokemonHelper.getPokemonByName(item.item.id).name == 'MissingNo.';
                })
                .map((item) => {
                    return {item: item.item.id, type: 'item', requirement: item.requirement};
                });
        const pokemonsArray =
            SafariItemController.list[player.region]
                ?.filter((item) => {
                    return PokemonHelper.getPokemonByName(item.item.id).name != 'MissingNo.';
                })
                .map((item) => {
                    return {item: item.item.id, type: 'pokemon', requirement: item.requirement};
                });
        return {
            items: {category: 'Items', data: (itemsArray ?? [])},
            pokemons: {category: 'Pokémons', data: (pokemonsArray ?? [])},
        };
    }
}
