///<reference path="Item.ts"/>
class FluteItem extends Item {
    name: GameConstants.FluteItemType;

    constructor(
        name: GameConstants.FluteItemType,
        description: string,
        public gemTypes: (keyof typeof PokemonType)[],
        public multiplierType: keyof typeof MultiplierType,
        public multiplyBy: number
    ) {
        super(name, Infinity, undefined, { maxAmount : 1 }, undefined, description, 'fluteItem');
    }

    use(): boolean {
        FluteEffectRunner.toggleEffect(this.name);
        return true;
    }

    getDescription(): string {
        const multiplier = ((this.getMultiplier() - 1) * 100).toFixed(2);
        return `+${multiplier}% bonus to ${this.description}`;
    }

    public getMultiplier() {
        return (this.multiplyBy - 1) * (AchievementHandler.achievementBonus() + 1) + 1;
    }

    isSoldOut(): boolean {
        return player.itemList[this.name]() > 0 || FluteEffectRunner.isActive(GameConstants.FluteItemType[this.name])();
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
        if (!FluteEffectRunner.isActive(GameConstants.FluteItemType[this.name])() && !player.itemList[this.name]()) {
            Notifier.notify({
                message: `You don't have any ${this.displayName}s...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (FluteEffectRunner.getLowestGem(this.name) <= FluteEffectRunner.numActiveFlutes() + 1) {
            Notifier.notify({
                message: 'You don\'t have enough gems to use this Flute.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

}

ItemList['Red_Flute']         = new FluteItem(GameConstants.FluteItemType.Red_Flute, 'Click Attack', ['Fighting', 'Fire', 'Poison'], 'clickAttack', 1.02);
ItemList['White_Flute']       = new FluteItem(GameConstants.FluteItemType.White_Flute, 'Exp Yield', ['Normal', 'Bug', 'Rock'], 'exp', 1.02);
ItemList['Black_Flute']       = new FluteItem(GameConstants.FluteItemType.Black_Flute, 'Item Drop Rate', ['Normal', 'Flying', 'Poison'], undefined, 1.02);
ItemList['Yellow_Flute']      = new FluteItem(GameConstants.FluteItemType.Yellow_Flute, 'Pokédollar Yield', ['Dark', 'Electric', 'Steel'], 'money', 1.02);
ItemList['Blue_Flute']        = new FluteItem(GameConstants.FluteItemType.Blue_Flute, 'Dungeon Token Yield', ['Dark', 'Ghost', 'Ice'], 'dungeonToken', 1.02);
ItemList['Poke_Flute']        = new FluteItem(GameConstants.FluteItemType.Poke_Flute, 'Pokémon Attack', ['Fighting', 'Ice', 'Fairy'], 'pokemonAttack', 1.02);
ItemList['Azure_Flute']       = new FluteItem(GameConstants.FluteItemType.Azure_Flute, 'Shiny Chance', ['Dragon', 'Ghost', 'Steel'], 'shiny', 1.02);
ItemList['Eon_Flute']         = new FluteItem(GameConstants.FluteItemType.Eon_Flute, 'Roaming Chance', ['Flying', 'Dragon', 'Psychic'], 'roaming', 1.02);
ItemList['Sun_Flute']         = new FluteItem(GameConstants.FluteItemType.Sun_Flute, 'Egg Steps', ['Fire', 'Ground', 'Water'], 'eggStep', 1.02);
ItemList['Moon_Flute']        = new FluteItem(GameConstants.FluteItemType.Moon_Flute, 'Mining Energy Regeneration Yield and Time', ['Rock', 'Ground', 'Electric'], undefined, 1.02);
ItemList['Time_Flute']        = new FluteItem(GameConstants.FluteItemType.Time_Flute, 'Dungeon Timer', ['Grass', 'Psychic', 'Water'], undefined, 1.02);
ItemList['Grass_Flute']       = new FluteItem(GameConstants.FluteItemType.Grass_Flute, 'Berry Replant and Growth Multipliers', ['Grass', 'Bug', 'Fairy'], undefined, 1.02);
