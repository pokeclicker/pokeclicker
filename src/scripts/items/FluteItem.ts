///<reference path="Item.ts"/>
class FluteItem extends Item {

    type: GameConstants.FluteItemType;

    constructor(
        type: GameConstants.FluteItemType,
        description: string,
        basePrice: number,
        currency: undefined,
        public shardTypes: string[],
        displayName?: string,
        public multiplierType?: keyof typeof MultiplierType,
        public multiplyBy?: number
    ) {
        super(GameConstants.FluteItemType[type], basePrice, currency, undefined, displayName, description, 'fluteItem');
        this.type = type;
    }

    use(): boolean {
        fluteEffectRunner.addEffect(this.name);
        return true;
    }

}

ItemList['Red_Flute']         = new FluteItem(GameConstants.FluteItemType.Red_Flute, '+2% Bonus to Click Attack x Achievement Bonus', Infinity, undefined, ['Fighting', 'Fire', 'Poison'], undefined, 'clickAttack', 1.02);
ItemList['White_Flute']         = new FluteItem(GameConstants.FluteItemType.White_Flute, '+2% Bonus to Exp yield x Achievement Bonus', Infinity, undefined, ['Normal', 'Bug', 'Rock'], undefined, 'exp', 1.02);
ItemList['Black_Flute']         = new FluteItem(GameConstants.FluteItemType.Black_Flute, '+2% Bonus to Item Drop Rate x Achievement Bonus', Infinity, undefined, ['Normal', 'Flying', 'Poison'], undefined, undefined, undefined);
ItemList['Yellow_Flute']         = new FluteItem(GameConstants.FluteItemType.Yellow_Flute, '+2% Bonus to Pokedollar yield x Achievement Bonus', Infinity, undefined, ['Dark', 'Electric', 'Steel'], undefined, 'money', 1.02);
ItemList['Blue_Flute']         = new FluteItem(GameConstants.FluteItemType.Blue_Flute, '+2% Bonus to Dungeon Token yield x Achievement Bonus', Infinity, undefined, ['Dark', 'Ghost', 'Ice'], undefined, 'dungeonToken', 1.02);
ItemList['Poke_Flute']         = new FluteItem(GameConstants.FluteItemType.Poke_Flute, '+2% Bonus to Pokémon Attack x Achievement Bonus', Infinity, undefined, ['Fighting', 'Ice', 'Fairy'], undefined, 'pokemonAttack', 1.02);
