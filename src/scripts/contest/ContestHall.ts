class ContestHall extends TownContent {
    public contests: Contest[][];
    constructor(
        public rank: ContestRank[],
        public type: ContestType[] = [ContestType.Cool, ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough],
        private buttonText?: string
    ) {
        super();
        this.contests = rank.map(r => type.map(t => new Contest(r, t)));
    }

    public cssClass(): string {
        return 'btn btn-primary';
    }
    public text(): string {
        return this.buttonText ?? 'Contest Hall';
    }
    public onclick(): void {
        ContestBattle.enemyPokemon(null);
        App.game.gameState = GameConstants.GameState.contest;
    }
    public leave(): void {
        // Put the user back in the town
        App.game.gameState = GameConstants.GameState.town;
    }
    public areaStatus(): areaStatus {
        // if (all ribbons are gotten) {
            return areaStatus.completed;
        // }
    }
}
