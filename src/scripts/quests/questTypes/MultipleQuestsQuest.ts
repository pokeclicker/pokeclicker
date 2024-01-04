/// <reference path="../Quest.ts" />

class MultipleQuestsQuest extends Quest implements QuestInterface {

    constructor(public quests: Quest[], description: string, reward = 0, questCompletedRequired?: number) {
        super(questCompletedRequired ?? quests.length, reward);

        // Hide the quest ready to claim notifications
        quests.forEach((q) => q.asSubQuest(this));
        this.customDescription = description;
        this.focus = ko.pureComputed(() => {
            return quests.filter(q => q.isCompleted()).length;
        });
    }

    begin() {
        this.quests.forEach(q => q.begin());
        super.begin();
    }

    createAutoCompleter(): void {
        this.quests.forEach(q => q.createAutoCompleter());
        super.createAutoCompleter();
    }

    deleteAutoCompleter() {
        this.quests.forEach(q => q.deleteAutoCompleter());
        super.deleteAutoCompleter();
    }

    deleteFocusSub(fromMainQuest = false): boolean {
        if (super.deleteFocusSub(fromMainQuest)) {
            this.quests.forEach(q => q.deleteFocusSub(true));
            return true;
        }
        return false;
    }
}
