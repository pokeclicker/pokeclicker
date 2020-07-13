/// <reference path="Quest.ts" />

class UseOakItemQuest extends Quest implements QuestInterface {
    constructor(item: OakItems.OakItem, amount: number) {
        super(amount, amount * GameConstants.USE_OAK_ITEM_BASE_REWARD);
        this.description = `Gain the benefit from the ${GameConstants.humanifyString(OakItems.OakItem[item])} ${amount.toLocaleString('en-US')} times.`;
        this.questFocus = App.game.statistics.oakItemUses[item];
    }
}
