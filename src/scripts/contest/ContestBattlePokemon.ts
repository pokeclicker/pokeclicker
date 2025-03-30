/// <reference path="../../declarations/GameHelper.d.ts" />

class ContestBattlePokemon extends BattlePokemon {
    constructor(
        public contestTypes: ContestType[],
        public nickname: string,
        ...args: ConstructorParameters<typeof BattlePokemon>
    ) {
        super(...args);
    }
}
