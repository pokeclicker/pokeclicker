class ShopHandler {
    static shopObservable: KnockoutObservable<Shop> = ko.observable(new Shop([]));
    static selected: KnockoutObservable<number> = ko.observable(0);
    static amount: KnockoutObservable<number> = ko.observable(1);
    static totalPrice: KnockoutComputed<number> = ko.computed(function () {
        let item: Item = ShopHandler.shopObservable().items()[ShopHandler.selected()];
        if (item == null) {
            return 0;
        }
        let res = (item.price() * (1 - Math.pow(GameConstants.ITEM_PRICE_MULTIPLIER, ShopHandler.amount()))) / (1 - GameConstants.ITEM_PRICE_MULTIPLIER);
        return Math.floor(res);
    });

    public static showShop(shop: Shop) {
        Game.gameState(GameConstants.GameState.idle);

        this.shopObservable(shop);

        Game.gameState(GameConstants.GameState.shop);

    }

    public static setSelected(i: number) {
        this.selected(i);
    }

    public static buyItem() {

        let item: Item = this.shopObservable().items()[ShopHandler.selected()];

        if (player.hasMoney(this.totalPrice())) {
            player.payMoney(this.totalPrice());
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
        let newVal = parseInt(input.val().toString()) + n;
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
        if (player.hasMoney(ShopHandler.totalPrice())) {
            return "btn btn-success"
        } else {
            return "btn btn-danger"
        }
    }
}
