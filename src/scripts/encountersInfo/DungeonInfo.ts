class DungeonInfo {
    public static lootList = ko.pureComputed(() => {
        return DungeonInfo.getLootList();
    });

    private static getLootList() {
        const rawTable = player.town.dungeon?.lootTable || {};
        const displayTable = {};
        Object.entries(rawTable).forEach(([tier, loots]) => {
            const filteredLoots = (loots as Loot[]).filter(l => ItemList[l.loot] || pokemonMap[l.loot].name == 'MissingNo.');
            if (filteredLoots.length) {
                displayTable[tier] = filteredLoots;
            }
        });
        return displayTable;
    }

    public static getFullName() {
        return `${DungeonInfo.getDungeonName()} - ${DungeonInfo.getRegionName()} (${DungeonInfo.getSubregionName()})`;
    }

    private static getDungeonName() {
        return player.town.name;
    }

    private static getRegionName() {
        return GameConstants.camelCaseToString(GameConstants.Region[player.region]);
    }

    private static getSubregionName() {
        return player.subregionObject()?.name;
    }

    public static getLootImage(input) {
        switch (true) {
            case typeof BerryType[input] == 'number':
                return FarmController.getBerryImage(BerryType[GameConstants.humanifyString(input)]);
            case UndergroundItems.getByName(input) instanceof UndergroundItem:
                return UndergroundItems.getByName(input).image;
            default:
                return ItemList[input].image;
        }
    }

    public static getLootName(input) {
        switch (true) {
            case input in ItemList:
                return ItemList[input]?.displayName;
            case typeof BerryType[input] == 'number':
                return `${input} Berry`;
            default:
                return GameConstants.camelCaseToString(GameConstants.humanifyString(input.toLowerCase()));
        }
    }
}
