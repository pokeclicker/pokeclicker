class Region {
    type: RegionType;

    pokemonsAvailable: number;


    routes: Route[];
    gyms: Gym[];

    getRoute(number: number): Route {
        return this.routes.find(route => {
            return route.number === number;
        });
    }

}