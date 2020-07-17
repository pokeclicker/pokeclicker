class Vitamin extends Item {

    type: GameConstants.VitaminType;

    constructor(type: GameConstants.VitaminType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.money) {
        super(GameConstants.VitaminType[type], basePrice, currency);
        this.type = type;
    }

    use() {
    }
}

ItemList['RareCandy'] = new Vitamin(GameConstants.VitaminType.RareCandy, Infinity);
ItemList['Protein']   = new Vitamin(GameConstants.VitaminType.Protein, Infinity);