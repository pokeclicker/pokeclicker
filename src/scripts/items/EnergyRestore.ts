///<reference path="Item.ts"/>
class EnergyRestore extends Item {

    type: GameConstants.EnergyRestoreSize;

    constructor(type: GameConstants.EnergyRestoreSize) {
        const basePrice = GameConstants.ItemPrice[GameConstants.EnergyRestoreSize[type]];
        const priceMultiplier = 1;
        super(GameConstants.EnergyRestoreSize[type], basePrice, priceMultiplier, GameConstants.Currency.money);
        this.type = type;
    }

    use() {
        if (player.itemList[this.name()]() <= 0) {
            return;
        }
        if (Underground.energy === Underground.getMaxEnergy()) {
            Notifier.notify({ message: 'Your mining energy is already full!', type: GameConstants.NotificationOption.danger });
            return;
        }
        Underground.gainEnergyThroughItem(this.type);
        player.loseItem(this.name(), 1);
    }
}

ItemList['SmallRestore'] = new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore);
ItemList['MediumRestore'] = new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore);
ItemList['LargeRestore'] = new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore);