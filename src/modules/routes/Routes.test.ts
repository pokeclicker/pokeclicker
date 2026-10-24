import Routes from './Routes';
// Side-effect: registers all routes (Routes.add throws here if a route is out of order)
import './RouteData';

describe('Routes', () => {
    it('has at least one route registered', () => {
        expect(Routes.regionRoutes.length).toBeGreaterThan(0);
    });

    // the runtime check in Routes.add throws during the import above, so this will only fail if that check is removed
    it('registers routes in difficulty order within each region', () => {
        const lastSeen: Partial<Record<number, { name: string; order: number }>> = {};
        const violations: string[] = [];
        Routes.regionRoutes.forEach((route) => {
            const prev = lastSeen[route.region];
            if (prev && prev.order > route.orderNumber) {
                violations.push(`${route.routeName} (order ${route.orderNumber}) added after ${prev.name} (order ${prev.order})`);
            }
            lastSeen[route.region] = { name: route.routeName, order: route.orderNumber };
        });
        expect(violations).toEqual([]);
    });
});
