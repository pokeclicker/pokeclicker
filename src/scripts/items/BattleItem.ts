///<reference path="Item.ts"/>
class BattleItem extends Item {

    type: GameConstants.BattleItemType;

    constructor(type: GameConstants.BattleItemType) {
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

ItemList['xAttack'] = new BattleItem(GameConstants.BattleItemType.xAttack);
ItemList['xClick'] = new BattleItem(GameConstants.BattleItemType.xClick);
ItemList['xExp'] = new BattleItem(GameConstants.BattleItemType.xExp);
ItemList['XToken'] = new BattleItem(GameConstants.BattleItemType.XToken);
ItemList['xItem'] = new BattleItem(GameConstants.BattleItemType.xItem);