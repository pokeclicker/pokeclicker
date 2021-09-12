/// <reference path="../Quest.ts" />

class BuyItemsQuest extends Quest implements QuestInterface {

    private item: Item;

    constructor(amount: number, reward: number, itemName: string) {
        super(amount, reward);
        this.item = ItemList[itemName];
        this.focus = App.game.statistics.itemsObtained[this.item.name];
    }

    get description(): string {
        return `Buy ${this.amount.toLocaleString('en-US')} ${this.item.displayName}${this.amount != 1 ? 's' : ''}.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.item.name);
        return json;
    }
}
