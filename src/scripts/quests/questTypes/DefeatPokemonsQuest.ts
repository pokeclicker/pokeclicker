/// <reference path="../Quest.ts" />

class DefeatPokemonsQuest extends Quest implements QuestInterface {

    constructor(
        killsNeeded: number,
        reward: number,
        private route: number,
        private region: GameConstants.Region
    ) {
        super(killsNeeded, reward);
        this.focus = App.game.statistics.routeKills[this.region][this.route];
    }

    public static generateData(): any[] {
        const amount = SeededRand.intBetween(100, 500);
        let attempts = 0;
        let region = GameConstants.Region.kanto;
        let route = 1;
        // Try to find unlocked route, end after 10 attempts
        do {
            region = SeededRand.intBetween(0, player.highestRegion());
            route = SeededRand.fromArray(Routes.getRoutesByRegion(region)).number;
        } while (!MapHelper.accessToRoute(route, region) && ++attempts < 10);
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
