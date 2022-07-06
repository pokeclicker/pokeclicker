/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="Item.ts" />

class PokeballItem extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.money, options?: ShopOptions, displayName?: string) {
        super(GameConstants.Pokeball[type], basePrice, currency, options, displayName, undefined, 'pokeball');
        this.type = type;
    }

    gain(amt: number) {
        App.game.pokeballs.gainPokeballs(this.type, amt);
    }

}

ItemList.Pokeball   = new PokeballItem(GameConstants.Pokeball.Pokeball, 100, undefined, undefined, 'Pokéball');
ItemList.Greatball  = new PokeballItem(GameConstants.Pokeball.Greatball, 500);
ItemList.Ultraball  = new PokeballItem(GameConstants.Pokeball.Ultraball, 2000);
ItemList.Masterball = new PokeballItem(GameConstants.Pokeball.Masterball, 2500, GameConstants.Currency.questPoint);
// Not sold in shops
ItemList.Fastball = new PokeballItem(GameConstants.Pokeball.Fastball, Infinity, GameConstants.Currency.farmPoint);
ItemList.Quickball = new PokeballItem(GameConstants.Pokeball.Quickball, Infinity, GameConstants.Currency.farmPoint);
ItemList.Timerball = new PokeballItem(GameConstants.Pokeball.Timerball, Infinity, GameConstants.Currency.farmPoint);
ItemList.Duskball = new PokeballItem(GameConstants.Pokeball.Duskball, Infinity, GameConstants.Currency.farmPoint);
ItemList.Luxuryball = new PokeballItem(GameConstants.Pokeball.Luxuryball, Infinity, GameConstants.Currency.farmPoint);
ItemList.Diveball = new PokeballItem(GameConstants.Pokeball.Diveball, Infinity, GameConstants.Currency.battlePoint);
ItemList.Lureball = new PokeballItem(GameConstants.Pokeball.Lureball, Infinity, GameConstants.Currency.battlePoint);
ItemList.Nestball = new PokeballItem(GameConstants.Pokeball.Nestball, Infinity, GameConstants.Currency.battlePoint);
ItemList.Repeatball = new PokeballItem(GameConstants.Pokeball.Repeatball, Infinity, GameConstants.Currency.battlePoint);
ItemList.Beastball = new PokeballItem(GameConstants.Pokeball.Beastball, 500, GameConstants.Currency.questPoint);
