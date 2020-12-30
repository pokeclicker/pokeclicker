///<reference path="AchievementRequirement.ts"/>

class ClickRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Click']);
    }

    public getProgress() {
        return Math.min(App.game.statistics.clickAttacks(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} click attacks need to be completed.`;
    }
}
