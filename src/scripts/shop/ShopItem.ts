
class ShopItem extends ShopEntry {

    constructor(
        name: string,
        public item: Item,
        basePrice: number,
        currency: GameConstants.Currency = GameConstants.Currency.money,
        options?: ShopOptions
    ) {
        super(name, basePrice, currency, options);
    }

    get displayName(): string {
        return this.item.displayName;
    }
    get description(): string {
        return this.item.description;
    }
    get image(): string {
        return this.item.image;
    }

}
