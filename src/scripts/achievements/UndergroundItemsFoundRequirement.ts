///<reference path="../../declarations/requirements/AchievementRequirement.d.ts"/>

class UndergroundItemsFoundRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Underground Items Found']);
    }

    public getProgress() {
        return Math.min(App.game.statistics.undergroundItemsFound(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} items need to be found in the Underground.`;
    }
}
