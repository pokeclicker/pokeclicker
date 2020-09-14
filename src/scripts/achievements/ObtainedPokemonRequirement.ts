///<reference path="Requirement.ts"/>

class ObtainedPokemonRequirement extends Requirement {
    public pokemonID: number;

    constructor(pokemonID: number, value = 1, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.statistics.pokemonCaptured[this.pokemonID](), this.requiredValue);
    }

    public hint(): string {
        return `${pokemonMap[this.pokemonID].name} needs to be caught.`;
    }
}
