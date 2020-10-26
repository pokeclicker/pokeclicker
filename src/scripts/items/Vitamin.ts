class Vitamin extends Item {

    type: GameConstants.VitaminType;

    constructor(type: GameConstants.VitaminType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.money, displayName?: string) {
        super(GameConstants.VitaminType[type], basePrice, currency, undefined, displayName);
        this.type = type;
    }

    use() {
    }
}

ItemList['RareCandy'] = new Vitamin(GameConstants.VitaminType.RareCandy, Infinity, undefined, 'Rare Candy');
ItemList['Protein']   = new Vitamin(GameConstants.VitaminType.Protein, Infinity);