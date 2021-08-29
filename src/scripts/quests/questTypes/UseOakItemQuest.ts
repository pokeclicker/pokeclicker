/// <reference path="../Quest.ts" />

class UseOakItemQuest extends Quest implements QuestInterface {

    private item: OakItems.OakItem;

    constructor(amount: number, reward: number, item: OakItems.OakItem) {
        super(amount, reward);
        this.item = item;
        this.focus = App.game.statistics.oakItemUses[this.item];
    }

    public static canComplete() {
        return App.game.oakItems.canAccess() && !App.game.challenges.list.disableOakItems.active();
    }

    public static generateData(): any[] {
        const possibleItems = [
            OakItems.OakItem.Magic_Ball,
            OakItems.OakItem.Amulet_Coin,
            // OakItems.OakItem.Poison_Barb,
            OakItems.OakItem.Exp_Share,
            // OakItems.OakItem.Sprayduck,
            // OakItems.OakItem.Shiny_Charm,
            // OakItems.OakItem.Blaze_Cassette,
            // OakItems.OakItem.Cell_Battery,
            // OakItems.OakItem.Squirtbottle,
            // OakItems.OakItem.Sprinklotad,
            // OakItems.OakItem.Explosive_Charge,
            // OakItems.OakItem.Treasure_Scanner,
        ];
        const oakItem = SeededRand.fromArray(possibleItems);
        const amount = SeededRand.intBetween(100, 500);
        const reward = this.calcReward(amount, oakItem);
        return [amount, reward, oakItem];
    }

    private static calcReward(amount: number, item: OakItems.OakItem) {
        const reward = amount * GameConstants.USE_OAK_ITEM_BASE_REWARD;
        return super.randomizeReward(reward);
    }

    get description(): string {
        return `Gain the benefit from the ${GameConstants.humanifyString(OakItems.OakItem[this.item])} ${this.amount.toLocaleString('en-US')} times.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.item);
        return json;
    }
}
