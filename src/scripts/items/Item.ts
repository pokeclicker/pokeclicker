///<reference path="../shop/ShopHandler.ts"/>
abstract class Item {
    name: KnockoutObservable<string>;
    basePrice: number;
    type: any;
    currency: GameConstants.Currency;
    price: KnockoutObservable<number>;

    constructor(name: string, basePrice: number, priceMultiplier: number, currency: GameConstants.Currency) {
        this.name = ko.observable(name);
        this.basePrice = basePrice;
        this.currency = currency;
        this.price = ko.observable(this.basePrice);
    }

    totalPrice(amount: number): number {
        if (this.name() == GameConstants.Pokeball[GameConstants.Pokeball.Pokeball]) {
            return this.basePrice * amount;
        } else {
            let res = (this.price() * (1 - Math.pow(GameConstants.ITEM_PRICE_MULTIPLIER, amount))) / (1 - GameConstants.ITEM_PRICE_MULTIPLIER);
            return Math.floor(res);
        }
    }

    buy(n: number) {
        if (n <= 0) {
            return;
        }
        if (!this.isAvailable()) {
            Notifier.notify(`${this.name()} is sold out!`, GameConstants.NotificationOption.danger)
            return;
        }

        let multiple = n > 1 ? "s" : "";

        if (player.hasCurrency(this.totalPrice(n), this.currency)) {
            player.payCurrency(this.totalPrice(n), this.currency);
            this.gain(n);
            this.increasePriceMultiplier(n);
            Notifier.notify("You bought " + n + " " + this.name() + multiple, GameConstants.NotificationOption.success)
        } else {
            let curr = "currency";
            switch (this.currency) {
                case GameConstants.Currency.money:
                    curr = "money";
                    break;
                case GameConstants.Currency.questPoint:
                    curr = "quest points";
                    break;
                case GameConstants.Currency.dungeontoken:
                    curr = "dungeon tokens";
                    break;
            }
            Notifier.notify(`You don't have enough ${curr} to buy ${n} ${this.name() + multiple}`, GameConstants.NotificationOption.danger)
        }
    }

    gain(n: number) {
        player.gainItem(this.name(), n);
    }

    abstract use();

    isAvailable() : boolean {
        return true;
    }

    increasePriceMultiplier(n = 1) {
        player.itemMultipliers[this.name()] = player.itemMultipliers[this.name()] * Math.pow(GameConstants.ITEM_PRICE_MULTIPLIER, n);
        this.price(Math.round(this.basePrice * player.itemMultipliers[this.name()]));
    }

    decreasePriceMultiplier(n = 1) {
        player.itemMultipliers[this.name()] = Math.max(1, player.itemMultipliers[this.name()] / Math.pow(GameConstants.ITEM_PRICE_DEDUCT, n));
        this.price(Math.round(this.basePrice * player.itemMultipliers[this.name()]));
    }

}

const ItemList: { [name: string]: Item } = {};
