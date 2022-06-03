/// <reference path="../Quest.ts" />

class MultipleQuestsQuest extends Quest implements QuestInterface {
    questsCompleted: KnockoutComputed<Array<Quest>>;
    questsCompletedLength: KnockoutObservable<number>;

    constructor(public quests: Quest[], reward: number) {
        super(quests.length, reward);
        this.questsCompletedLength = ko.observable(quests.filter(q => q.isCompleted()).length);
        this.questsCompleted = ko.computed(() => {
            return quests.filter(q => q.isCompleted());
        });
        this.questsCompleted.subscribe(newValue => {
            this.questsCompletedLength(newValue.length);
        });
        this.focus = ko.observable(quests.length);
    }

    begin() {
        this.onLoad();
        this.initial = this.questsCompletedLength;
        this.quests.forEach(q => {
            q.begin();
        });
    }

    claim(): boolean {
        this.quests.forEach(q => {
            q.claim();
        });
        return super.claim();
    }
}
