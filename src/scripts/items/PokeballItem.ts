///<reference path="Item.ts"/>
class PokeballItem extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.money) {
        super(GameConstants.Pokeball[type], basePrice, currency);
        this.type = type;
    }

    gain(amt: number) {
        App.game.pokeballs.gainPokeballs(this.type, amt);
        GameHelper.incrementObservable(App.game.statistics.pokeballsBought[this.type], amt);
    }

    use() {
    }
}

ItemList['Pokeball']   = new PokeballItem(GameConstants.Pokeball.Pokeball, 100);
ItemList['Greatball']  = new PokeballItem(GameConstants.Pokeball.Greatball, 500);
ItemList['Ultraball']  = new PokeballItem(GameConstants.Pokeball.Ultraball, 2000);
ItemList['Masterball'] = new PokeballItem(GameConstants.Pokeball.Masterball, 2500, GameConstants.Currency.questPoint);
