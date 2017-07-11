///<reference path="Item.ts"/>
class Berry extends Item {

    type: GameConstants.BerryType;

    constructor(type: GameConstants.BerryType) {
        let basePrice = 0;
        let priceMultiplier = 1;
        super(name, basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    buy() {
    }

    use() {
    }

}

ItemList['Cheri'] = new Berry(GameConstants.BerryType.Cheri);
ItemList['Chesto'] = new Berry(GameConstants.BerryType.Chesto);
ItemList['Pecha'] = new Berry(GameConstants.BerryType.Pecha);
ItemList['Rawst'] = new Berry(GameConstants.BerryType.Rawst);
ItemList['Aspear'] = new Berry(GameConstants.BerryType.Aspear);
ItemList['Leppa'] = new Berry(GameConstants.BerryType.Leppa);
ItemList['Oran'] = new Berry(GameConstants.BerryType.Oran);