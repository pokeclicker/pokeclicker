class Vitamin extends Item {

    type: GameConstants.VitaminType;

    constructor(type: GameConstants.VitaminType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.money, options?: ShopOptions, displayName?: string) {
        super(GameConstants.VitaminType[type], basePrice, currency, options, displayName);
        this.type = type;
    }

    use() {
    }
}

ItemList['RareCandy'] = new Vitamin(GameConstants.VitaminType.RareCandy, Infinity, undefined, undefined, 'Rare Candy');
ItemList['Protein']   = new Vitamin(GameConstants.VitaminType.Protein, 1e4, GameConstants.Currency.money, { multiplier: 1.1, multiplierDecrease: false, saveName: `${GameConstants.VitaminType[GameConstants.VitaminType.Protein]}|${GameConstants.Currency[GameConstants.Currency.money]}` });