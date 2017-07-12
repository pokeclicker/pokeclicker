abstract class Item {
    name: KnockoutObservable<string>;
    basePrice: number;
    priceMultiplier: number;
    type: any;
    currency: GameConstants.Currency;
    price: KnockoutObservable<number>;

    constructor(name: string, basePrice: number, priceMultiplier: number, currency: GameConstants.Currency) {
        this.name = ko.observable(name);
        this.basePrice = basePrice;
        this.priceMultiplier = priceMultiplier;
        this.currency = currency;
        this.price = ko.observable(this.basePrice * this.priceMultiplier);
    }

    abstract buy(n: number);

    abstract use();

    increasePriceMultiplier(n: number = 1) {
        this.priceMultiplier *= GameConstants.ITEM_PRICE_MULTIPLIER;
    }

    decreasePriceMultiplier() {
        this.priceMultiplier /= GameConstants.ITEM_PRICE_MULTIPLIER;
    }

}

const ItemList: { [name: string]: Item } = {};
