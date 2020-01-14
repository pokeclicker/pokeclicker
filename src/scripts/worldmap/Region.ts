class Region {
    type: RegionType;

    pokemonsAvailable: number;


    routes: Route[];
    gyms: Gym[];

    constructor(type: RegionType, pokemonsAvailable: number, routes: Route[], gyms: Gym[]) {
        this.type = type;
        this.pokemonsAvailable = pokemonsAvailable;
        this.routes = routes;
        this.gyms = gyms;
    }

    getRoute(number: number): Route {
        const route = this.routes.find(route => {
            return route.number === number;
        });
        if (route === undefined) {
            console.error(`Could not find route ${route}`);
        }
        return route;
    }
}