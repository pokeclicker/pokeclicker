import * as GameConstants from '../GameConstants';
import RegionRoute from './RegionRoute';

export default class Routes {
    public static regionRoutes: RegionRoute[] = [];

    public static add(route: RegionRoute): void {
        this.regionRoutes.push(route);
        // Sort the routes so we can normalize the route number
        this.sortRegionRoutes();
    }

    public static sortRegionRoutes(): void {
        this.regionRoutes
            .sort((routeA, routeB) => routeA.orderNumber - routeB.orderNumber)
            .sort((routeA, routeB) => routeA.region - routeB.region);
    }

    public static getRoute(region: GameConstants.Region, route: number): RegionRoute {
        return this.regionRoutes.find((routeData) => routeData.region === region && routeData.number === route);
    }

    public static getRoutesByRegion(region: GameConstants.Region): RegionRoute[] {
        return this.regionRoutes.filter((routeData) => routeData.region === region);
    }

    public static getRegionByRoute(route: number): GameConstants.Region {
        return this.regionRoutes.find((routeData) => routeData.number === route).region;
    }

    public static getName(route: number, region: number, includeRegionName = false): string {
        const regionName = GameConstants.camelCaseToString(GameConstants.Region[region]);
        let routeName = this.regionRoutes.find((routeData) => routeData.region === region && routeData.number === route)?.routeName ?? 'Unknown Route';
        if (includeRegionName && !routeName.includes(regionName)) {
            routeName += ` in ${regionName}`;
        }
        return routeName;
    }

    public static unnormalizeRoute(normalizedRoute: number): number {
        return this.regionRoutes[normalizedRoute - 1].number;
    }

    public static normalizedNumber(region: GameConstants.Region, route: number): number {
        if (region === GameConstants.Region.none) {
            return route;
        }
        return this.regionRoutes.findIndex((routeData) => routeData.region === region && routeData.number === route) + 1;
    }
}
