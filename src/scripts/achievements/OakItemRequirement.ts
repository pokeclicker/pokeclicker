/// <reference path="../../declarations/achievements/Requirement.d.ts" />

class MaxLevelOakItemRequirement extends Requirement {
    constructor(value : number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.oakItems.itemList.filter((item : OakItem) => item.isMaxLevel()).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Oak Items leveled to the maximum level.`;
    }
}
