class ItemHandler {

    public static stoneSelected: KnockoutObservable<string> = ko.observable('Fire_stone');
    public static pokemonSelected: KnockoutObservable<PokemonNameType> = ko.observable('Vulpix');
    public static amountSelected: KnockoutObservable<number> = ko.observable(1);
    static amount: KnockoutObservable<number> = ko.observable(1);
    public static amountToUse = 1;

    public static useItem(name: string, amount = 1): boolean {

        if (!ItemList[name].checkCanUse()) {
            return false;
        }

        // Only allow the player to use the amount they have maximum
        this.amountToUse = Math.min(player.itemList[name](), amount);

        player.itemList[name](player.itemList[name]() - this.amountToUse);

        // run the function
        const result = ItemList[name].use();
        // If the function returned nothing assume it went fine
        return result == undefined ? true : result;
    }

    public static hasItem(name: string): boolean {
        return player.itemList[name] ? !!player.itemList[name]() : false;
    }

    public static resetAmount() {
        const input = $('input[name="amountOfStones"]');
        input.val(1).change();
    }

    public static increaseAmount(n: number) {
        const input = $('input[name="amountOfItems"]');
        const newVal = (parseInt(input.val().toString(), 10) || 0) + n;
        input.val(newVal > 1 ? newVal : 1).change();
    }

    public static useStones() {
        if (!this.pokemonSelected()) {
            return Notifier.notify({
                message: 'No Pokémon selected.',
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
            if ((ItemList[this.stoneSelected()] as EvolutionStone).use(this.pokemonSelected())) {
                // Stop when a shiny is encountered
                break;
            }
        }
        const multiple = amountUsed == 1 ? '' : 's';
        const stoneUsed = ItemList[this.stoneSelected()];
        Notifier.notify({
            // TODO: PMX - Update plural system to handle all cases
            message: `You used ${amountUsed.toLocaleString('en-US')} × <img src="${stoneUsed.image}" height="24px"/> ${stoneUsed.displayName}${multiple} on ${this.pokemonSelected()}.`,
            type: NotificationConstants.NotificationOption.success,
        });
    }

    public static initilizeEvoStones() {
        // Set our unlock regions
        Object.values(ItemList).filter(item => item instanceof EvolutionStone).forEach(evoStone => {
            // If a region has already been manually set
            if ((evoStone as EvolutionStone).unlockedRegion > GameConstants.Region.none) {
                return false;
            }

            // Get a list of evolutions that use this stone, set the unlock region to the lowest region
            (evoStone as EvolutionStone).unlockedRegion = Math.min(...pokemonList.filter(p =>
                // Filter to only include pokemon that make use of this evolution stone
                (p as PokemonListData).nativeRegion > GameConstants.Region.none &&
                (p as PokemonListData).evolutions != undefined &&
                (p as PokemonListData).evolutions.some(e => e instanceof StoneEvolution && e.stone == evoStone.type)
            ).map(p => {
                // Map to the native region for evolutions that use this stone
                return Math.min(...(p as PokemonListData).evolutions.filter(e => e instanceof StoneEvolution && e.stone == evoStone.type)
                    .map(e => Math.max((p as PokemonListData).nativeRegion, PokemonHelper.calcNativeRegion(e.getEvolvedPokemon())))
                    .filter(r => r > GameConstants.Region.none));
            })
            );
        });
    }
}
