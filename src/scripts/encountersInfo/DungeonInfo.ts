class DungeonInfo {
    public static lootList = ko.pureComputed(() => {
        return DungeonInfo.getLootList();
    });

    private static getLootList() {
        return player.town.dungeon?.lootTable || [];
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
            case PokemonHelper.getPokemonByName(input).name != 'MissingNo.':
                return `assets/images/pokemon/${PokemonHelper.getPokemonByName(input).id}.png`;
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
            case PokemonHelper.getPokemonByName(input).name != 'MissingNo.':
                return PokemonHelper.displayName(input)();
            default:
                return GameConstants.camelCaseToString(GameConstants.humanifyString(input.toLowerCase()));
        }
    }
}
