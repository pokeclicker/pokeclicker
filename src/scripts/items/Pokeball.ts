///<reference path="Item.ts"/>
class Pokeball extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball) {
        let basePrice = GameConstants.ItemPrice[GameConstants.Pokeball[type]];
        let priceMultiplier = 1;
        super(GameConstants.Pokeball[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    buy(amt: number) {
        player.gainPokeballs(this.type, amt);
        GameHelper.incrementObservable(player.statistics.pokeballsBought[this.type],amt);
    }

    use() {
    }
}

ItemList["Pokeball"] = new Pokeball(GameConstants.Pokeball.Pokeball);
ItemList["Greatball"] = new Pokeball(GameConstants.Pokeball.Greatball);
ItemList["Ultraball"] = new Pokeball(GameConstants.Pokeball.Ultraball);
ItemList["Masterball"] = new Pokeball(GameConstants.Pokeball.Masterball);