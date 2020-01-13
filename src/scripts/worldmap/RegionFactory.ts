class RegionFactory {

    static createKanto(): Region {

        const routes: Route[] = [
            RouteFactory.createRoute(1, {land: ['Pidgey', 'Rattata']}),
            RouteFactory.createRoute(2, {land: ['Pidgey', 'Rattata']}),
        ];

        return new Region(RegionType.kanto, 151, routes, []);
    }
}