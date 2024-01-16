/// <reference path="../../declarations/items/Item.d.ts"/>

class ZCrystalItem extends Item {

    constructor(
        public type: PokemonType
    ) {
        const description = `Allows ${PokemonType[type]}-type Pokémon to use Z-Moves for the next battle. They then need to rest a bit.`;
        super(GameConstants.zCrystalItemType[type], Infinity, undefined, { maxAmount : 1 }, undefined, description, 'zCrystal');
    }

    use(): boolean {
        App.game.zMoves.activate(this.type);
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
        if (App.game.zMoves.isActive()) {
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
