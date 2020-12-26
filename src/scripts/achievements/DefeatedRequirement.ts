///<reference path="Requirement.ts"/>

class DefeatedRequirement extends Requirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Defeated']);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalPokemonDefeated(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Pokémon need to be defeated.`;
    }
}
