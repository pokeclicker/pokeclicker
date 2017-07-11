class Berry extends Item {

    type: GameConstants.BerryType;

    constructor(name: string, basePrice: number, priceMultiplier: number, type: GameConstants.BerryType) {
        super(name, basePrice, priceMultiplier);
        this.type = type;
    }

    onBuy() {
    }

    onUse() {
    }

}

