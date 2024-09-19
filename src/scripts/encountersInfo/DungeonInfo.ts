class DungeonInfo {
    public static itemList = ko.pureComputed(() => {
        return DungeonInfo.getItemList();
    });
    
    public static getName() {
        return player.town.name;
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
