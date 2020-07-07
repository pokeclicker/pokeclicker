///<reference path="Requirement.ts"/>

class ShinyPokemonRequirement extends Requirement {
    constructor(value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.party.shinyPokemon.filter(id => id > 0).length, this.requiredValue);
    }
}
