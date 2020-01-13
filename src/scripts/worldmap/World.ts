class World {
    currentRegion: RegionType;
    // TODO combine to position?
    currentRoute: number;
    currentDungeon: string;
    currentTown: string;

    regions: Region[];

    moveToRoute(route: number, region: RegionType) {
        if (isNaN(route)) {
            console.error('Could not move to route', route);
            return;
        }

        if (route === this.currentRoute) {
            console.log('This is the current route');
            return;
        }
        const newRoute = this.getRegion(region).getRoute(route);

        if (newRoute === undefined) {
            console.log(`Could not find route ${route} in region ${RegionType[region]}`);
            return;
        }

        if (!newRoute.canAccess()) {
            Notifier.notify(newRoute.lockedReason(), GameConstants.NotificationOption.danger);
        }

        this.currentRoute = route;
        this.currentRegion = region;
        this.currentTown = null;

        App.game.gameState = GameConstants.GameState.fighting;
        GameController.applyRouteBindings();
    }

    getRegion(type: RegionType): Region {
        return this.regions.find(region => {
            return region.type === type;
        });
    }

}