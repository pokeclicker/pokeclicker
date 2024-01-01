interface LocationNavigatorItem {
    get name(): string;
    isLocked(): boolean;
    moveToLocation(): void;
}

class TownLocationNavigatorItem implements LocationNavigatorItem {
    constructor(public town: Town) {}

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

class RouteLocationNavigatorItem implements LocationNavigatorItem {
    constructor(public route: RegionRoute) {}

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
