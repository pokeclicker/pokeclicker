abstract class Quest {
    index: number;
    amount: number
    description: string;
    pointsReward: number;
    xpReward: number;
    progress: KnockoutComputed<number>;
    progressText: KnockoutComputed<string>;
    isCompleted: KnockoutComputed<boolean>;
    claimed: KnockoutObservable<boolean>;
    private _questFocus: KnockoutObservable<any>;
    initial: KnockoutObservable<any>;
    notified: boolean;
    autoComplete: boolean;
    autoCompleter: KnockoutSubscription;
    inQuestLine: boolean

    constructor(amount: number, pointsReward: number) {
        this.amount = amount;
        let randomPointBonus = 0.9 + SeededRand.next() * 0.2; // random between 0.9 and 1.1
        this.pointsReward = Math.ceil(pointsReward * randomPointBonus);
        this.xpReward = pointsReward/10;
        this.claimed = ko.observable(false);
        this.initial = ko.observable(null);
        this.notified = false;
    }

    claimReward() {
        if (this.isCompleted()) {
            player.gainQuestPoints(this.pointsReward);
            console.log(`Gained ${this.pointsReward} quest points and ${this.xpReward} xp points`);
            this.claimed(true);
            player.currentQuest(null);
            if (!this.inQuestLine) player.completedQuestList[this.index](true);
            let oldLevel = player.questLevel;
            player.questXP += this.xpReward;
            QuestHelper.checkCompletedSet();
            if (oldLevel < player.questLevel) {
                Notifier.notify("Your quest level has increased!", GameConstants.NotificationOption.success);
                QuestHelper.refreshQuests(true);
            }
        } else {
            console.log("Quest not yet completed");
        }
    }

    beginQuest() {
        if (!player.currentQuest()){
            this.initial(this.questFocus());
            player.currentQuest({
                index: this.index,
                initial: this.initial()
            });
        } else {
            console.log("You have already started a quest");
        }
    }

    quit() {
        this.initial(null);
        player.currentQuest(null);
    }

    set questFocus(value: KnockoutObservable<any>) {
        this._questFocus = value;
        this.createProgressObservables();
    }

    get questFocus() {
        return this._questFocus
    }

    protected createProgressObservables() {
        this.progress = ko.computed(function() {
            if (this.initial() !== null) {
                return Math.min(1, ( this.questFocus() - this.initial()) / this.amount);
            } else {
                return 0;
            }
        }, this);

        this.progressText = ko.computed(function() {
            if (this.initial() !== null) {
                return "" + Math.min((this.questFocus() - this.initial()), this.amount) +"/" +  this.amount;
            } else {
                return "0/"+this.amount;
            }
        }, this);
        this.isCompleted = ko.computed(function() {
            let completed = this.progress() == 1;
            if (!this.autoComplete && completed && !this.notified) {
                Notifier.notify(`You can complete your quest for ${this.pointsReward} quest points!`, GameConstants.NotificationOption.success);
            }
            return completed;
        }, this);
    }

    complete() {
        this.initial(this.questFocus() - this.amount);
    }

    createAutoCompleter() {
        this.autoComplete = true;
        this.autoCompleter = this.isCompleted.subscribe(() => {
            if (this.isCompleted()) {
                this.claimReward();
                Notifier.notify(`You have completed your quest and gained ${this.pointsReward} quest points!`, GameConstants.NotificationOption.success)
                this.autoCompleter.dispose();
            }
        })
    }

    inProgress() {
        return ko.computed(() => {
            return player.currentQuest() && (this.index == player.currentQuest().index) && !this.isCompleted();
        })
    }
}