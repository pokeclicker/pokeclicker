/// <reference path="Quest.ts" />

class DefeatPokemonsQuest extends Quest implements QuestInterface {
    private route: number;
    private amount: number;

    constructor(index: number, route: number, killsNeeded: number) {
        super(index);
        this.description = `Defeat ${killsNeeded} pokemon on route ${route}`;
        this.pointsReward = DefeatPokemonsQuest.calcReward(route, killsNeeded);
        this.xpReward = Math.ceil(killsNeeded / 10);
        this.route = route;
        this.amount = killsNeeded;
        this.questFocus = player.routeKills[this.route];
        this.createProgressObservables();
    }

    private static calcReward(route: number, killsNeeded: number): number {
        let attacksPerPokemon = Math.ceil(PokemonFactory.routeHealth(route) / player.pokemonAttackObservable())
        return GameConstants.DEFEAT_POKEMONS_BASE_REWARD * attacksPerPokemon * killsNeeded;
    }
}