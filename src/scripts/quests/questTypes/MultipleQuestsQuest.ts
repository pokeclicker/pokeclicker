/// <reference path="../Quest.ts" />

class MultipleQuestsQuest extends Quest implements QuestInterface {
    customReward?: () => void;

    constructor(public quests: Quest[], reward?: number | (() => void)) {
        super(quests.length, typeof reward == 'number' ? reward : 0);
        this.customReward = typeof reward == 'function' ? reward : undefined;
        this.focus = ko.pureComputed(() => {
            return quests.filter(q => q.isCompleted()).length;
        });
    }

    begin() {
        this.onLoad();
        this.quests.forEach(q => {
            q.begin();
        });
        super.begin();
    }

    claim(): boolean {
        if (this.customReward) {
            this.customReward();
        }
        this.quests.forEach(q => {
            q.claim();
        });
        return super.claim();
    }
}
