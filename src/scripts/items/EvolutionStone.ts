///<reference path="Item.ts"/>
class EvolutionStone extends Item {

    type: GameConstants.StoneType;

    constructor(type: GameConstants.StoneType) {
        let basePrice = 0;
        let priceMultiplier = 1;
        super(GameConstants.StoneType[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    public buy() {
        this.priceMultiplier++;
    }

    public use() {
        switch (this.type) {
            case GameConstants.StoneType.Fire: {
                break;
            }
            case GameConstants.StoneType.Water: {
                break;
            }
            case GameConstants.StoneType.Thunder: {
                break;
            }
            case GameConstants.StoneType.Leaf: {
                break;
            }
            case GameConstants.StoneType.Moon: {
                break;
            }
            case GameConstants.StoneType.Sun: {
                break;
            }
        }
    }

}

ItemList['Fire'] = new EvolutionStone(GameConstants.StoneType.Fire);
ItemList['Water'] = new EvolutionStone(GameConstants.StoneType.Water);
ItemList['Thunder'] = new EvolutionStone(GameConstants.StoneType.Thunder);
ItemList['Leaf'] = new EvolutionStone(GameConstants.StoneType.Leaf);
ItemList['Moon'] = new EvolutionStone(GameConstants.StoneType.Moon);
ItemList['Sun'] = new EvolutionStone(GameConstants.StoneType.Sun);

