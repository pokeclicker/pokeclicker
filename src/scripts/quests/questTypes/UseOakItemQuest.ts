/// <reference path="../Quest.ts" />

class UseOakItemQuest extends Quest implements QuestInterface {

    private item: OakItemType;

    constructor(amount: number, reward: number, item: OakItemType) {
        super(amount, reward);
        this.item = item;
        this.focus = App.game.statistics.oakItemUses[this.item];
    }

    public static canComplete() {
        return App.game.oakItems.canAccess() && !App.game.challenges.list.disableOakItems.active();
    }

    public static generateData(): any[] {
        const possibleItems = [
            OakItemType.Magic_Ball,
            OakItemType.Amulet_Coin,
            // OakItemType.Rocky_Helmet,
            OakItemType.Exp_Share,
            // OakItemType.Sprayduck,
            // OakItemType.Shiny_Charm,
            // OakItemType.Magma_Stone,
            // OakItemType.Cell_Battery,
            // OakItemType.Squirtbottle,
            // OakItemType.Sprinklotad,
            // OakItemType.Explosive_Charge,
            // OakItemType.Treasure_Scanner,
        ];
        const oakItem = SeededRand.fromArray(possibleItems);
        const amount = SeededRand.intBetween(100, 500);
        const reward = this.calcReward(amount, oakItem);
        return [amount, reward, oakItem];
    }

    private static calcReward(amount: number, item: OakItemType) {
        const reward = amount * GameConstants.USE_OAK_ITEM_BASE_REWARD;
        return super.randomizeReward(reward);
    }

    get description(): string {
        if (this.customDescription) {
            return this.customDescription;
        }
        const desc = [];
        desc.push(`Equip the ${GameConstants.humanifyString(OakItemType[this.item])} and`);
        if (this.item == OakItemType.Magic_Ball) {
            desc.push(`capture ${this.amount.toLocaleString('en-US')} wild Pokémon.`);
        } else if (this.item == OakItemType.Amulet_Coin) {
            desc.push(`earn Pokédollars ${this.amount.toLocaleString('en-US')} times.`);
        } else if (this.item == OakItemType.Exp_Share) {
            desc.push(`defeat ${this.amount.toLocaleString('en-US')} Pokémon.`);
        } else {
            desc.push(`gain its benefit ${this.amount.toLocaleString('en-US')} times.`);
        }
        return desc.join(' ');
    }

    toJSON() {
        const json = super.toJSON();
        json.name = this.constructor.name;
        json.data.push(this.item);
        return json;
    }
}
