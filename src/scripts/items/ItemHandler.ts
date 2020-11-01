class ItemHandler {

    public static stoneSelected: KnockoutObservable<string> = ko.observable('Fire_stone');
    public static pokemonSelected: KnockoutObservable<PokemonNameType> = ko.observable('Vulpix');
    public static amountSelected: KnockoutObservable<number> = ko.observable(1);
    static amount: KnockoutObservable<number> = ko.observable(1);
    public static amountToUse = 1;
    public static multipliers = ['×1', '×10', '×100', '×1000', 'All'];
    public static multIndex = ko.observable(0);

    public static useItem(name: string) {
        if (!player.itemList[name]()) {
            return Notifier.notify({
                message: `You don't have any ${ItemList[name].displayName}s left...`,
                type: NotificationConstants.NotificationOption.danger,
            });
        }
        // Either the digits specified, or All (Infinity)
        const amountSelected = Number(this.multipliers[this.multIndex()].replace(/\D/g, '')) || Infinity;
        // Only allow the player to use the amount they have maximum
        this.amountToUse = Math.min(player.itemList[name](), amountSelected);

        player.itemList[name](player.itemList[name]() - this.amountToUse);
        return ItemList[name].use();
    }

    public static resetAmount() {
        const input = $("input[name='amountOfStones']");
        input.val(1).change();
    }

    public static increaseAmount(n: number) {
        const input = $("input[name='amountOfItems']");
        const newVal = (parseInt(input.val().toString(), 10) || 0) + n;
        input.val(newVal > 1 ? newVal : 1).change();
    }

    public static useStones() {
        if (this.pokemonSelected()) {
            return Notifier.notify({
                message: 'No Pokémon selected',
                type: NotificationConstants.NotificationOption.danger,
            });
        }
        const amountTotal = Math.min(this.amountSelected(), player.itemList[this.stoneSelected()]());

        if (!amountTotal) {
            return Notifier.notify({
                // TODO: PMX - Update plural system to handle all cases
                message: `You don't have any ${ItemList[this.stoneSelected()].displayName}s left...`,
                type: NotificationConstants.NotificationOption.danger,
            });
        }

        let amountUsed = 0;
        for (let i = 0; i < amountTotal; i++) {
            player.itemList[this.stoneSelected()](player.itemList[this.stoneSelected()]() - 1);
            amountUsed++;
            if ((ItemList[this.stoneSelected()] as EvolutionStone).use(this.pokemonSelected() as PokemonNameType)) {
                // Stop when a shiny is encountered
                break;
            }
        }
        const multiple = amountUsed == 1 ? '' : 's';
        Notifier.notify({
            // TODO: PMX - Update plural system to handle all cases
            message: `You used ${amountUsed} ${ItemList[this.stoneSelected()].displayName}${multiple}`,
            type: NotificationConstants.NotificationOption.success,
        });
    }

    public static incrementMultiplier() {
        this.multIndex((this.multIndex() + 1) % this.multipliers.length);
    }

    public static decrementMultiplier() {
        this.multIndex((((this.multIndex() - 1) % this.multipliers.length) + this.multipliers.length) % this.multipliers.length);
    }

}
