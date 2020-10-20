///<reference path="Item.ts"/>
class MulchItem extends Item {
    type: MulchType;

    constructor(type: MulchType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.farmPoint, displayName: string) {
        super(MulchType[type], basePrice, currency, undefined, displayName);
        this.type = type;
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.mulchList[this.type], amt);
    }

    use() {
    }
}

// TODO: HLXII - Balance cost based on highest yield strategy
ItemList['Boost_Mulch']   = new MulchItem(MulchType.Boost_Mulch, 200, undefined, 'Boost Mulch');
ItemList['Rich_Mulch']  = new MulchItem(MulchType.Rich_Mulch, 300, undefined, 'Rich Mulch');
ItemList['Surprise_Mulch']  = new MulchItem(MulchType.Surprise_Mulch, 400, undefined, 'Surprise Mulch');
ItemList['Amaze_Mulch'] = new MulchItem(MulchType.Amaze_Mulch, 500, undefined, 'Amaze Mulch');
