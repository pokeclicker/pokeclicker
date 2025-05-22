import * as GameConstants from '../GameConstants';
import RegionRoute from './RegionRoute';
import SubRegions from '../subRegion/SubRegions';

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

    public static getName(route: number, region: number, alwaysIncludeRegionName = false, includeSubRegionName = false): string {
        const regionName = GameConstants.camelCaseToString(GameConstants.Region[region]);
        let resultRoute = this.regionRoutes.find((routeData) => routeData.region === region && routeData.number === route);
        let routeName = resultRoute?.routeName ?? 'Unknown Route';
        if (alwaysIncludeRegionName && !routeName.includes(regionName)) {
            routeName += ` in ${regionName}`;
        } else if (includeSubRegionName && resultRoute) {
            const subRegionName = SubRegions.getSubRegionById(region, resultRoute.subRegion ?? 0).name;
            if (!routeName.includes(subRegionName)) {
                routeName += ` in ${subRegionName}`;
            }
        }
        return routeName;
    }

    public static unnormalizeRoute(normalizedRoute: number): number {
        return this.regionRoutes[normalizedRoute - 1].number;
    }

    public static normalizedNumber(region: GameConstants.Region, route: number, skipIgnoredRoutes: boolean): number {
        if (region === GameConstants.Region.none) {
            return route;
        }
        // For some numbers, like pokemon hp, we want to be able to add a new route, without changing the balance of the whole game
        // For those numbers, skipIgnoredRoutes == true. If It's false, filteredRegionRoutes will just be all routes and the if will never happen
        const filteredRegionRoutes = this.regionRoutes.filter((r) => !skipIgnoredRoutes || !r.ignoreRouteInCalculations);
        // If this route is ignored, we will find the index of the route before this, which is not ignored
        // This is done by looping backwards, and checking all routes
        if (skipIgnoredRoutes && this.regionRoutes.find((routeData) => routeData.region === region && routeData.number === route)?.ignoreRouteInCalculations) {
            for (let i = this.regionRoutes.findIndex((routeData) => routeData.region === region && routeData.number === route) - 1; i >= 0; i--) {
                if (!this.regionRoutes[i].ignoreRouteInCalculations) {
                    return i + 1;
                }
                if (i === 0) {
                    throw new Error('Not implemented for ignoreRouteInCalculations = true on first region route');
                }
            }
        }
        return filteredRegionRoutes.findIndex((routeData) => routeData.region === region && routeData.number === route) + 1;
    }
}
