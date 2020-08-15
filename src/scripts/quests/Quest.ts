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
    private _focus: KnockoutObservable<any>;
    initial: KnockoutObservable<any>;
    notified: boolean;
    autoComplete: boolean;
    autoCompleter: KnockoutSubscription;
    inQuestLine: boolean

    constructor(amount: number, pointsReward: number) {
        this.amount = amount;
        const randomPointBonus = 0.9 + SeededRand.next() * 0.2; // random between 0.9 and 1.1
        this.pointsReward = Math.ceil(pointsReward * randomPointBonus);
        this.xpReward = pointsReward / 10;
        this.claimed = ko.observable(false);
        this.initial = ko.observable(null);
        this.notified = false;
    }

    claim() {
        if (this.isCompleted() && !this.claimed()) {
            App.game.quests.addXP(this.xpReward);
            this.claimed(true);
            if (this.pointsReward) {
                App.game.wallet.gainQuestPoints(this.pointsReward);
                Notifier.notify({ message: `You have completed your quest and claimed ${this.pointsReward} quest points!`, type: GameConstants.NotificationOption.success });
            } else {
                Notifier.notify({ message: 'You have completed a quest!', type: GameConstants.NotificationOption.success });
            }
            return true;
        }
        return false;
    }

    quit(shouldConfirm = false) {
        if (shouldConfirm && !confirm('Are you sure you want to quit this quest?!')) {
            return false;
        }
        this.initial(null);
        return true;
    }

    begin() {
        this.initial(this.focus());
    }

    set focus(value: KnockoutObservable<any>) {
        this._focus = value;
        this.createProgressObservables();
    }

    get focus() {
        return this._focus;
    }

    protected createProgressObservables() {
        this.progress = ko.pureComputed(function() {
            if (this.initial() !== null) {
                return Math.min(1, ( this.focus() - this.initial()) / this.amount);
            } else {
                return 0;
            }
        }, this);

        this.progressText = ko.pureComputed(function() {
            if (this.initial() !== null) {
                return `${Math.min((this.focus() - this.initial()), this.amount)} / ${this.amount}`;
            } else {
                return `0 / ${this.amount}`;
            }
        }, this);

        // This computed has a side effect - creating a notification - so we cannot safely make it a pureComputed
        // This will only be a problem if we make it subscribe to a function which lives longer than itself
        // Since it is only subscribing to observables on `this`, and the function is being kept on `this`, we shouldn't have a problem
        this.isCompleted = ko.computed(function() {
            const completed = this.progress() == 1;
            if (!this.autoComplete && completed && !this.notified) {
                Notifier.notify({ message: `You can complete your quest for ${this.pointsReward} quest points!`, type: GameConstants.NotificationOption.success, timeout: 5e3, sound: GameConstants.NotificationSound.quest_ready_to_complete, setting: GameConstants.NotificationSetting.quest_ready_to_complete });
                this.notified = true;
            }
            return completed;
        }, this);
    }

    complete() {
        this.initial(this.focus() - this.amount);
    }

    createAutoCompleter() {
        this.autoComplete = true;
        this.autoCompleter = this.isCompleted.subscribe(() => {
            if (this.isCompleted()) {
                this.claim();
                this.autoCompleter.dispose();
            }
        });
    }

    inProgress = ko.pureComputed(() => {
        return this.initial() !== null && !this.claimed();
    });

    toJSON() {
        return {
            amount: this.amount,
            initial: this.initial(),
            description: this.description,
            index: this.index || 0,
            notified: this.notified,
            pointsReward: this.pointsReward,
            xpReward: this.xpReward,
            inProgress: this.inProgress(),
            isCompleted: this.isCompleted(),
            claimed: this.claimed(),
        };
    }
}
