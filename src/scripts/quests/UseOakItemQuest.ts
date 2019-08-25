/// <reference path="Quest.ts" />

class UseOakItemQuest extends Quest implements QuestInterface {
    constructor(item: GameConstants.OakItem, amount: number) {
        super(amount, amount * GameConstants.USE_OAK_ITEM_BASE_REWARD);
        this.description = `Gain the benefit from the ${GameConstants.humanifyString(GameConstants.OakItem[item])} ${amount} times.`;
        this.questFocus = player.statistics.oakItemUses[item];
    }
}
