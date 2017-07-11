class PokeBlock extends Item {

    color: GameConstants.PokeBlockColor;

    constructor(name: string, basePrice: number, priceMultiplier: number, color: GameConstants.PokeBlockColor) {
        super(name, basePrice, priceMultiplier);
        this.color = color;
    }

    onBuy() {
    }

    onUse() {
    }

}

