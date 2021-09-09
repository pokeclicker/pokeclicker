///<reference path="AchievementRequirement.ts"/>

class ProteinObtainRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Protein']);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalProteinsObtained(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} proteins need to be obtained in total. Used proteins stay counted.`;
    }
}
