///<reference path="Item.ts"/>
class PokeballItem extends Item {
    type: GameConstants.Pokeball;

    constructor(type: GameConstants.Pokeball, currency: GameConstants.Currency) {
        let basePrice = GameConstants.ItemPrice[GameConstants.Pokeball[type]];
        let priceMultiplier = 1;
        super(GameConstants.Pokeball[type], basePrice, priceMultiplier, currency);
        this.type = type;
    }

    totalPrice(amount: number): number {
        if (this.type == GameConstants.Pokeball.Pokeball) {
            return this.basePrice * amount;
        } else {
            return super.totalPrice(amount);
        }
    }

    maxAmount(cost: number): number {
        if (this.type == GameConstants.Pokeball.Pokeball) {
            return Math.floor(cost / this.basePrice);
        } else {
            return super.maxAmount(cost);
        }
    }

    gain(amt: number) {
        App.game.pokeballs.gainPokeballs(this.type, amt);
        GameHelper.incrementObservable(player.statistics.pokeballsBought[this.type], amt);
    }

    use() {
    }
}

ItemList["Pokeball"] = new PokeballItem(GameConstants.Pokeball.Pokeball, GameConstants.Currency.money);
ItemList["Greatball"] = new PokeballItem(GameConstants.Pokeball.Greatball, GameConstants.Currency.money);
ItemList["Ultraball"] = new PokeballItem(GameConstants.Pokeball.Ultraball, GameConstants.Currency.money);
ItemList["Masterball"] = new PokeballItem(GameConstants.Pokeball.Masterball, GameConstants.Currency.questPoint);
