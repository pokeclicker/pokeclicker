/// <reference path="../../declarations/GameHelper.d.ts" />

class ContestBattlePokemon extends BattlePokemon {
    constructor(
        public contestType1: ContestType = ContestType.None,
        public contestType2: ContestType = ContestType.None,
        public contestType3: ContestType = ContestType.None,
        ...args: ConstructorParameters<typeof BattlePokemon>
    ) {
        super(...args);
    }
}
