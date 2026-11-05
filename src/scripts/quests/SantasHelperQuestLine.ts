/// <reference path="./QuestLine.ts" />

type SantasHelperSave = {
    deliveryGyms?: string[];
    presentTarget?: number;
};

class SantasHelperQuestLine extends QuestLine {
    private deliveryGyms?: string[];
    private presentTarget: number;

    public static getPresentTarget(completedDays: number): number {
        return Math.round(10 * 10 ** (Math.min(completedDays, 4) / 4));
    }

    constructor(saved?: SantasHelperSave) {
        super(
            'Santa\'s Helper',
            'Defeat the Santa Jynx Band at Bill\'s House, recover their missing Christmas Presents, then deliver them.',
            new SpecialEventRequirement('Merry Christmas!')
        );

        this.deliveryGyms = saved?.deliveryGyms;
        this.presentTarget = saved?.presentTarget ?? SantasHelperQuestLine.getPresentTarget(App.game.statistics.christmasQuestsCompleted());

        const defeatJynxBand = new DefeatTemporaryBattleQuest(
            'Santa Jynx 1',
            'Defeat the Santa Jynx Band at Bill\'s House.'
        );
        this.addQuest(defeatJynxBand);

        const recoverPresents = new CustomQuest(
            this.presentTarget,
            0,
            `Obtain ${this.presentTarget.toLocaleString('en-US')} Christmas Presents. Santa Jynx can be found on Routes in Kanto.`,
            () => player.itemList.Christmas_present()
        );

        this.addQuest(recoverPresents);
        if (!this.deliveryGyms) {
            SeededRand.seedWithDate(new Date());
            const possibleGyms = GameConstants.RegionGyms.flat()
                .filter(town => GymList[town].flags.quest && GymList[town].clears() > 0 && GymList[town].isUnlocked());
            this.deliveryGyms = [];
            const gymCount = player.highestRegion() + 1;
            while (this.deliveryGyms.length < gymCount && possibleGyms.length > 0) {
                const index = SeededRand.intBetween(0, possibleGyms.length - 1);
                this.deliveryGyms.push(possibleGyms[index]);
                possibleGyms.splice(index, 1);
            }
            this.deliveryGyms.sort((a, b) => GameConstants.getGymIndex(a) - GameConstants.getGymIndex(b));
        }

        const wins = Math.floor(this.presentTarget / this.deliveryGyms.length);
        const deliverPresents = new MultipleQuestsQuest(
            this.deliveryGyms.map(town => new DefeatGymQuest(wins, 0, town)),
            'Deliver the Presents to the friend you made along the way.'
        ).withCustomReward(() => {
            GameHelper.incrementObservable(App.game.statistics.christmasQuestsCompleted);
        });
        this.addQuest(deliverPresents);
    }

    toJSON() {
        return {
            ...super.toJSON(),
            deliveryGyms: this.deliveryGyms,
            presentTarget: this.presentTarget,
        };
    }
}
