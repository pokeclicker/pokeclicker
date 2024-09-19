class DungeonInfo {
    public static getName() {
        return player.town.name;
    }

    public static pokemonList = ko.pureComputed(() => {
        return DungeonInfo.isShadow() ? DungeonInfo.getPokemonList() : DungeonInfo.getPokemonList();
    });

    public static itemList = ko.pureComputed(() => {
        return DungeonInfo.getItemList();
    });

    private static isShadow() {
        return player.region == GameConstants.Region.hoenn && player.subregion == 1;
    }

    private static getPokemonList() {
        const pokemonArray =
            player.town.dungeon?.normalEncounterList
                .filter((encounter) => !encounter.hide && !encounter.shadowTrainer)
                .map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, encounter: encounter, type: 'normal', requirement: NullRequirement, shadow: DungeonInfo.isShadow()}))
                .sort((a, b) => a.id - b.id);
        const bossArray =
            player.town.dungeon?.bossEncounterList
                .filter((encounter) => !encounter.hide && !encounter.shadowTrainer)
                .map((encounter) => ({id: PokemonHelper.getPokemonByName(encounter.pokemonName).id, encounter: encounter, type: 'boss', requirement: NullRequirement, shadow: DungeonInfo.isShadow()}))
                .sort((a, b) => a.id - b.id);
        return {
            pokemon: {category: 'Encounters', data: (pokemonArray ?? [])},
            boss: {category: 'Boss', data: (bossArray ?? [])},
        };
    }

    private getRequirementDungeon(pokemon) {
        return NullRequirement;
    }

    private static getItemList() {
        const commonArray =
            player.town.dungeon?.lootTable.common
                ?.map((item) => ({item: item.loot, type: 'common', requirement: item.requirement}));
        const rareArray =
            player.town.dungeon?.lootTable.rare
                ?.map((item) => ({item: item.loot, type: 'rare', requirement: item.requirement}));
        const epicArray =
            player.town.dungeon?.lootTable.epic
                ?.map((item) => ({item: item.loot, type: 'epic', requirement: item.requirement}));
        const legendaryArray =
            player.town.dungeon?.lootTable.legendary
                ?.map((item) => ({item: item.loot, type: 'legendary', requirement: item.requirement}));
        const mythicArray =
            player.town.dungeon?.lootTable.mythic
                ?.map((item) => ({item: item.loot, type: 'mythic', requirement: item.requirement}));
        return {
            common: {category: 'Common', data: (commonArray ?? [])},
            rare: {category: 'Rare', data: (rareArray ?? [])},
            epic: {category: 'Epic', data: (epicArray ?? [])},
            legendary: {category: 'Legendary', data: (legendaryArray ?? [])},
            mythic: {category: 'Mythic', data: (mythicArray ?? [])},
        };
    }
}
