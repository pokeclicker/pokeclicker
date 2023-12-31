class LocationNavigator {
    public static selectedType = ko.observable(LocationNavigatorOption.Towns);

    public static locationLists = {
        [LocationNavigatorOption.Towns]: ko.pureComputed(() => {
            return Object.values(TownList)
                .filter((town) => town.region == player.region
                    && (town.subRegion ?? 0) == player.subregion && !(town instanceof DungeonTown))
                .map((town) => new TownLocationNavigatorItem(town));
        }),
        [LocationNavigatorOption.Routes]: ko.pureComputed(() => {
            return Routes.getRoutesByRegionSubRegion(player.region, player.subregion)
                .map((route) => new RouteLocationNavigatorItem(route));
        }),
        [LocationNavigatorOption.Dungeons]: ko.pureComputed(() => {
            return GameConstants.RegionDungeons[player.region]
                .filter((dungeon) => (TownList[dungeon].subRegion ?? 0) == player.subregion)
                .map((dungeon) => new TownLocationNavigatorItem(TownList[dungeon]));
        }),
    };

    public static activeLocationList(): LocationNavigatorItem[] {
        return LocationNavigator.locationLists[LocationNavigator.selectedType()]();
    }
}
