///<reference path="Item.ts"/>

class ShovelItem extends Item {

    constructor(displayName: string, description: string) {
        super('Berry_Shovel', undefined, undefined, undefined, displayName, description, 'farm');
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.shovelAmt, amt);
    }

}

ItemList['Berry_Shovel']   = new ShovelItem('Berry Shovel', 'Removes Berry Plants in the Farm.');

ShopEntriesList['Berry Shovel'] = new ShopItem('Berry Shovel', ItemList['Berry_Shovel'], 300, Currency.farmPoint, { multiplierDecreaser: MultiplierDecreaser.Berry });
