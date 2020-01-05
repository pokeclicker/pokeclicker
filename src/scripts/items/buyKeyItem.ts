///<reference path="../keyItems/KeyItems.ts"/>
class BuyKeyItem extends Item {

        item: KeyItems.KeyItem;

        constructor(item: KeyItems.KeyItem, price: number) {
            const priceMultiplier = 1;
            super(KeyItems.KeyItem[item], price, priceMultiplier, GameConstants.Currency.questPoint);
            this.item = item;
        }

        totalPrice(amt: number) {
            return this.basePrice;
        }

        gain(amt: number) {
            App.game.keyItems.gainKeyItem(this.item);
        }

        use() {
        }

        isAvailable(): boolean {
            return super.isAvailable() && !App.game.keyItems.hasKeyItem(this.item);
        }
}


ItemList['Dungeon_ticket'] = new BuyKeyItem(KeyItems.KeyItem.Dungeon_ticket, 250);
ItemList['Explorer_kit'] = new BuyKeyItem(KeyItems.KeyItem.Explorer_kit, 5000);
