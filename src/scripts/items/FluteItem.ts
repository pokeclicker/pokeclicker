/// <reference path="../../declarations/items/Item.d.ts"/>
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
                message: `You don't have the ${this.displayName}...`,
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

ItemList.Yellow_Flute       = new FluteItem(GameConstants.FluteItemType.Yellow_Flute, 'Pokémon Attack', ['Grass', 'Flying', 'Electric'], 'pokemonAttack', 1.02);
ItemList.Time_Flute        = new FluteItem(GameConstants.FluteItemType.Time_Flute, 'Gym and Dungeon Timers', ['Ground', 'Poison', 'Steel'], undefined, 1.02);
ItemList.Black_Flute        = new FluteItem(GameConstants.FluteItemType.Black_Flute, 'Click Attack', ['Dark', 'Psychic', 'Fighting'], 'clickAttack', 1.02);
ItemList.Red_Flute         = new FluteItem(GameConstants.FluteItemType.Red_Flute, 'Egg Steps', ['Fire', 'Rock', 'Dragon'], 'eggStep', 1.02);
ItemList.White_Flute         = new FluteItem(GameConstants.FluteItemType.White_Flute, 'Shiny Chance', ['Normal', 'Fairy', 'Ice'], 'shiny', 1.02);
ItemList.Blue_Flute        = new FluteItem(GameConstants.FluteItemType.Blue_Flute, 'EV Yield', ['Water', 'Bug', 'Ghost'], 'ev', 1.02);
