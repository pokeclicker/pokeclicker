///<reference path="../../declarations/keyItems/KeyItems.d.ts"/>
class BuyKeyItem extends Item {

        item: KeyItemType;

        constructor(item: KeyItemType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint, options?: ShopOptions, displayName?: string) {
            super(KeyItemType[item], basePrice, currency, { maxAmount: 1, ...options }, displayName);
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

        isAvailable(): boolean {
            return super.isAvailable() && !App.game.keyItems.hasKeyItem(this.item);
        }

        get image(): string {
            return `assets/images/keyitems/${this.name}.png`;
        }

}


ItemList['Dungeon_ticket'] = new BuyKeyItem(KeyItemType.Dungeon_ticket, 100, undefined, undefined, 'Dungeon Ticket');
ItemList['Explorer_kit']   = new BuyKeyItem(KeyItemType.Explorer_kit, 5000, undefined, undefined, 'Explorer Kit');
