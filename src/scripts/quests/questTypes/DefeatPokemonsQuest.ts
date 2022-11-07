/// <reference path="../Quest.ts" />

class DefeatPokemonsQuest extends Quest implements QuestInterface {

    constructor(
        killsNeeded: number,
        reward: number,
        public route: number,
        public region: GameConstants.Region,
        customDescription: string = undefined
    ) {
        super(killsNeeded, reward);
        this.focus = App.game.statistics.routeKills[this.region][this.route];
        this.customDescription = customDescription;
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(100, 500);
        const region = SeededRand.intBetween(0, player.highestRegion());
        // Only use unlocked routes
        const possibleRoutes = Routes.getRoutesByRegion(region).map(route => route.number).filter(route => MapHelper.accessToRoute(route, region));
        // If no routes unlocked in this region, just use the first route of the region
        const route = possibleRoutes.length ? SeededRand.fromArray(possibleRoutes) : GameConstants.StartingRoutes[region];
        const reward = this.calcReward(amount, route, region);
        return [amount, reward, route, region];
    }

    private static calcReward(killsNeeded: number, route: number, region: number): number {
        const attacksPerPokemon = Math.ceil(Math.min(4, PokemonFactory.routeHealth(route, region) / Math.max(1, App.game.party.pokemonAttackObservable())));
        const reward = Math.ceil(GameConstants.DEFEAT_POKEMONS_BASE_REWARD * attacksPerPokemon * killsNeeded);
        return super.randomizeReward(reward);
    }

    get description(): string {
        return this.customDescription ?? `Defeat ${this.amount.toLocaleString('en-US')} Pokémon on ${Routes.getName(this.route, this.region, true)}.`;
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        json.data.push(this.route);
        json.data.push(this.region);
        return json;
    }
}
