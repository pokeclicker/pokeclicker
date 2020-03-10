class Region {
    type: RegionName;
    pokemonsAvailable: number;
    routes: Route[];
    gyms: Gym[];
    shops: Shop[];
    dungeons: Dungeon[];

    constructor(type: RegionName, pokemonsAvailable: number, routes: Route[], gyms: Gym[], shops: Shop[], dungeons: Dungeon[]) {
        this.type = type;
        this.pokemonsAvailable = pokemonsAvailable;
        this.routes = routes;
        this.gyms = gyms;
        this.shops = shops;
        this.dungeons = dungeons;
    }

    getRoute(number: number): Route {
        const route = this.routes.find(route => {
            return route.number === number;
        });
        if (route === undefined) {
            console.error(`Could not find route ${number}`);
        }
        return route;
    }

    getShop(name: ShopName) {
        const shop = this.shops.find(shop => {
            return shop.name === name;
        });
        if (shop === undefined) {
            console.error(`Could not find shop ${name}`);
        }
        return shop;

    }

    getGym(name: GymLeaderName) {
        const gym = this.gyms.find(gym => {
            return gym.leaderName === name;
        });
        if (gym === undefined) {
            console.error(`Could not find gym ${name}`);
        }
        return gym;
    }

    getDungeon(name: DungeonName) {
        const dungeon = this.dungeons.find(dungeon => {
            return dungeon.name === name;
        });
        if (dungeon === undefined) {
            console.error(`Could not find dungeon ${name}`);
        }
        return dungeon;
    }
}
