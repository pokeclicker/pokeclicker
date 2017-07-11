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

    abstract buy();

    abstract use();

}
