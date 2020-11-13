///<reference path="../oakItems/OakItems.ts"/>
class BuyOakItem extends Item {

    item: OakItems.OakItem;

    constructor(item: OakItems.OakItem, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint) {
        super(OakItems.OakItem[item], basePrice, currency, { maxAmount: 1 }, undefined, 'Purchase to unlock this Oak Item');
        this.item = item;
    }

    totalPrice(amt: number) {
        if (amt > this.maxAmount) {
            amt = this.maxAmount;
        }
        return this.basePrice * amt;
    }

    gain(amt: number) {
        const oakItem = App.game.oakItems.itemList[this.item];
        if (oakItem instanceof BoughtOakItem) {
            oakItem.purchased = true;
        }
    }

    use() {
    }

    isAvailable(): boolean {
        const oakItem = App.game.oakItems.itemList[this.item];
        const purchased = (oakItem instanceof BoughtOakItem) ? oakItem.purchased : true;
        return super.isAvailable() && !purchased;
    }
}

ItemList['Squirtbottle'] = new BuyOakItem(OakItems.OakItem.Squirtbottle, 5000, Currency.farmPoint);
ItemList['Sprinklotad'] = new BuyOakItem(OakItems.OakItem.Sprinklotad, 10000, Currency.farmPoint);
