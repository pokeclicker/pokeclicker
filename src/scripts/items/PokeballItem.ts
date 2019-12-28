///<reference path="Item.ts"/>
class PokeballItem extends Item {
    type: Pokeball;

    constructor(type: Pokeball, currency: GameConstants.Currency) {
        let basePrice = GameConstants.ItemPrice[Pokeball[type]];
        let priceMultiplier = 1;
        super(Pokeball[type], basePrice, priceMultiplier, currency);
        this.type = type;
    }

    gain(amt: number) {
        player.gainPokeballs(this.type, amt);
        GameHelper.incrementObservable(player.statistics.pokeballsBought[this.type], amt);
    }

    use() {
    }
}

ItemList["Pokeball"] = new PokeballItem(Pokeball.Pokeball, GameConstants.Currency.money);
ItemList["Greatball"] = new PokeballItem(Pokeball.Greatball, GameConstants.Currency.money);
ItemList["Ultraball"] = new PokeballItem(Pokeball.Ultraball, GameConstants.Currency.money);
ItemList["Masterball"] = new PokeballItem(Pokeball.Masterball, GameConstants.Currency.questPoint);
