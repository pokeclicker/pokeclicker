class ItemHandler {

    public static stoneSelected: KnockoutObservable<string> = ko.observable("Fire_stone");
    public static pokemonSelected: KnockoutObservable<string> = ko.observable("");
    public static amountSelected: KnockoutObservable<number> = ko.observable(1);
    static amount: KnockoutObservable<number> = ko.observable(1);

    public static useItem(name:string){
        ItemList[name].use();
        player.itemList[name](player.itemList[name]-1);
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

    public static useStones(){
        if(this.pokemonSelected() == ""){
            Notifier.notify("No Pokémon selected", GameConstants.NotificationOption.danger);
            return;
        }
        let amount = Math.min(this.amountSelected(), player.itemList[this.stoneSelected()]());

        if(amount == 0){
            Notifier.notify("You don't have any stones left...", GameConstants.NotificationOption.danger);
            return;
        }

        for(let i = 0; i< amount; i++){
            player.itemList[this.stoneSelected()](player.itemList[this.stoneSelected()]()-1);
            if((ItemList[this.stoneSelected()] as EvolutionStone).use(this.pokemonSelected())){
                amount = i;
            }
        }
        let multiple = amount == 1 ? "" : "s";
        Notifier.notify("You used " + amount + " " + this.stoneSelected() + multiple, GameConstants.NotificationOption.success);
    }

}
