///<reference path="Item.ts"/>
class Pokeball extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball, currency: GameConstants.Currency) {
        let basePrice = GameConstants.ItemPrice[GameConstants.Pokeball[type]];
        let priceMultiplier = 1;
        super(GameConstants.Pokeball[type], basePrice, priceMultiplier, currency);
        this.type = type;
    }

    gain(amt: number) {
        player.gainPokeballs(this.type, amt);
        GameHelper.incrementObservable(player.statistics.pokeballsBought[this.type], amt);
    }

    use() {
    }
}

ItemList["Pokeball"] = new Pokeball(GameConstants.Pokeball.Pokeball, GameConstants.Currency.money);
ItemList["Greatball"] = new Pokeball(GameConstants.Pokeball.Greatball, GameConstants.Currency.money);
ItemList["Ultraball"] = new Pokeball(GameConstants.Pokeball.Ultraball, GameConstants.Currency.money);
ItemList["Masterball"] = new Pokeball(GameConstants.Pokeball.Masterball, GameConstants.Currency.questPoint);
