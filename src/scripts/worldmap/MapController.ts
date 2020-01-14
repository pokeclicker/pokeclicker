class MapController {
    public static calculateRouteCssClass(route: number, region: RegionType): string {
        let cls;

        if (App.game.world.currentRoute == route && App.game.world.currentRegion == region) {
            cls = 'currentRoute';
        } else if (App.game.world.accessToRoute(route, region)) {
            if (player.statistics.routeKills[route]() >= GameConstants.ROUTE_KILLS_NEEDED) {
                cls = 'unlockedRoute';
            } else {
                cls = 'unlockedUnfinishedRoute';
            }
        } else {
            cls = 'lockedRoute';
        }

        // Water routes
        if (GameConstants.WaterRoutes[region].has(route)) {
            cls = `${cls} waterRoute`;
        }

        return cls;
    }
}