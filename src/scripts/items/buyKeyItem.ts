///<reference path="../keyItems/KeyItems.ts"/>
class buyKeyItem extends Item {

        item: KeyItems.KeyItem;

        constructor(item: KeyItems.KeyItem, price: number, maxAmount: number = 1) {
            let priceMultiplier = 1;
            super(KeyItems.KeyItem[item], price, priceMultiplier, GameConstants.Currency.questPoint, maxAmount);
            this.item = item;
        }

        totalPrice(amt: number) {
            if (amt > this.maxAmount) {
              amt = this.maxAmount;
            }
            return this.basePrice * amt;
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


ItemList['Dungeon_ticket'] = new buyKeyItem(KeyItems.KeyItem.Dungeon_ticket, 250);
ItemList['Explorer_kit'] = new buyKeyItem(KeyItems.KeyItem.Explorer_kit, 5000);
