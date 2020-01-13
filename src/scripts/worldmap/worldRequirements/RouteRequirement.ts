class RouteRequirement implements WorldRequirement {
    route: number;

    constructor(route: number) {
        this.route = route;
    }

    isCompleted(): boolean {
        return player.statistics.routeKills[this.route]() >= GameConstants.ROUTE_KILLS_NEEDED;
    }

    lockedReason(): string {
        return `You need to complete Route ${this.route} before you can access this location.`;
    }
}