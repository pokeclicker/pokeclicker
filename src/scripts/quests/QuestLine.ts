class QuestLine {
    state: KnockoutObservable<QuestLineState> = ko.observable(QuestLineState.inactive).extend({ numeric: 0 });
    quests: KnockoutObservableArray<Quest>;
    curQuest: KnockoutComputed<number>;
    curQuestObject: KnockoutComputed<any>;
    curQuestInitial: KnockoutObservable<number>;
    totalQuests: number;

    autoBegin: KnockoutSubscription;

    constructor(
        public name: string,
        public description: string,
        public requirement?: Requirement,
        public bulletinBoard: GameConstants.BulletinBoards = GameConstants.BulletinBoards.None
    ) {
        this.name = name;
        this.description = description;
        this.quests = ko.observableArray();
        this.totalQuests = 0;
        this.curQuest = ko.pureComputed(() => {
            const acc = 0;
            return this.quests().map((quest) => {
                return +quest.isCompleted();
            })
                .reduce( ( acc, iscompleted) => {
                    return acc + iscompleted;
                },0);
        });
        this.curQuestInitial = ko.observable();
        this.curQuestInitial.equalityComparer = () => {
            return false;
        }; //Always update subscriptions, even if same data pushed in

        this.curQuestObject = ko.pureComputed(() => {
            this.quests(); //register dependency on this computed so it will update
            if (this.totalQuests > 0 && this.curQuest() < this.totalQuests) {
                return this.quests()[this.curQuest()];
            } else {
                return {progress: () => {
                    return 0;
                }, progressText: () => {
                    return '';
                }};
            }
        });

        this.autoBegin = this.curQuest.subscribe((num) => {
            if (this.curQuest() < this.totalQuests) {
                if (this.curQuestObject().initial() == null) {
                    this.beginQuest(this.curQuest());
                }
            } else {
                this.state(QuestLineState.ended);
            }
        });
    }

    addQuest(quest: Quest) {
        this.totalQuests++;
        quest.index = this.totalQuests;
        quest.inQuestLine = true;
        quest.createAutoCompleter();
        this.quests.push(quest);
    }

    beginQuest(index = 0, initial?: number) {
        const quest = this.quests()[index];
        if (initial != undefined) {
            quest.initial(initial);
        } else {
            quest.begin();
        }
        quest.onLoad();
        this.curQuestInitial(quest.initial());
        this.state(QuestLineState.started);
    }

    resumeAt(index: number, initial) {
        if (initial != undefined) {
            for (let i = 0; i < Math.min(index, this.totalQuests); i++) {
                this.quests()[i].autoCompleter.dispose();
                this.quests()[i].complete();
            }
            if (index < this.totalQuests) {
                this.beginQuest(index, initial);
            }
        } else {
            this.beginQuest(0);
        }
    }

    toJSON() {
        const json = {
            state: this.state(),
            name: this.name,
            quest: this.curQuest(),
            initial: this.curQuestInitial(),
        };
        if (this.curQuestObject() instanceof MultipleQuestsQuest) {
            json.initial = this.curQuestObject().quests.map((q) => q.initial());
        }
        return json;
    }
}
