/// <reference path="../../declarations/GameHelper.d.ts" />

class ContestBattlePokemon extends BattlePokemon {
    status: KnockoutObservable<number>;
    dance: KnockoutObservableArray<number>;
    danceHearts: KnockoutObservable<number> = ko.observable(0);
    usableMoves: contestMove[];

    constructor(
        public contestTypes: ContestType[],
        public nickname: string,
        dance: number[],
        moves: ContestType[],
        ...args: ConstructorParameters<typeof BattlePokemon>
    ) {
        super(...args);
        this.status = ko.observable(ContestOpponentStatus.Waiting);
        this.dance = ko.observableArray(dance);
        this.usableMoves = moves.map(m => Object({ moveType: m, pp: ko.observable(1)}) as contestMove);
    }
}
