///<reference path="Item.ts"/>
class Berry extends Item {

    type: GameConstants.BerryType;

    constructor(type: GameConstants.BerryType) {
        let basePrice = 0;
        let priceMultiplier = 1;
        super(name, basePrice, priceMultiplier);
        this.type = type;
    }

    onBuy() {
    }

    onUse() {
    }

}

