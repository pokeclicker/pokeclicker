class DungeonInfo {
    public static getName() : string {
        return player.town.name;
    }
    
    public static itemList : KnockoutObservable<InfoItemList[]> = ko.pureComputed(() => {
        return DungeonInfo.getItemList();
    });

    private static getItemList() : InfoItemList[] {
        const commonArray : InfoItem[] =
            player.town.dungeon?.lootTable.common
                ?.map((item) => (new InfoItem(item.loot, 'common', item.requirement)));
        const rareArray : InfoItem[] =
            player.town.dungeon?.lootTable.rare
                ?.map((item) => (new InfoItem(item.loot, 'rare', item.requirement)));
        const epicArray : InfoItem[] =
            player.town.dungeon?.lootTable.epic
                ?.map((item) => (new InfoItem(item.loot, 'epic', item.requirement)));
        const legendaryArray : InfoItem[] =
            player.town.dungeon?.lootTable.legendary
                ?.map((item) => (new InfoItem(item.loot, 'legendary', item.requirement)));
        const mythicArray : InfoItem[] =
            player.town.dungeon?.lootTable.mythic
                ?.map((item) => (new InfoItem(item.loot, 'mythic', item.requirement)));
        const array: InfoItemList[] = [];
        array.push(new InfoItemList('common', 'Common', (commonArray ?? [])));
        array.push(new InfoItemList('rare', 'Rare', (rareArray ?? [])));
        array.push(new InfoItemList('epic', 'Epic', (epicArray ?? [])));
        array.push(new InfoItemList('legendary', 'Legendary', (legendaryArray ?? [])));
        array.push(new InfoItemList('mythic', 'Mythic', (mythicArray ?? [])));
        return array;
    }
}
