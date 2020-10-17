///<reference path="Item.ts"/>
class MulchItem extends Item {
    type: MulchType;

    constructor(type: MulchType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.farmPoint, options = {}) {
        super(MulchType[type], basePrice, currency, options);
        this.type = type;
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.mulchList[this.type], amt);
    }

    use() {
    }
}

// TODO: HLXII - Balance cost based on highest yield strategy
ItemList['Boost_Mulch']   = new MulchItem(MulchType.Boost_Mulch, 200);
ItemList['Rich_Mulch']  = new MulchItem(MulchType.Rich_Mulch, 300);
ItemList['Surprise_Mulch']  = new MulchItem(MulchType.Surprise_Mulch, 400);
ItemList['Amaze_Mulch'] = new MulchItem(MulchType.Amaze_Mulch, 500);
