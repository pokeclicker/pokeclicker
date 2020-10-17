///<reference path="../oakItems/OakItem.ts"/>
class BuyOakItem extends Item {

    item: OakItems.OakItem;

    constructor(item: OakItems.OakItem, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint, options = {}) {
        super(OakItems.OakItem[item], basePrice, currency, { maxAmount: 1, ...options });
        this.item = item;
    }

    totalPrice(amt: number) {
        if (amt > this.maxAmount) {
            amt = this.maxAmount;
        }
        return this.basePrice * amt;
    }

    gain(amt: number) {
        App.game.oakItems.purchaseList[this.item](true);
    }

    use() {
    }

    isAvailable(): boolean {
        return super.isAvailable() && !App.game.oakItems.purchaseList[this.item]();
    }
}

ItemList['Squirtbottle'] = new BuyOakItem(OakItems.OakItem.Squirtbottle, 2000, Currency.farmPoint);
ItemList['Sprinklotad'] = new BuyOakItem(OakItems.OakItem.Sprinklotad, 4000, Currency.farmPoint);
