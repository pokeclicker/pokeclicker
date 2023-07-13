/// <reference path="../Quest.ts" />

class MultipleQuestsQuest extends Quest implements QuestInterface {
    customReward?: () => void;

    constructor(public quests: Quest[], description: string, reward?: number | (() => void), questCompletedRequired?: number) {
        super(questCompletedRequired ?? quests.length, typeof reward == 'number' ? reward : 0);

        // Hide the quest ready to claim notifications
        quests.forEach((q) => q.autoComplete = true);

        this.customReward = typeof reward == 'function' ? reward : undefined;
        this.customDescription = description;
        this.focus = ko.pureComputed(() => {
            return quests.filter(q => q.isCompleted()).length;
        });
    }

    begin() {
        this.quests.forEach(q => q.begin());
        super.begin();
    }

    claim(): boolean {
        if (this.customReward) {
            this.customReward();
        }
        return super.claim();
    }

    createAutoCompleter(): void {
        this.quests.forEach(q => q.createAutoCompleter());
        super.createAutoCompleter();
    }

    deleteAutoCompleter() {
        this.quests.forEach(q => q.deleteAutoCompleter());
        super.deleteAutoCompleter();
    }
}
