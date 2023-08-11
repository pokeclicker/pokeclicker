class DefeatTemporaryBattleQuest extends Quest implements QuestInterface {

    constructor(public temporaryBattle: string, public customDescription: string, reward = 0) {
        super(1, reward);
        this.focus = App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(this.temporaryBattle)];
        this.customDescription = customDescription;
    }

    begin(): void {
        this.initial(0);
    }

    claim(): boolean {
        if (this.customReward !== undefined) {
            this.customReward();
        }
        return super.claim();
    }

}
