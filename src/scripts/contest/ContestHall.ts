///<reference path="../towns/TownContent.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>
///<reference path="../../declarations/contest/ContestHelper.d.ts"/>
///<reference path="../../declarations/contest/ContestRunner.d.ts"/>
///<reference path="../../declarations/contest/ContestBattle.d.ts"/>

class ContestHall extends TownContent {
    constructor(
        public rank: ContestRank[],
        public type: ContestType[] = [ContestType.Cool, ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough],
        public requirements: (Requirement | OneFromManyRequirement)[] = ContestHelper.getContestHallRequirements(rank[0]),
        private buttonText?: string
    ) {
        super(requirements);
    }

    public cssClass(): string {
        return 'btn btn-primary';
    }
    public text(): string {
        return this.buttonText ?? `${ContestRank[this.rank[0]]} Rank Contests`;
    }
    public onclick(): void {
        ContestRunner.contestRankObservable(this.rank);
        ContestRunner.contestTypeObservable(this.type);
        ContestRunner.rank(this.rank[0]);
        ContestRunner.type(this.type[0]);
        ContestBattle.testTimer(10 * ContestHelper.contestRankTimer(ContestRunner.rank()));
        App.game.gameState = GameConstants.GameState.contest;
    }
    public static leave(): void {
        // Stop any contest that's running
        ContestRunner.endContest();
        // Put the user back in the town
        App.game.gameState = GameConstants.GameState.town;
    }
    public areaStatus(): areaStatus[] {
        const states = [];
        if (!this.rank.every(r => this.type.every(t => App.game.statistics.contestsWon[r][t]()))) {
            states.push(areaStatus.incomplete);
        }
        return states;
    }
}
