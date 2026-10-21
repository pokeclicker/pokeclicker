/// <reference path="./QuestLine.ts" />

class SantasHelperQuestLine extends QuestLine {
    public static getPresentTarget(completedDays: number): number {
        return Math.round(10 * 10 ** (Math.min(completedDays, 4) / 4));
    }

    constructor() {
        super(
            'Santa\'s Helper',
            'Defeat the Santa Jynx Band at Bill\'s House, then recover their missing Christmas Presents.',
            new SpecialEventRequirement('Merry Christmas!')
        );

        const defeatJynxBand = new DefeatTemporaryBattleQuest(
            'Santa Jynx 1',
            'Defeat the Santa Jynx Band at Bill\'s House.'
        );
        this.addQuest(defeatJynxBand);

        const completedDays = App.game.statistics.christmasQuestsCompleted();
        const target = SantasHelperQuestLine.getPresentTarget(completedDays);
        const recoverPresents = new CustomQuest(
            target,
            0,
            `Obtain ${target.toLocaleString('en-US')} Christmas Presents. Santa Jynx can be found on routes in Kanto.`,
            () => player.itemList.Christmas_present()
        ).withCustomReward(() => {
            GameHelper.incrementObservable(App.game.statistics.christmasQuestsCompleted);
        });
        this.addQuest(recoverPresents);
    }
}
