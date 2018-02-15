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
        quest.createAutoCompleter();
        this.quests.push(quest);
    }

    beginQuest(index: number) {
        let quest = this.quests()[index];
        quest.initial(quest.questFocus());
        player.tutorialProgress(index);
        player.tutorialState = quest.initial();
    }

    resumeAt(index: number, state) {
        if (typeof state != "undefined") {
            console.log(`beginning at ${index}`)
            for (let i=0; i<index; i++) {
                this.quests()[i].autoCompleter.dispose();
                this.quests()[i].complete();
            }
            this.resumeQuest(index, state);
        } else {
            this.beginQuest(0);
        }
    }

    private resumeQuest(index: number, initial) {
        let quest = this.quests()[index];
        quest.initial(initial);
    }
}