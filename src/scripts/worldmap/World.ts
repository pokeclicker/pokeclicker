class World implements Saveable {
    name = 'World';
    saveKey = 'world';
    defaults = {
        currentRegion: RegionName.kanto,
        currentRoute: 1,
    };

    private _currentRegion: KnockoutObservable<RegionName>;
    // TODO combine to position?
    private _currentRoute: KnockoutObservable<number>;
    currentDungeon: string;
    currentTown: string;

    regions: Region[];


    constructor(regions: Region[]) {
        this.regions = regions;
        this._currentRegion = ko.observable(this.defaults.currentRegion);
        this._currentRoute = ko.observable(this.defaults.currentRoute);
    }

    moveToRoute(route: number, region: RegionName) {
        if (route === this.currentRoute && region === this.currentRegion) {
            console.log('This is the current route');
            return;
        }
        if (!this.isValidRoute(route, region)) {
            return;
        }

        const newRoute = this.getRegion(region).getRoute(route);

        if (!newRoute.canAccess()) {
            Notifier.notify(newRoute.lockedReason(), GameConstants.NotificationOption.danger);
            return;
        }

        this.currentRoute = route;
        this.currentRegion = region;
        Battle.generateNewEnemy();

        this.currentTown = null;

        App.game.gameState = GameConstants.GameState.fighting;
        GameController.applyRouteBindings();
    }

    getRegion(type: RegionName): Region {
        const region = this.regions.find(region => {
            return region.type === type;
        });
        if (region === undefined) {
            console.error(`Could not find region ${region}`);
        }
        return region;
    }

    isValidRoute(route: number, region: RegionName) {
        const foundRegion = this.getRegion(region);
        if (foundRegion === undefined) {
            console.error(`Undefined region ${region} with route ${route}`);
            return false;
        }
        const foundRoute = foundRegion.getRoute(route);
        if (foundRoute === undefined) {
            console.error(`Undefined route ${route} in region ${RegionName[region]}`);
            return false;
        }
        return true;
    }

    accessToRoute(route: number, region: RegionName) {
        return this.isValidRoute(route, region) && this.getRegion(region).getRoute(route).canAccess();
    }

    // Helper methods
    getCurrentRegion(): Region {
        return this.getRegion(this.currentRegion);
    }

    getShop(name: ShopName): Shop {
        return this.getCurrentRegion().getShop(name);
    }

    getGym(name: GymLeaderName): Gym {
        return this.getCurrentRegion().getGym(name);
    }

    getDungeon(name: DungeonName): Dungeon {
        return this.getCurrentRegion().getDungeon(name);
    }

    toJSON(): object {
        return {
            currentRoute: this.currentRoute,
            currentRegion: this.currentRegion,
        };
    }

    fromJSON({ currentRegion, currentRoute }: { currentRegion: number; currentRoute: number }): void {
        this.currentRegion = currentRegion ?? this.defaults.currentRegion;
        this.currentRoute = currentRoute ?? this.defaults.currentRoute;
    }

    // Knockout getters/setters
    get currentRegion(): RegionName {
        return this._currentRegion();
    }

    set currentRegion(region: RegionName) {
        this._currentRegion(region);
    }

    get currentRoute(): number {
        return this._currentRoute();
    }

    set currentRoute(number: number) {
        this._currentRoute(number);
    }
}
