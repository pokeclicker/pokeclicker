///<reference path="Item.ts"/>
class EvolutionStone extends Item {

    type: GameConstants.StoneType;

    constructor(type: GameConstants.StoneType) {
        let basePrice = 2500;
        let priceMultiplier = 1;
        super(GameConstants.StoneType[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    public buy(n: number) {
        player.gainItem(GameConstants.StoneType[this.type], n)
    }

    public use() {
        switch (this.type) {
            case GameConstants.StoneType.Fire_stone: {
                break;
            }
            case GameConstants.StoneType.Water_stone: {
                break;
            }
            case GameConstants.StoneType.Thunder_stone: {
                break;
            }
            case GameConstants.StoneType.Leaf_stone: {
                break;
            }
            case GameConstants.StoneType.Moon_stone: {
                break;
            }
            case GameConstants.StoneType.Sun_stone: {
                break;
            }
        }
    }

}

ItemList['Fire_stone'] = new EvolutionStone(GameConstants.StoneType.Fire_stone);
ItemList['Water_stone'] = new EvolutionStone(GameConstants.StoneType.Water_stone);
ItemList['Thunder_stone'] = new EvolutionStone(GameConstants.StoneType.Thunder_stone);
ItemList['Leaf_stone'] = new EvolutionStone(GameConstants.StoneType.Leaf_stone);
ItemList['Moon_stone'] = new EvolutionStone(GameConstants.StoneType.Moon_stone);
ItemList['Sun_stone'] = new EvolutionStone(GameConstants.StoneType.Sun_stone);

