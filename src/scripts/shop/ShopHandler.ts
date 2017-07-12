///<reference path="Shop.ts"/>
class ShopHandler {
    static shopObservable: KnockoutObservable<Shop> = ko.observable(new Shop([]));
    static selected: KnockoutObservable<number> = ko.observable(0);
    static amount: KnockoutObservable<number> = ko.observable(1);

    public static showShop(shop: Shop) {
        Game.gameState(GameConstants.GameState.idle);
        this.shopObservable(shop);

        //sets all prices correctly
        for (let i = 0; i < shop.items().length; i++) {
            let item: Item = shop.items()[i];
            item.price(Math.round(item.basePrice * player.itemMultipliers[item.name()]));
        }

        Game.gameState(GameConstants.GameState.shop);
    }

    public static setSelected(i: number) {
        this.selected(i);
    }

    public static buyItem() {
        if (this.amount() < 1) {
            return;
        }
        let item: Item = this.shopObservable().items()[ShopHandler.selected()];

        if (player.hasMoney(item.totalPrice())) {
            player.payMoney(item.totalPrice());
            item.buy(this.amount());
            item.increasePriceMultiplier(this.amount());
        } else {
            //TODO make alert that shows you don't have enough money
        }

    }

    public static resetAmount() {
        let input = $("input[name='amountOfItems']");
        input.val(1).change();
    }

    public static increaseAmount(n: number) {
        let input = $("input[name='amountOfItems']");
        let newVal = (parseInt(input.val().toString()) || 0) + n;
        input.val(newVal).change();
    }

    public static calculateCss(i: number): string {
        if (this.selected() == i) {
            return "shopItem clickable btn shopItemSelected"
        } else {
            return "shopItem clickable btn"
        }
    }

    public static calculateButtonCss(): string {
        let item: Item = this.shopObservable().items()[ShopHandler.selected()];

        if (!player.hasMoney(item.totalPrice()) || this.amount() < 1) {
            return "btn btn-danger"
        } else {
            return "btn btn-success"
        }
    }
}
