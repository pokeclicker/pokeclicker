/// <reference path="../Quest.ts" />

class DefeatPokemonsQuest extends Quest implements QuestInterface {
    private route: number;

    constructor(route: number, region: number, killsNeeded: number) {
        super(killsNeeded, DefeatPokemonsQuest.calcReward(route, region, killsNeeded));
        this.description = `Defeat ${killsNeeded.toLocaleString('en-US')} Pokémon on route ${route}.`;
        this.route = route;
        this.focus = App.game.statistics.routeKills[this.route];
    }

    private static calcReward(route: number, region: number, killsNeeded: number): number {
        const attacksPerPokemon = Math.ceil(Math.min(4, PokemonFactory.routeHealth(route, region) / Math.max(1, App.game.party.calculatePokemonAttack())));
        return Math.ceil(GameConstants.DEFEAT_POKEMONS_BASE_REWARD * attacksPerPokemon * killsNeeded);
    }
}
