///<reference path="Item.ts"/>
class FluteItem extends Item {

    type: GameConstants.FluteItemType;

    constructor(
        type: GameConstants.FluteItemType,
        description: string,
        basePrice: number,
        currency: undefined,
        public gemTypes: (keyof typeof PokemonType)[],
        displayName?: string,
        public multiplierType?: keyof typeof MultiplierType,
        public multiplyBy?: number
    ) {
        super(GameConstants.FluteItemType[type], basePrice, currency, undefined, displayName, description, 'fluteItem');
        this.type = type;
    }

    use(): boolean {
        fluteEffectRunner.toggleEffect(this.name);
        return true;
    }

    checkCanUse(): boolean {
        if (App.game.challenges.list.disableGems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Gems are Disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (App.game.challenges.list.disableBattleItems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Battle Items are Disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (!fluteEffectRunner.isActive(GameConstants.FluteItemType[this.name])() && !player.itemList[this.name]()) {
            Notifier.notify({
                message: `You don't have any ${this.displayName}s...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

}

ItemList['Red_Flute']         = new FluteItem(GameConstants.FluteItemType.Red_Flute, 'Bonus to Click Attack', Infinity, undefined, ['Fighting', 'Fire', 'Poison'], undefined, 'clickAttack', 1.02);
ItemList['White_Flute']       = new FluteItem(GameConstants.FluteItemType.White_Flute, 'Bonus to Exp Yield', Infinity, undefined, ['Normal', 'Bug', 'Rock'], undefined, 'exp', 1.02);
ItemList['Black_Flute']       = new FluteItem(GameConstants.FluteItemType.Black_Flute, '+Bonus to Item Drop Rate', Infinity, undefined, ['Normal', 'Flying', 'Poison'], undefined, undefined, 1.02);
ItemList['Yellow_Flute']      = new FluteItem(GameConstants.FluteItemType.Yellow_Flute, 'Bonus to Pokedollar Yield', Infinity, undefined, ['Dark', 'Electric', 'Steel'], undefined, 'money', 1.02);
ItemList['Blue_Flute']        = new FluteItem(GameConstants.FluteItemType.Blue_Flute, 'Bonus to Dungeon Token Yield', Infinity, undefined, ['Dark', 'Ghost', 'Ice'], undefined, 'dungeonToken', 1.02);
ItemList['Poke_Flute']        = new FluteItem(GameConstants.FluteItemType.Poke_Flute, 'Bonus to Pokémon Attack', Infinity, undefined, ['Fighting', 'Ice', 'Fairy'], undefined, 'pokemonAttack', 1.02);
ItemList['Azure_Flute']       = new FluteItem(GameConstants.FluteItemType.Azure_Flute, 'Bonus to Shiny Chance', Infinity, undefined, ['Dragon', 'Ghost', 'Steel'], undefined, 'shiny', 1.02);
ItemList['Eon_Flute']         = new FluteItem(GameConstants.FluteItemType.Eon_Flute, 'Bonus to Roaming Chance', Infinity, undefined, ['Flying', 'Dragon', 'Psychic'], undefined, 'roaming', 1.02);
ItemList['Sun_Flute']         = new FluteItem(GameConstants.FluteItemType.Sun_Flute, 'Bonus to Egg Steps', Infinity, undefined, ['Fire', 'Ground', 'Water'], undefined, 'eggStep', 1.02);
ItemList['Moon_Flute']        = new FluteItem(GameConstants.FluteItemType.Moon_Flute, 'Bonus to Mining Energy Regeneration Yield and Time', Infinity, undefined, ['Rock', 'Ground', 'Electric'], undefined, undefined, 1.02);
ItemList['Time_Flute']        = new FluteItem(GameConstants.FluteItemType.Time_Flute, 'Bonus to Dungeon Timer', Infinity, undefined, ['Grass', 'Psychic', 'Water'], undefined, undefined, 1.02);
ItemList['Grass_Flute']       = new FluteItem(GameConstants.FluteItemType.Grass_Flute, 'Bonus to Berry Replant, Growth, and Mutation Multipliers', Infinity, undefined, ['Grass', 'Bug', 'Fairy'], undefined, undefined, 1.02);
