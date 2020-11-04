///<reference path="Item.ts"/>
///<reference path="../farming/MulchType.ts"/>

class MulchItem extends Item {
    type: MulchType;

    constructor(type: MulchType, basePrice: number, displayName: string) {
        super(MulchType[type], basePrice, GameConstants.Currency.farmPoint, { multiplierDecreaser: MultiplierDecreaser.Berry }, displayName);
        this.type = type;
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.mulchList[this.type], amt);
    }

    use() {
    }
}

// TODO: HLXII - Balance cost based on highest yield strategy
ItemList['Boost_Mulch']   = new MulchItem(MulchType.Boost_Mulch, 200, 'Boost Mulch');
ItemList['Rich_Mulch']  = new MulchItem(MulchType.Rich_Mulch, 300, 'Rich Mulch');
ItemList['Surprise_Mulch']  = new MulchItem(MulchType.Surprise_Mulch, 400, 'Surprise Mulch');
ItemList['Amaze_Mulch'] = new MulchItem(MulchType.Amaze_Mulch, 500, 'Amaze Mulch');
