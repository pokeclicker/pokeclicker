///<reference path="Requirement.ts"/>

class UndergroundItemsFoundRequirement extends Requirement {
    constructor( value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.statistics.undergroundItemsFound(), this.requiredValue);
    }
}
