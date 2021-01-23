/// <reference path="../Quest.ts" />

class DefeatPokemonsQuest extends Quest implements QuestInterface {

    private route: number;
    private region: GameConstants.Region;

    constructor(killsNeeded: number, reward: number, route: number, region: GameConstants.Region) {
        super(killsNeeded, reward);
        this.route = route;
        this.region = region;
        this.focus = App.game.statistics.routeKills[this.region][this.route];
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(100, 500);
        const region = SeededRand.intBetween(0, player.highestRegion());
        const route = SeededRand.fromArray(Routes.getRoutesByRegion(region)).number;
        const reward = this.calcReward(amount, route, region);
        return [amount, reward, route, region];
    }

    private static calcReward(killsNeeded: number, route: number, region: number): number {
        const attacksPerPokemon = Math.ceil(Math.min(4, PokemonFactory.routeHealth(route, region) / Math.max(1, App.game.party.calculatePokemonAttack())));
        const reward = Math.ceil(GameConstants.DEFEAT_POKEMONS_BASE_REWARD * attacksPerPokemon * killsNeeded);
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Defeat ${this.amount.toLocaleString('en-US')} Pokémon on ${Routes.getName(this.route, this.region)}.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.route);
        json['data'].push(this.region);
        return json;
    }
}
