class World implements Feature {
    name = 'World';

    saveKey = 'world';
    defaults = {
        currentRoute: 1,
        currentRegion: RegionType.kanto,
    };

    currentRegion: RegionType;
    // TODO combine to position?
    currentRoute: number;
    currentDungeon: string;
    currentTown: string;

    regions: Region[];


    constructor(regions: Region[]) {
        this.regions = regions;
    }

    moveToRoute(route: number, region: RegionType) {
        if (isNaN(route)) {
            console.error('Could not move to route', route);
            return;
        }

        if (route === this.currentRoute) {
            console.log('This is the current route');
            return;
        }
        const newRoute = this.getRegion(region).getRoute(route);

        if (newRoute === undefined) {
            console.log(`Could not find route ${route} in region ${RegionType[region]}`);
            return;
        }

        if (!newRoute.canAccess()) {
            Notifier.notify(newRoute.lockedReason(), GameConstants.NotificationOption.danger);
        }

        this.currentRoute = route;
        this.currentRegion = region;
        this.currentTown = null;

        App.game.gameState = GameConstants.GameState.fighting;
        GameController.applyRouteBindings();
    }

    getRegion(type: RegionType): Region {
        return this.regions.find(region => {
            return region.type === type;
        });
    }

    public static getAvailablePokemonList(route: number, region: RegionType, includeHeadbutt = true): string[] {
        // If the route is somehow higher than allowed, use the first route to generateWildPokemon Pokémon
        if (!MapHelper.validRoute(route, region)) {
            route = GameConstants.RegionRoute[region][0];
        }
        const possiblePokemons = pokemonsPerRoute[region][route];
        if (possiblePokemons == null) {
            return ['Rattata'];
        }
        let pokemonList = possiblePokemons.land;
        if (App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Super_rod) || possiblePokemons.land.length == 0) {
            pokemonList = pokemonList.concat(possiblePokemons.water);
        }
        if (includeHeadbutt) {
            pokemonList = pokemonList.concat(possiblePokemons.headbutt);
        }
        return pokemonList;
    }


    initialize(): void {
        // This method intentionally left blank
    }

    canAccess(): boolean {
        return true;
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

    toJSON(): object {
        return {
            currentRoute: this.currentRoute,
            currentRegion: this.currentRegion,
        };
    }

    fromJSON(json: object): void {
        if (json == null) {
            return;
        }
        this.currentRoute = json['currentRoute'] ?? this.defaults.currentRoute;
        this.currentRegion = json['currentRegion'] ?? this.defaults.currentRegion;
    }
}