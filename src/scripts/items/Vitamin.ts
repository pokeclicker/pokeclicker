class Vitamin extends Item {
    type: GameConstants.VitaminType;

    constructor(type: GameConstants.VitaminType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.money, options?: ShopOptions, displayName?: string, description?: string) {
        super(GameConstants.VitaminType[type], basePrice, currency, options, displayName, description);
        this.type = type;
    }

    gain(n: number) {
        super.gain(n);

        if (this.name === 'Protein') {
            GameHelper.incrementObservable(App.game.statistics.totalVitaminsPurchased, n);
            GameHelper.incrementObservable(App.game.statistics.totalVitaminsObtained, n);
        }
    }

    use(): boolean {
        return true;
    }

    get image() {
        return `assets/images/items/vitamin/${this.displayName}.png`;
    }
}

ItemList.RareCandy = new Vitamin(GameConstants.VitaminType.RareCandy, Infinity, undefined, undefined, 'Rare Candy', 'A rare-to-find candy that currently has no use.');
ItemList.Protein   = new Vitamin(GameConstants.VitaminType.Protein, 1e4, GameConstants.Currency.money, { multiplier: 1.1, multiplierDecrease: false, saveName: `${GameConstants.VitaminType[GameConstants.VitaminType.Protein]}|${GameConstants.Currency[GameConstants.Currency.money]}` }, undefined, 'Increases Pokémon attack bonus.<br/><i>(attack gained per breeding cycle)</i>');
ItemList.Calcium   = new Vitamin(GameConstants.VitaminType.Calcium, 1e4, GameConstants.Currency.money, { multiplier: 1.1, multiplierDecrease: false, saveName: `${GameConstants.VitaminType[GameConstants.VitaminType.Calcium]}|${GameConstants.Currency[GameConstants.Currency.money]}` }, undefined, 'Increases Pokémon attack bonus %.<br/><i>(attack gained per breeding cycle)</i>');
