///<reference path="../keyItems/KeyItems.ts"/>
///<reference path="./ShopEntries.ts"/>

class KeyShopItem extends ShopEntry {

    constructor(
        name: string,
        public item: KeyItems.KeyItem,
        basePrice: number,
        currency: GameConstants.Currency = GameConstants.Currency.money
    ) {
        super(name, basePrice, currency, { maxAmount: 1 });
    }

    get displayName(): string {
        return App.game.keyItems.itemList[this.item].displayName;
    }
    get description(): string {
        return App.game.keyItems.itemList[this.item].description;
    }
    get image(): string {
        return `assets/images/keyitems/${KeyItems.KeyItem[this.item]}.png`;
    }

}

ShopEntriesList['Dungeon Ticket'] = new KeyShopItem('Dungeon Ticket', KeyItems.KeyItem.Dungeon_ticket, 100, Currency.questPoint);
ShopEntriesList['Explorer Kit'] = new KeyShopItem('Explorer Kit', KeyItems.KeyItem.Explorer_kit, 5000, Currency.questPoint);
