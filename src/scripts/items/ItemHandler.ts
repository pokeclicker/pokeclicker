class ItemHandler {

    public static stoneSelected: KnockoutObservable<string> = ko.observable("Fire_stone");
    public static pokemonSelected: KnockoutObservable<string> = ko.observable("");
    public static amountSelected: KnockoutObservable<number> = ko.observable(1);
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

    public static useStones(){
        if(this.pokemonSelected() == ""){
            Notifier.notify("No Pokémon selected", GameConstants.NotificationOption.danger);
            return;
        }

        let amount = Math.min(this.amountSelected(), player.itemList[this.stoneSelected()]);
        for(let i = 0; i< amount; i++){
            console.log("go");
            player.itemList[this.stoneSelected()]--;
            (ItemList[this.stoneSelected()] as EvolutionStone).use(this.pokemonSelected())
        }
    }

}
