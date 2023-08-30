class DefeatTemporaryBattleQuest extends Quest implements QuestInterface {

    constructor(public temporaryBattle: string, public customDescription: string, reward = 0) {
        super(1, reward);
        this.focus = App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(this.temporaryBattle)];
        this.customDescription = customDescription;
    }
}
