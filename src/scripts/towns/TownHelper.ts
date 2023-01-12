class TownHelper {
    private static cachedFilteredList: Object[];
    public static filteredList = ko.pureComputed<Object[]>(() => {
        if (
            TownHelper.cachedFilteredList &&
            modalUtils.observableState.locationsModal !== "show"
        ) {
            return TownHelper.cachedFilteredList;
        }

        TownHelper.cachedFilteredList = TownHelper.getList();
        return TownHelper.cachedFilteredList;
    });

    public static getList() {
        return Array.from(LocationList.values()).filter((town) => {
            // Don't show locations that ca'nt be visited yet
            if (!town.town.isUnlocked()) return false;

            const name = LocationFilters.name.value().trim();
            if (name && !town.name.toLowerCase().includes(name.toLowerCase())) return false;

            const type = LocationFilters.type.value();
            if (type && town.type !== type) return false;

            const region = LocationFilters.region.value();
            if (region && town.town.region !== region) return false;

            // const subregion = LocationFilters.subregion.value();
            // if (subregion && town.town.subRegion !== subregion) return false;

            return true;
        }).sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }).map((town) => {
            const region_name = GameConstants.camelCaseToString(GameConstants.Region[town.town.region]);
            const subregion_name = GameConstants.camelCaseToString(SubRegions.getSubRegionById(town.town.region, town.town.subRegion).name)
            return {
                name: town.name,
                region: region_name,
                subregion: region_name === subregion_name ? "" : subregion_name,
                type: town.type,
                directions: "",
            };
        });
    }
}
