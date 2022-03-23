///<reference path="../../declarations/requirements/AchievementRequirement.d.ts"/>

class DiamondRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Diamond']);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalDiamonds(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Diamonds need to be obtained.`;
    }
}
