///<reference path="Item.ts"/>
class EvolutionStone extends Item {

    type: GameConstants.StoneType;

    constructor(type: GameConstants.StoneType) {
        let basePrice = 0;
        let priceMultiplier = 1;
        super(GameConstants.StoneType[type], basePrice, priceMultiplier);
        this.type = type;
    }

    public onBuy() {
        this.priceMultiplier++;
    }

    public onUse() {
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


