///<reference path="Item.ts"/>
class PokeballItem extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball, currency: GameConstants.Currency) {
        const basePrice = GameConstants.ItemPrice[GameConstants.Pokeball[type]];
        const priceMultiplier = 1;
        super(GameConstants.Pokeball[type], basePrice, priceMultiplier, currency);
        this.type = type;
    }

    gain(amt: number) {
        App.game.pokeballs.gainPokeballs(this.type, amt);
        GameHelper.incrementObservable(App.game.statistics.pokeballsBought[this.type], amt);
    }

    use() {
    }
}

ItemList['Pokeball'] = new PokeballItem(GameConstants.Pokeball.Pokeball, GameConstants.Currency.money);
ItemList['Greatball'] = new PokeballItem(GameConstants.Pokeball.Greatball, GameConstants.Currency.money);
ItemList['Ultraball'] = new PokeballItem(GameConstants.Pokeball.Ultraball, GameConstants.Currency.money);
ItemList['Masterball'] = new PokeballItem(GameConstants.Pokeball.Masterball, GameConstants.Currency.questPoint);
