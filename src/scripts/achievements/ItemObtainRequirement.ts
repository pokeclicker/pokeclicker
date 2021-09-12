///<reference path="AchievementRequirement.ts"/>

class ItemObtainedRequirement extends AchievementRequirement {
    item: Item;
    constructor(itemName: string, value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Item']);

        this.item = ItemList[itemName];
    }

    public getProgress() {
        return Math.min(App.game.statistics.itemsObtained[this.item.name](), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} ${this.item?.displayName} need to be obtained.`;
    }
}
