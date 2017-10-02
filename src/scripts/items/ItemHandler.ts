class ItemHandler {

    public static itemSelected: string = "Fire_stone";
    static amount: KnockoutObservable<number> = ko.observable(1);

    public static useItem(name:string){
        ItemList[name].use();
        player.itemList[name]--;
    }

    public static resetAmount() {
        let input = $("input[name='amountOfStones']");
        input.val(1).change();
    }

    public static increaseAmount(n: number) {
        let input = $("input[name='amountOfItems']");
        let newVal = (parseInt(input.val().toString()) || 0) + n;
        input.val(newVal > 1 ? newVal : 1).change();
    }


}
