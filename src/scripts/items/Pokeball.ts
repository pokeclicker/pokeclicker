class Pokeball extends Item {
    type: GameConstants.Pokeball;

    constructor(name: string, basePrice: number, priceMultiplier: number, type: GameConstants.Pokeball) {
        super(name, basePrice, priceMultiplier);
        this.type = type;
    }

    onBuy() {
    }

    onUse() {
    }
}
