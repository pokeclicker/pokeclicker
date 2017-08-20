abstract class Quest {
    index: number;
    amount: number
    description: string;
    pointsReward: number;
    xpReward: number;
    progress: KnockoutComputed<number>;
    isCompleted: KnockoutComputed<boolean>;
    claimed: KnockoutObservable<boolean>;
    questFocus: KnockoutObservable<any>;
    initial: KnockoutObservable<any>;
    notified: boolean;

    constructor(amount: number, pointsReward: number) {
        this.amount = amount;
        this.pointsReward = pointsReward;
        this.xpReward = pointsReward/10;
        this.claimed = ko.observable(false);
        this.initial = ko.observable(null);
        this.notified = false;
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

    protected createProgressObservables() {
        this.progress = ko.computed(function() {
            if (this.initial() !== null) {
                return Math.min(1, ( this.questFocus() - this.initial()) / this.amount);
            } else {
                return 0;
            }
        }, this);
        this.isCompleted = ko.computed(function() {
            let completed = this.progress() == 1;
            if (completed && !this.notified) {
                Notifier.notify(`You can complete your quest for ${this.pointsReward} quest points!`, GameConstants.NotificationOption.success)
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