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
        return this.routes.find(route => {
            return route.number === number;
        });
    }

}