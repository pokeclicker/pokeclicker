/// <reference path="Quest.ts" />

class DefeatPokemonsQuest extends Quest implements QuestInterface {
    private route: number;
    private killsNeeded: number;

    constructor(route: number, killsNeeded: number) {
        super();
        this.description = `Defeat ${killsNeeded} pokemon on route ${route}`;
        this.pointsReward = DefeatPokemonsQuest.calcReward(route, killsNeeded);
        this.xpReward = Math.ceil(killsNeeded / 10);
        this.route = route;
        this.killsNeeded = killsNeeded;
    }

    beginQuest() {
        let initialKills = player.routeKills[this.route]();
        this.progress = ko.computed(function(){
            return Math.min(1, (player.routeKills[this.route]() - initialKills) / this.killsNeeded);
        }, this);
        this.isCompleted = ko.computed(function() {
            return player.routeKills[this.route]() > initialKills + this.killsNeeded;
        }, this);
    }

    private static calcReward(route: number, killsNeeded: number): number {
        let attacksPerPokemon = Math.ceil(PokemonFactory.routeHealth(route) / player.pokemonAttackObservable())
        return GameConstants.DEFEAT_POKEMONS_BASE_REWARD * attacksPerPokemon * killsNeeded;
    }
}