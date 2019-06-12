class Vitamin extends Item {

    type: GameConstants.VitaminType;

    constructor(type: GameConstants.VitaminType) {
        let basePrice = GameConstants.ItemPrice[GameConstants.VitaminType[type]];
        let priceMultiplier = 1;
        super(GameConstants.VitaminType[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    use() {
    }
}

ItemList['RareCandy'] = new Vitamin(GameConstants.VitaminType.RareCandy);
ItemList['Protein'] = new Vitamin(GameConstants.VitaminType.Protein);