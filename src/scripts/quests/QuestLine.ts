class QuestLine {
    name: string;
    description: string;
    quests: KnockoutObservableArray<Quest>;
    curQuest: KnockoutComputed<number>;
    totalQuests: number;

    autoBegin: KnockoutSubscription;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.quests = ko.observableArray();
        this.totalQuests = 0;
        this.curQuest = ko.computed(() => {
            let acc = 0;
            return this.quests().map((quest) => {return +quest.isCompleted()})
                                .reduce( ( acc, iscompleted) => {return acc + iscompleted},0);
        });

        this.autoBegin = this.curQuest.subscribe(() => {
            if (this.curQuest() < this.totalQuests) {
                this.beginQuest(this.curQuest());
            }
        })
    }

    addQuest(quest: Quest) {
        this.totalQuests++;
        quest.index = this.totalQuests;
        quest.autocomplete = true;
        this.quests.push(quest);
    }

    beginQuest(index: number) {
        let quest = this.quests()[index];
        quest.initial(quest.questFocus);
    }
}