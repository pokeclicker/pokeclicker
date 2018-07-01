/// <reference path="Quest.ts" />

class DefeatPokemonsQuest extends Quest implements QuestInterface {
    private route: number;

    constructor(route: number, killsNeeded: number) {
        super(killsNeeded, DefeatPokemonsQuest.calcReward(route, killsNeeded));
        this.description = `Defeat ${killsNeeded} pokemon on route ${route}.`;
        this.route = route;
        this.questFocus = player.routeKills[this.route];
    }

    private static calcReward(route: number, killsNeeded: number): number {
        let attacksPerPokemon = Math.ceil(Math.min(4, PokemonFactory.routeHealth(route) / Math.max(1, player.pokemonAttackObservable())));
        return Math.ceil(GameConstants.DEFEAT_POKEMONS_BASE_REWARD * attacksPerPokemon * killsNeeded);
    }
}