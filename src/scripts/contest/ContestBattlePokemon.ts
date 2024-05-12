/// <reference path="../../declarations/GameHelper.d.ts" />

class ContestBattlePokemon extends BattlePokemon {
    constructor(
            public name: PokemonNameType,
            public id: number,
            public type1: PokemonType = PokemonType.None,
            public type2: PokemonType = PokemonType.None,
            maxHealth: number,
            public level: number,
            public catchRate: number,
            public exp: number,
            public reward: Amount = new Amount(0, GameConstants.Currency.money),
            public shiny: boolean,
            public gemReward = 1,
            public gender: number,
            public shadow: GameConstants.ShadowStatus,
            public encounterType: EncounterType,
            public heldItem?: BagItem,
            public ep: number = GameConstants.BASE_EP_YIELD,
            public contestType1: ContestType = ContestType.None,
            public contestType2: ContestType = ContestType.None,
            public contestType3: ContestType = ContestType.None
    ) {
        super(name, id, type1, type2, maxHealth, level, catchRate, exp, reward, shiny, gemReward, gender, shadow, encounterType, heldItem, ep);
    }
}
