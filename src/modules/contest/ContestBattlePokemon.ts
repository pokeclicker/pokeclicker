import BattlePokemon from '../battles/BattlePokemon';
import ContestOpponentStatus from '../enums/ContestOpponentStatus';
import ContestType from '../enums/ContestType';
import ContestMove from '../interfaces/ContestMove';

export default class ContestBattlePokemon extends BattlePokemon {
    rapport: KnockoutObservable<number>;
    maxRapport: KnockoutObservable<number>;
    rapportPercentage: KnockoutObservable<number>;
    status: KnockoutObservable<number>;
    dance: KnockoutObservableArray<number>;
    danceHearts: KnockoutObservable<number> = ko.observable(0);
    usableMoves: ContestMove[];

    constructor(
        public contestTypes: ContestType[],
        public nickname: string,
        dance: number[],
        moves: ContestType[],
        ...args: ConstructorParameters<typeof BattlePokemon>
    ) {
        super(...args);
        this.rapport = ko.observable(0);
        this.maxRapport = ko.observable(5); // hardcoded at 5 for health bar UI
        this.rapportPercentage = ko.observable(0);
        this.status = ko.observable(ContestOpponentStatus.Waiting);
        this.dance = ko.observableArray(dance);
        this.usableMoves = moves.map(m => Object({ moveType: m, pp: ko.observable(1) }) as ContestMove);
    }

    public isRallied(): boolean {
        return this.rapport() >= this.maxRapport();
    }

    /**
     * Gain assist points
     * @param rally
     */
    public rally(rally: number): void {
        this.rapport(Math.max(0, Math.min(this.rapport() + rally, this.maxRapport())));
        this.rapportPercentage(Math.floor(this.rapport() / this.maxRapport() * 100));
    }
}
