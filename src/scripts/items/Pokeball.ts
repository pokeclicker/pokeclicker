///<reference path="Item.ts"/>
class Pokeball extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball) {
        let basePrice = 100;
        let priceMultiplier = 1;
        super(GameConstants.Pokeball[type], basePrice, priceMultiplier);
        this.type = type;
    }

    onBuy() {
        player.gainPokeballs(this.type, 1);
    }

    onUse() {
    }
}
