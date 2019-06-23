class PokeBlock extends Item {

    type: GameConstants.PokeBlockColor;

    constructor(color: GameConstants.PokeBlockColor) {
        let basePrice = GameConstants.ItemPrice.PokeBlock;
        let priceMultiplier = 1;
        super(name, basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = color;
    }

    use() {
    }

}

ItemList['Black'] = new PokeBlock(GameConstants.PokeBlockColor.Black);
ItemList['Red'] = new PokeBlock(GameConstants.PokeBlockColor.Red);
ItemList['Gold'] = new PokeBlock(GameConstants.PokeBlockColor.Gold);
ItemList['Purple'] = new PokeBlock(GameConstants.PokeBlockColor.Purple);
ItemList['Gray'] = new PokeBlock(GameConstants.PokeBlockColor.Gray);
ItemList['White'] = new PokeBlock(GameConstants.PokeBlockColor.White);