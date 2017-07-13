///<reference path="Item.ts"/>
class EnergyRestore extends Item {

    type: GameConstants.EnergyRestoreSize;

    constructor(type: GameConstants.EnergyRestoreSize) {
        let basePrice = 100;
        let priceMultiplier = 1;
        super(GameConstants.EnergyRestoreSize[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    buy() {
    }

    use() {
    }
}

ItemList['SmallRestore'] = new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore);
ItemList['MediumRestore'] = new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore);
ItemList['LargeRestore'] = new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore);