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

    increasePriceMultiplier(n = 1) {
        console.log("increasing by" + n);
        this.priceMultiplier = this.priceMultiplier * Math.pow(GameConstants.ITEM_PRICE_MULTIPLIER, n);
        console.log(this.priceMultiplier);
    }

    decreasePriceMultiplier(n = 1) {
        this.priceMultiplier = this.priceMultiplier / Math.pow(GameConstants.ITEM_PRICE_MULTIPLIER, n);
    }

}

const ItemList: { [name: string]: Item } = {};
