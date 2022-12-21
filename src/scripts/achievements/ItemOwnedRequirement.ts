///<reference path="../../declarations/requirements/Requirement.d.ts"/>

class ItemOwnedRequirement extends Requirement {
    constructor(public itemName: string, value = 1, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option);
    }

    public getProgress() {
        return Math.min(player.itemList[this.itemName](), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} ${ItemList[this.itemName].displayName} needs to be purchased first.`;
    }
}
