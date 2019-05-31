///<reference path="Item.ts"/>
class BattleItem extends Item {

    type: GameConstants.BattleItemType;

    constructor(type: GameConstants.BattleItemType) {
        let basePrice = GameConstants.ItemPrice[GameConstants.BattleItemType[type]];
        let priceMultiplier = 1;
        super(GameConstants.BattleItemType[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    buy(amt: number) {
    }

    use() {
    }
}

ItemList['xAttack'] = new BattleItem(GameConstants.BattleItemType.xAttack);
ItemList['xClick'] = new BattleItem(GameConstants.BattleItemType.xClick);
ItemList['xExp'] = new BattleItem(GameConstants.BattleItemType.xExp);
ItemList['Token_collector'] = new BattleItem(GameConstants.BattleItemType.Token_collector);
ItemList['Item_magnet'] = new BattleItem(GameConstants.BattleItemType.Item_magnet);
ItemList['Lucky_incense'] = new BattleItem(GameConstants.BattleItemType.Lucky_incense);