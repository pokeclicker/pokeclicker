///<reference path="../towns/TownContent.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>

class ContestHall extends TownContent {
    constructor(
        public rank: ContestRank[],
        public type: ContestType[] = [ContestType.Cool, ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough],
        private buttonText?: string
    ) {
        super([new DevelopmentRequirement()]);
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
        return areaStatus.completed;
    }

    public static getRibbonImage(rank: ContestRank, type: ContestType) {
        const RibbonRank = ContestRank[rank];
        const RibbonType = ContestType[type];
        return RibbonType === 'Balanced' ? `assets/images/ribbons/${RibbonRank} Star.svg` : `assets/images/ribbons/${RibbonRank} ${RibbonType}.svg`;
    }
}
