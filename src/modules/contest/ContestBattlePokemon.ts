import BattlePokemon from '../battles/BattlePokemon';
import ContestOpponentStatus from '../enums/ContestOpponentStatus';
import ContestType from '../enums/ContestType';
import ContestMove from '../interfaces/ContestMove';

export default class ContestBattlePokemon extends BattlePokemon {
    status: KnockoutObservable<number>;
    usableMoves: ContestMove[];

    constructor(
        public contestTypes: ContestType[],
        public nickname: string,
        moves: ContestType[],
        ...args: ConstructorParameters<typeof BattlePokemon>
    ) {
        super(...args);
        this.status = ko.observable(ContestOpponentStatus.Waiting);
        this.usableMoves = moves.map(m => Object({ moveType: m, pp: ko.observable(1) }) as ContestMove);
    }
}
