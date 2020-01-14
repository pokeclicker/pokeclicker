class Region {
    type: RegionType;

    pokemonsAvailable: number;


    routes: Route[];
    gyms: Gym[];
    shops: Shop[];

    constructor(type: RegionType, pokemonsAvailable: number, routes: Route[], gyms: Gym[], shops: Shop[]) {
        this.type = type;
        this.pokemonsAvailable = pokemonsAvailable;
        this.routes = routes;
        this.gyms = gyms;
        this.shops = shops;
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

    getShop(name: ShopName) {
        const shop = this.shops.find(shop => {
            return shop.name === name;
        });
        if (shop === undefined) {
            console.error(`Could not find shop ${ShopName[name]}`);
        }
        return shop;

    }
}