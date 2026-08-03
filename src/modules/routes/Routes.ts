import * as GameConstants from '../GameConstants';
import RegionRoute from './RegionRoute';
import SubRegions from '../subRegion/SubRegions';

export default class Routes {
    public static regionRoutes: RegionRoute[] = [];

    public static add(route: RegionRoute): void {
        this.regionRoutes.push(route);
        this.checkRouteOrder();
    }

    // Replaces automated sorting: crash the game if routes aren't added in difficulty order
    public static checkRouteOrder(): void {
        let index = this.regionRoutes.length - 1;
        const lastRoute = this.regionRoutes[index];
        let previousRoute = undefined;
        while (index-- && !previousRoute) {
            if (lastRoute.region == this.regionRoutes[index].region) {
                previousRoute = this.regionRoutes[index];
            }
        }
        if (previousRoute && previousRoute.orderNumber > lastRoute.orderNumber) {
            throw new Error(`Couldn't add ${lastRoute.routeName} : illegal route order`);
        }
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

    public static normalizedNumber(region: GameConstants.Region, route: number): number {
        if (region === GameConstants.Region.none) {
            return route;
        }
        let count = 0;
        for (let routeData of this.regionRoutes) {
            if (routeData.region === region && routeData.number === route) {
                return count + 1;
            }
            count += +!routeData.ignoreRouteInCalculations;
        }
        // Not meant to happen at all but just in case
        return 0;
    }
}
