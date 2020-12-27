/// <reference path="../../declarations/achievements/Requirement.d.ts" />

class ShinyPokemonRequirement extends Requirement {
    constructor(value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.party.caughtPokemon.filter(p => p.shiny).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Shiny Pokémon need to be obtained .`;
    }
}
