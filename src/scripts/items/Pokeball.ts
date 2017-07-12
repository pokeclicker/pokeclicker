///<reference path="Item.ts"/>
class Pokeball extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball) {
        let basePrice = 100;
        let priceMultiplier = 1;
        super(GameConstants.Pokeball[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    buy() {
        player.gainPokeballs(this.type, 1);
    }

    use() {
    }
}

ItemList["Pokeball"] = new Pokeball(GameConstants.Pokeball.Pokeball);
ItemList["Greatball"] = new Pokeball(GameConstants.Pokeball.Greatball);
ItemList["Ultraball"] = new Pokeball(GameConstants.Pokeball.Ultraball);
ItemList["Masterball"] = new Pokeball(GameConstants.Pokeball.Masterball);