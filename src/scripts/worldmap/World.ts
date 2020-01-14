class World implements Feature {
    name = 'World';

    saveKey = 'world';
    defaults = {
        currentRegion: RegionType.kanto,
        currentRoute: 1,
    };

    private _currentRegion: KnockoutObservable<RegionType>;
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

    moveToRoute(route: number, region: RegionType) {
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

    getRegion(type: RegionType): Region {
        const region = this.regions.find(region => {
            return region.type === type;
        });
        if (region === undefined) {
            console.error(`Could not find region ${region}`);
        }
        return region;
    }

    isValidRoute(route: number, region: RegionType) {
        const foundRegion = this.getRegion(region);
        if (foundRegion === undefined) {
            console.error(`Undefined region ${region} with route ${route}`);
            return false;
        }
        const foundRoute = foundRegion.getRoute(route);
        if (foundRoute === undefined) {
            console.error(`Undefined route ${route} in region ${RegionType[region]}`);
            return false;
        }
        return true;
    }

    accessToRoute(route: number, region: RegionType) {
        return this.isValidRoute(route, region) && this.getRegion(region).getRoute(route).canAccess();
    }

    initialize(): void {
        // This method intentionally left blank
    }

    canAccess(): boolean {
        return true;
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

    toJSON(): object {
        return {
            currentRoute: this.currentRoute,
            currentRegion: this.currentRegion,
        };
    }

    fromJSON(json: object): void {
        if (json == null) {
            return;
        }
        this.currentRegion = json['currentRegion'] ?? this.defaults.currentRegion;
        this.currentRoute = 1;
        // this.currentRoute = json['currentRoute'] ?? this.defaults.currentRoute;
    }

    // Knockout getters/setters
    get currentRegion(): RegionType {
        return this._currentRegion();
    }

    set currentRegion(region: RegionType) {
        this._currentRegion(region);
    }

    get currentRoute(): number {
        return this._currentRoute();
    }

    set currentRoute(number: number) {
        this._currentRoute(number);
    }
}