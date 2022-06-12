///<reference path="Item.ts"/>
class BattleItem extends Item {

    type: GameConstants.BattleItemType;

    constructor(
        type: GameConstants.BattleItemType,
        description: string,
        basePrice: number,
        currency: GameConstants.Currency = GameConstants.Currency.money,
        displayName?: string,
        public multiplierType?: keyof typeof MultiplierType,
        public multiplyBy?: number
    ) {
        super(GameConstants.BattleItemType[type], basePrice, currency, undefined, displayName, description, 'battleItem');
        this.type = type;
    }

    use(): boolean {
        EffectEngineRunner.addEffect(this.name, ItemHandler.amountToUse);
        return true;
    }

    checkCanUse(): boolean {
        if (App.game.challenges.list.disableBattleItems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Battle Items are disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (!player.itemList[this.name]()) {
            Notifier.notify({
                message: `You don't have any ${ItemList[this.name].displayName}s left...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }
}

ItemList['xAttack']         = new BattleItem(GameConstants.BattleItemType.xAttack, '+50% Bonus to Pokémon attack for 30 seconds', 600, undefined, undefined, 'pokemonAttack', 1.5);
ItemList['xClick']          = new BattleItem(GameConstants.BattleItemType.xClick, '+50% Bonus to click attack for 30 seconds', 400, undefined, undefined, 'clickAttack', 1.5);
ItemList['Lucky_egg']       = new BattleItem(GameConstants.BattleItemType.Lucky_egg, '+50% Bonus to experience gained for 30 seconds', 800, undefined, 'Lucky Egg', 'exp', 1.5);
ItemList['Token_collector'] = new BattleItem(GameConstants.BattleItemType.Token_collector, '+50% Bonus to Dungeon Tokens gained for 30 seconds', 1000, undefined, 'Token Collector', 'dungeonToken', 1.5);
ItemList['Item_magnet']     = new BattleItem(GameConstants.BattleItemType.Item_magnet, 'Increased chance of gaining extra items for 30 seconds', 1500, undefined, 'Item Magnet');
ItemList['Lucky_incense']   = new BattleItem(GameConstants.BattleItemType.Lucky_incense, '+50% Bonus to Pokédollars gained for 30 seconds', 2000, undefined, 'Lucky Incense', 'money', 1.5);
