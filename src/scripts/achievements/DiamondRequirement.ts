/// <reference path="../../declarations/achievements/Requirement.d.ts" />

class DiamondRequirement extends Requirement {
    constructor( value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalDiamonds(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Diamonds need to be obtained.`;
    }
}
