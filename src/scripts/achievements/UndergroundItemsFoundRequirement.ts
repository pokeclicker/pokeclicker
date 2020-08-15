///<reference path="Requirement.ts"/>

class UndergroundItemsFoundRequirement extends Requirement {
    constructor( value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.statistics.undergroundItemsFound(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} items need to be found in the Underground.`;
    }
}
