class QuestLine {
    name: string;
    description: string;
    quests: KnockoutObservableArray<Quest>;
    curQuest: KnockoutComputed<number>;
    curQuestObject: KnockoutComputed<any>;
    curQuestInitial: KnockoutObservable<number>;
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
        this.curQuestInitial = ko.observable();
        this.curQuestInitial.equalityComparer = () => {return false} //Always update subscriptions, even if same data pushed in

        this.curQuestObject = ko.computed(() => {
            this.quests(); //register dependency on this computed so it will update
            if (this.totalQuests > 0 && this.curQuest() < this.totalQuests) {
                return this.quests()[this.curQuest()]
            } else {
                return {progress: ()=>{return 0}, progressText: ()=>{return ""}}
            }
        })

        this.autoBegin = this.curQuest.subscribe((num) => {
            console.log("curQuest is now",num)
            if (this.curQuest() < this.totalQuests) {
                setTimeout(() => {console.log("moving on to",this.curQuest());this.beginQuest(this.curQuest())},2000);
            }
        })
    }

    addQuest(quest: Quest) {
        this.totalQuests++;
        quest.index = this.totalQuests;
        quest.inQuestLine = true;
        quest.createAutoCompleter();
        this.quests.push(quest);
    }

    beginQuest(index: number, initial?) {
        let quest = this.quests()[index];
        if (typeof initial == "undefined") {
            initial = quest.questFocus();
        }
        quest.initial(initial);
        this.curQuestInitial(quest.initial());
    }

    resumeAt(index: number, state) {
        if (typeof state != "undefined") {
            console.log(`beginning at ${index}`)
            for (let i=0; i<index; i++) {
                this.quests()[i].autoCompleter.dispose();
                this.quests()[i].complete();
            }
            if (index < this.totalQuests) {
                this.beginQuest(index, state);
            }
        } else {
            this.beginQuest(0);
        }
    }
}