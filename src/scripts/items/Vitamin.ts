class Vitamin extends Item {

    type: GameConstants.VitaminType;

    constructor(name: string, basePrice: number, priceMultiplier: number, type: GameConstants.VitaminType) {
        super(name, basePrice, priceMultiplier);
        this.type = type;
    }

    onBuy() {
    }

    onUse() {
    }
}