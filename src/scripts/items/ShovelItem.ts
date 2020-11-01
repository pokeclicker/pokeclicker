///<reference path="Item.ts"/>

class ShovelItem extends Item {

    constructor(basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.farmPoint, displayName: string) {
        super('Berry_Shovel', basePrice, currency, { multiplierDecreaser: MultiplierDecreaser.Berry }, displayName);
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.shovelAmt, amt);
    }

    use() {
    }
}

// TODO: HLXII - Balance cost based on highest yield strategy
ItemList['Berry_Shovel']   = new ShovelItem(500, undefined, 'Berry Shovel');
