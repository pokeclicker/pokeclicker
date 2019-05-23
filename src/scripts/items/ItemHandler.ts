class ItemHandler {

    public static stoneSelected: KnockoutObservable<string> = ko.observable("Fire_stone");
    public static pokemonSelected: KnockoutObservable<string> = ko.observable("Vulpix");
    public static amountSelected: KnockoutObservable<number> = ko.observable(1);
    static amount: KnockoutObservable<number> = ko.observable(1);

    public static useItem(name: string){
        if (!player.itemList[name]())
          return Notifier.notify(`You don't have any ${name.replace(/_/g, ' ')}s left...`, GameConstants.NotificationOption.danger);

        player.itemList[name](player.itemList[name]()-1);
        return ItemList[name].use();
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
            return Notifier.notify("No Pokémon selected", GameConstants.NotificationOption.danger);
        }
        let amount = Math.min(this.amountSelected(), player.itemList[this.stoneSelected()]());

        if(!amount){
            return Notifier.notify(`You don't have any ${this.stoneSelected().replace(/_/g, ' ')}s left...`, GameConstants.NotificationOption.danger);
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
