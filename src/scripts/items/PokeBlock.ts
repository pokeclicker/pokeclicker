class PokeBlock extends Item {

    type: GameConstants.PokeBlockColor;

    constructor(color: GameConstants.PokeBlockColor, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.money) {
        super(name, basePrice, currency);
        this.type = color;
    }

    use() {
    }

}

ItemList['Black']  = new PokeBlock(GameConstants.PokeBlockColor.Black, Infinity);
ItemList['Red']    = new PokeBlock(GameConstants.PokeBlockColor.Red, Infinity);
ItemList['Gold']   = new PokeBlock(GameConstants.PokeBlockColor.Gold, Infinity);
ItemList['Purple'] = new PokeBlock(GameConstants.PokeBlockColor.Purple, Infinity);
ItemList['Gray']   = new PokeBlock(GameConstants.PokeBlockColor.Gray, Infinity);
ItemList['White']  = new PokeBlock(GameConstants.PokeBlockColor.White, Infinity);