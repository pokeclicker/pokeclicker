///<reference path="../towns/TownContent.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>

class ContestHall extends TownContent {
    constructor(
        public rank: ContestRank[],
        public type: ContestType[] = [ContestType.Cool, ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough],
        public requirements: (Requirement | OneFromManyRequirement)[] = ContestHelper.getContestHallRequirements(rank[0]),
        private buttonText?: string,
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
        ContestBattle.enemyPokemon(null);
        ContestBattle.trainer(null);
        ContestRunner.contestRankObservable(this.rank);
        ContestRunner.contestTypeObservable(this.type);
        App.game.gameState = GameConstants.GameState.contest;
    }
    public static leave(): void {
        // Stop any contest that's running
        ContestRunner.running(false);
        // Put the user back in the town
        App.game.gameState = GameConstants.GameState.town;
    }
    public areaStatus(): areaStatus {
        if (this.rank.every(r => this.type.every(t => App.game.statistics.contestRoundsWon[r][t]()))) {
            return areaStatus.completed;
        } else {
            return areaStatus.incomplete;
        }
    }
}
