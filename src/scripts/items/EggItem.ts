class EggItem extends Item {

    type: GameConstants.EggItemType;

    constructor(type: GameConstants.EggItemType) {
        let basePrice = 1000;
        let priceMultiplier = 1;
        super(GameConstants.EggItemType[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    buy() {
    }

    use() {
    }
}


ItemList['Fire_egg'] = new EggItem(GameConstants.EggItemType.Fire_egg);
ItemList['Water_egg'] = new EggItem(GameConstants.EggItemType.Water_egg);
ItemList['Grass_egg'] = new EggItem(GameConstants.EggItemType.Grass_egg);
ItemList['Fight_egg'] = new EggItem(GameConstants.EggItemType.Fight_egg);
ItemList['Electric_egg'] = new EggItem(GameConstants.EggItemType.Electric_egg);
ItemList['Dragon_egg'] = new EggItem(GameConstants.EggItemType.Dragon_egg);
ItemList['Pokemon_egg'] = new EggItem(GameConstants.EggItemType.Pokemon_egg);
ItemList['Mystery_egg'] = new EggItem(GameConstants.EggItemType.Mystery_egg);