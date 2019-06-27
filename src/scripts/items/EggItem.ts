class EggItem extends Item {

    type: GameConstants.EggItemType;

    constructor(type: GameConstants.EggItemType) {
        let basePrice = GameConstants.ItemPrice.Egg;
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
            let etype = GameConstants.EggType[GameConstants.EggItemType[this.type].replace("_egg", "")];
            success = player.gainEgg(BreedingHelper.createTypedEgg(etype));
        }
        
        if (success) {
            player.loseItem(this.name(), 1);
        }
    }

    imageName(): string {
        let parts = this.name().split("_");
        return parts[0] + "_" + parts[1];   // Get rid of the generation number (e.g. I or II) after "egg"
    }
}


ItemList['Fire_egg_I'] = new EggItem(GameConstants.EggItemType.Fire_egg_I);
ItemList['Water_egg_I'] = new EggItem(GameConstants.EggItemType.Water_egg_I);
ItemList['Grass_egg_I'] = new EggItem(GameConstants.EggItemType.Grass_egg_I);
ItemList['Fire_egg_II'] = new EggItem(GameConstants.EggItemType.Fire_egg_II);
ItemList['Water_egg_II'] = new EggItem(GameConstants.EggItemType.Water_egg_II);
ItemList['Grass_egg_II'] = new EggItem(GameConstants.EggItemType.Grass_egg_II);
ItemList['Fighting_egg'] = new EggItem(GameConstants.EggItemType.Fighting_egg);
ItemList['Electric_egg'] = new EggItem(GameConstants.EggItemType.Electric_egg);
ItemList['Dragon_egg'] = new EggItem(GameConstants.EggItemType.Dragon_egg);
ItemList['Pokemon_egg'] = new EggItem(GameConstants.EggItemType.Pokemon_egg);
ItemList['Mystery_egg'] = new EggItem(GameConstants.EggItemType.Mystery_egg);