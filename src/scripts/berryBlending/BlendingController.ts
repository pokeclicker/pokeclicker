class BlendingController {

    public static blendingModalTabSelected: KnockoutObservable<string> = ko.observable('blendingView');

    public static selectedBerry: KnockoutObservable<BerryType> = ko.observable(BerryType.Cheri);
    public static selectedPokeBlock: KnockoutObservable<Item> = ko.observable(ItemList.Pokeblock_Red);

    public static getPokeblockList() {
        return Object.values(ItemList).filter((i) => i instanceof PokeBlock);
    }

    public static amountInput = () => $('#berryBlenderModal').find('input[name="recipeAmount"]');

    public static resetAmount() {
        this.amountInput().val(1).change();
    }

    public static increaseAmount(n: number) {
        const newVal = (parseInt(this.amountInput().val().toString(), 10) || 0) + n;
        this.amountInput().val(newVal > 1 ? newVal : 1).change();
    }

    public static multiplyAmount(n: number) {
        const newVal = (parseInt(this.amountInput().val().toString(), 10) || 0) * n;
        this.amountInput().val(newVal > 1 ? newVal : 1).change();
    }
}
