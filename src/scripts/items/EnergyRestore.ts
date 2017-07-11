///<reference path="Item.ts"/>
class EnergyRestore extends Item {

    type: GameConstants.EnergyRestoreSize;

    constructor(type: GameConstants.EnergyRestoreSize) {
        let basePrice = 100;
        let priceMultiplier = 1;
        super(GameConstants.EnergyRestoreSize[type], basePrice, priceMultiplier);
        this.type = type;
    }

    onBuy() {
    }

    onUse() {
    }
}