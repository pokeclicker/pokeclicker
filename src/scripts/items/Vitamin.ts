class Vitamin extends Item {

    type: GameConstants.VitaminType;

    constructor(type: GameConstants.VitaminType) {
        let basePrice = 0;
        let priceMultiplier = 1;
        super(GameConstants.VitaminType[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    buy(amt: number) {
    }

    use() {
    }
}

ItemList['RareCandy'] = new Vitamin(GameConstants.VitaminType.RareCandy);
ItemList['Protein'] = new Vitamin(GameConstants.VitaminType.Protein);