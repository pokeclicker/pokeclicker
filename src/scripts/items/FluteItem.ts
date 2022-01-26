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

ItemList['Red_Flute']         = new FluteItem(GameConstants.FluteItemType.Red_Flute, '+50% Bonus to Pokémon attack', Infinity, undefined, ['Normal', 'Fire'], undefined, 'pokemonAttack', 1.5);
ItemList['White_Flute']         = new FluteItem(GameConstants.FluteItemType.White_Flute, '+50% Bonus to Pokémon attack', Infinity, undefined, ['Dark', 'Grass'], undefined, 'pokemonAttack', 1.5);
ItemList['Black_Flute']         = new FluteItem(GameConstants.FluteItemType.Black_Flute, '+50% Bonus to Pokémon attack', Infinity, undefined, ['Steel', 'Fairy'], undefined, 'pokemonAttack', 1.5);
ItemList['Yellow_Flute']         = new FluteItem(GameConstants.FluteItemType.Yellow_Flute, '+50% Bonus to Pokémon attack', Infinity, undefined, ['Fire'], undefined, 'pokemonAttack', 1.5);
ItemList['Blue_Flute']         = new FluteItem(GameConstants.FluteItemType.Blue_Flute, '+50% Bonus to pokemonAttack', Infinity, undefined, ['Dark', 'Grass'], undefined, 'pokemonAttack', 1.5);
ItemList['Poke_Flute']         = new FluteItem(GameConstants.FluteItemType.Poke_Flute, '+50% Bonus to Pokémon attack', Infinity, undefined, ['Fire'], undefined, 'pokemonAttack', 1.5);
