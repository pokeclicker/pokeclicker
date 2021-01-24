/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="Item.ts" />

class PokeballItem extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball, displayName?: string) {
        super(GameConstants.Pokeball[type], undefined, undefined, undefined, displayName, undefined, 'pokeball');
        this.type = type;
    }

    gain(amt: number) {
        App.game.pokeballs.gainPokeballs(this.type, amt);
        GameHelper.incrementObservable(App.game.statistics.pokeballsBought[this.type], amt);
    }

}

ItemList['Pokeball']   = new PokeballItem(GameConstants.Pokeball.Pokeball, 'Pokéball');
ItemList['Greatball']  = new PokeballItem(GameConstants.Pokeball.Greatball);
ItemList['Ultraball']  = new PokeballItem(GameConstants.Pokeball.Ultraball);
ItemList['Masterball'] = new PokeballItem(GameConstants.Pokeball.Masterball);
// Not sold in shops
ItemList['Fastball'] = new PokeballItem(GameConstants.Pokeball.Fastball);
ItemList['Quickball'] = new PokeballItem(GameConstants.Pokeball.Quickball);
ItemList['Timerball'] = new PokeballItem(GameConstants.Pokeball.Timerball);
ItemList['Duskball'] = new PokeballItem(GameConstants.Pokeball.Duskball);
ItemList['Luxuryball'] = new PokeballItem(GameConstants.Pokeball.Luxuryball);

ShopEntriesList['Pokeball'] = new ShopItem('Pokeball', ItemList['Pokeball'], 100, Currency.money, { multiplier: 1 });
ShopEntriesList['Greatball'] = new ShopItem('Greatball', ItemList['Greatball'], 500);
ShopEntriesList['Ultraball'] = new ShopItem('Ultraball', ItemList['Ultraball'], 2000);
ShopEntriesList['Masterball'] = new ShopItem('Masterball', ItemList['Masterball'], 10000000, GameConstants.Currency.money, { multiplier: 1.35, multiplierDecrease: false });
ShopEntriesList['Masterball DT'] = new ShopItem('Masterball DT', ItemList['Masterball'], 75000, GameConstants.Currency.dungeonToken, { multiplier: 1.35, multiplierDecrease: false });
ShopEntriesList['Masterball QP'] = new ShopItem('Masterball QP', ItemList['Masterball'], 3000, GameConstants.Currency.questPoint, { multiplier: 1.35, multiplierDecrease: false });
ShopEntriesList['Masterball FP'] = new ShopItem('Masterball FP', ItemList['Masterball'], 3000, GameConstants.Currency.farmPoint, { multiplier: 1.35, multiplierDecrease: false });
ShopEntriesList['Masterball D'] = new ShopItem('Masterball D', ItemList['Masterball'], 50, GameConstants.Currency.diamond, { multiplier: 1.35, multiplierDecrease: false });

ShopEntriesList['Ultraball BP'] = new ShopItem('Ultraball BP', ItemList['Ultraball'], 1, Currency.battlePoint);
ShopEntriesList['Masterball BP'] = new ShopItem('Masterball BP', ItemList['Masterball'], 500, Currency.battlePoint, { multiplier: 1.35, multiplierDecrease: false });
