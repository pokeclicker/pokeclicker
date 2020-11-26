enum GeneratorFuelType {
    'fire_shard' = 0,
    'flame_plate',
    'occa_berry',
    'fire_stone',
    'magmarizer',
}

class GeneratorFuel {

    public itemAmount: KnockoutComputed<number>;

    constructor(public id: GeneratorFuelType,
        public item: PokemonType | UndergroundItem | Berry | Item,
        public fuelAmount: number,
        public research?: Lab.Research) {

        this.itemAmount = ko.pureComputed(() => {
            if (item instanceof Item) {
                return player.itemList[item.name()]();
            } else if (item instanceof UndergroundItem) {
                return player.mineInventory()[player.mineInventoryIndex(item.id)].amount();
            } else if (item instanceof Berry) {
                return App.game.farming.berryList[item.type]();
            } else {
                return App.game.shards.shardWallet[item]();
            }
        });

    }

}
