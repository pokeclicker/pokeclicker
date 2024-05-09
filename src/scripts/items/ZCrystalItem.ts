/// <reference path="../../declarations/items/Item.d.ts"/>

class ZCrystalItem extends Item {

    constructor(
        public type: PokemonType
    ) {
        const description = `Enable ${PokemonType[type]}-type click attack. The activation costs ${GameConstants.ZMOVE_COST} Pokédollars each second.`;
        super(GameConstants.zCrystalItemType[type], Infinity, undefined, { maxAmount : 1 }, undefined, description, 'zCrystal');
    }

    use(): boolean {
        App.game.zMoves.toggle(this.type);
        player.gainItem(this.name, 1);
        return true;
    }

    isSoldOut(): boolean {
        return ItemHandler.hasItem(this.name);
    }

    checkCanUse(): boolean {
        if (App.game.challenges.list.disableBattleItems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Battle Items are Disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (App.game.challenges.list.disableClickAttack.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Click Attack is Disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (!ItemHandler.hasItem(this.name)) {
            Notifier.notify({
                message: `You don't have the ${this.displayName}...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

}

GameConstants.zCrystalItemType.forEach((name, type) => {
    ItemList[name] = new ZCrystalItem(type);
});
