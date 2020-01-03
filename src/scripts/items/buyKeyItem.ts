///<reference path="../keyItems/KeyItems.ts"/>
class buyKeyItem extends Item {

        item: KeyItems.KeyItem;

        constructor(item: KeyItems.KeyItem, price: number) {
            let priceMultiplier = 1;
            super(KeyItems.KeyItem[item], price, priceMultiplier, GameConstants.Currency.questPoint);
            this.item = item;
        }

        totalPrice(amt: number) {
            return this.basePrice;
        }
    
        maxAmount(cost: number): number {
            return this.totalPrice(1) <= cost ? 1 : 0;
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
