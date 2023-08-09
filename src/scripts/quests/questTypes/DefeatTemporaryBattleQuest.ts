class DefeatTemporaryBattleQuest extends Quest implements QuestInterface {
    customReward?: () => void;

    constructor(public temporaryBattle: string, public customDescription: string, customReward?: (() => void)) {
        super(1, 0);
        this.focus = App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(this.temporaryBattle)];
        this.customDescription = customDescription;
        this.customReward = typeof customReward == 'function' ? customReward : undefined;
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
