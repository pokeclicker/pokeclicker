abstract class LocationNavigatorItem {
    abstract get name(): string;
    abstract isLocked(): boolean;
    abstract moveToLocation(): void;
}

class TownLocationNavigatorItem extends LocationNavigatorItem {
    constructor(public town: Town) {
        super();
    }

    get name(): string {
        return this.town.name;
    }

    isLocked(): boolean {
        return !this.town.isUnlocked();
    }

    moveToLocation(): void {
        MapHelper.moveToTown(this.town.name);
    }
}

class RouteLocationNavigatorItem extends LocationNavigatorItem {
    constructor(public route: RegionRoute) {
        super();
    }

    get name(): string {
        return this.route.routeName;
    }

    isLocked(): boolean {
        return !this.route.isUnlocked();
    }

    moveToLocation(): void {
        MapHelper.moveToRoute(this.route.number, this.route.region);
    }
}
