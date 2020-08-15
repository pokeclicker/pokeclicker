///<reference path="Requirement.ts"/>

class ClickRequirement extends Requirement {
    constructor( value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.statistics.clickAttacks(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} click attacks need to be completed.`;
    }
}
