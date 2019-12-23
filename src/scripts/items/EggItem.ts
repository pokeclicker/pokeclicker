class EggItem extends Item {

    type: GameConstants.EggItemType;

    constructor(type: GameConstants.EggItemType, price: number = GameConstants.ItemPrice.Egg) {
        let basePrice = price;
        let priceMultiplier = 1;
        super(GameConstants.EggItemType[type], basePrice, priceMultiplier, GameConstants.Currency.questPoint);
        this.type = type;
    }

    use() {
        if (this.type === GameConstants.EggItemType.Pokemon_egg) {
            return;
        }
        if (player.itemList[this.name()]() <= 0) {
            return;
        }

        let success: boolean;
        if (this.type === GameConstants.EggItemType.Mystery_egg) {
            success = player.gainEgg(BreedingHelper.createRandomEgg());
        } else {
            let etype = GameConstants.EggType[GameConstants.EggItemType[this.type].split("_")[0]];
            success = player.gainEgg(BreedingHelper.createTypedEgg(etype));
        }

        if (success) {
            player.loseItem(this.name(), 1);
        }
    }
}


ItemList['Fire_egg'] = new EggItem(GameConstants.EggItemType.Fire_egg);
ItemList['Water_egg'] = new EggItem(GameConstants.EggItemType.Water_egg);
ItemList['Grass_egg'] = new EggItem(GameConstants.EggItemType.Grass_egg);
ItemList['Fighting_egg'] = new EggItem(GameConstants.EggItemType.Fighting_egg);
ItemList['Electric_egg'] = new EggItem(GameConstants.EggItemType.Electric_egg);
ItemList['Dragon_egg'] = new EggItem(GameConstants.EggItemType.Dragon_egg);
ItemList['Pokemon_egg'] = new EggItem(GameConstants.EggItemType.Pokemon_egg);
ItemList['Mystery_egg'] = new EggItem(GameConstants.EggItemType.Mystery_egg, 750);
