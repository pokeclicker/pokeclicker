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

    endQuest() {
        if (this.isCompleted() && !this.claimed()) {
            player.gainQuestPoints(this.pointsReward);
            this.claimed(true);
            if (!this.inQuestLine) player.completedQuestList[this.index](true);
            let oldLevel = player.questLevel;
            player.questXP += this.xpReward;
            Notifier.notify(`You have completed your quest and claimed ${this.pointsReward} quest points!`, GameConstants.NotificationOption.success);;
            // Refresh the list each time a player levels up
            if (oldLevel < player.questLevel) {
                Notifier.notify("Your quest level has increased!", GameConstants.NotificationOption.success);
                QuestHelper.refreshQuests(true);
            }
            // Once the player completes every available quest, refresh the list for free
            if (QuestHelper.allQuestCompleted()) {
                QuestHelper.refreshQuests(true);
            }
        } else {
            this.initial(null);
        }
        player.currentQuests(player.currentQuests().filter(x => x.index != this.index));
    }

    beginQuest() {
        this.initial(this.questFocus());
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
                this.endQuest();
                this.autoCompleter.dispose();
            }
        })
    }

    inProgress() {
        return ko.computed(() => {
            return player.currentQuests().map(x => x.index).includes(this.index) && !this.isCompleted();
        })
    }
}
