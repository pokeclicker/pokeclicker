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
    questFocus: KnockoutObservable<any>;
    initial: KnockoutObservable<any>;
    notified: boolean;
    autocomplete: boolean;

    constructor(amount: number, pointsReward: number, autocomplete: boolean = false) {
        this.amount = amount;
        let randomPointBonus = 0.9 + SeededRand.next() * 0.2; // random between 0.9 and 1.1
        this.pointsReward = Math.ceil(pointsReward * randomPointBonus);
        this.xpReward = pointsReward/10;
        this.claimed = ko.observable(false);
        this.initial = ko.observable(null);
        this.notified = false;
        this.autocomplete=autocomplete
    }

    claimReward() {
        if (this.isCompleted()) {
            player.questPoints += this.pointsReward;
            console.log(`Gained ${this.pointsReward} quest points and ${this.xpReward} xp points`);
            this.claimed(true);
            player.currentQuest(null);
            player.completedQuestList[this.index](true);
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
            if (!this.autocomplete && completed && !this.notified) {
                Notifier.notify(`You can complete your quest for ${this.pointsReward} quest points!`, GameConstants.NotificationOption.success)
            }
            if (this.autocomplete && !this.claimed) {
                this.claimReward()
            }
            return completed
        }, this);
    }



    inProgress() {
        return ko.computed(() => {
            return player.currentQuest() && (this.index == player.currentQuest().index) && !this.isCompleted();
        })
    }
}