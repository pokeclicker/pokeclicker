///<reference path="../../declarations/enums/OakItemType.d.ts"/>
class BuyOakItem extends Item {

    item: OakItemType;

    constructor(item: OakItemType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint) {
        super(OakItemType[item], basePrice, currency, { maxAmount: 1 }, undefined, 'Purchase to unlock this Oak Item');
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

    isAvailable(): boolean {
        const oakItem = App.game.oakItems.itemList[this.item];
        const purchased = (oakItem instanceof BoughtOakItem) ? oakItem.purchased : true;
        return super.isAvailable() && !purchased;
    }

    get image(): string {
        return `assets/images/oakitems/${this.name}.png`;
    }

}

ItemList['Squirtbottle'] = new BuyOakItem(OakItemType.Squirtbottle, 5000, Currency.farmPoint);
ItemList['Sprinklotad'] = new BuyOakItem(OakItemType.Sprinklotad, 10000, Currency.farmPoint);
ItemList['Explosive_Charge'] = new BuyOakItem(OakItemType.Explosive_Charge, 5000, Currency.questPoint);
ItemList['Treasure_Scanner'] = new BuyOakItem(OakItemType.Treasure_Scanner, 10000, Currency.questPoint);
