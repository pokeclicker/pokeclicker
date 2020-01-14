class Region {
    type: RegionName;

    pokemonsAvailable: number;


    routes: Route[];
    gyms: Gym[];
    shops: Shop[];

    constructor(type: RegionName, pokemonsAvailable: number, routes: Route[], gyms: Gym[], shops: Shop[]) {
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

    getGym(name: GymLeaderName) {
        const gym = this.gyms.find(gym => {
            return gym.leaderName === name;
        });
        if (gym === undefined) {
            console.error(`Could not find gym ${GymLeaderName[name]}`);
        }
        return gym;
    }
}