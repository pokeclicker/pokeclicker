/// <reference path="../../declarations/GameHelper.d.ts" />

abstract class Quest {
    index: number;
    amount: number
    description: string;
    pointsReward: number;
    xpReward: number;
    progress: KnockoutComputed<number>;
    progressText: KnockoutComputed<string>;
    inProgress: KnockoutComputed<boolean>;
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
        this.xpReward = 100 + (pointsReward / 10);
        this.claimed = ko.observable(false);
        this.initial = ko.observable(null);
        this.notified = false;
    }

    //#region Quest Status

    claim() {
        if (this.isCompleted() && !this.claimed()) {
            App.game.quests.addXP(this.xpReward);
            this.claimed(true);
            if (this.pointsReward) {
                App.game.wallet.gainQuestPoints(this.pointsReward);
                Notifier.notify({
                    message: `You have completed your quest and claimed ${this.pointsReward} quest points!`,
                    type: NotificationConstants.NotificationOption.success,
                });
                App.game.logbook.newLog(
                    LogBookTypes.QUEST_COMPLETE,
                    `Completed "${this.description}" for ${this.pointsReward} quest points.`);
            } else {
                Notifier.notify({
                    message: 'You have completed a quest!',
                    type: NotificationConstants.NotificationOption.success,
                });
                App.game.logbook.newLog(
                    LogBookTypes.QUEST_COMPLETE,
                    `Completed "${this.description}".`);
            }
            GameHelper.incrementObservable(App.game.statistics.questsCompleted);
            return true;
        }
        return false;
    }

    quit(shouldConfirm = false) {
        if (shouldConfirm && !confirm('Are you sure?\nYou can start the quest again later but you will lose all progress!')) {
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
        this.progress = ko.pureComputed(() => {
            if (this.initial() !== null) {
                return Math.min(1, ( this.focus() - this.initial()) / this.amount);
            } else {
                return 0;
            }
        });

        this.progressText = ko.pureComputed(() => {
            if (this.initial() !== null) {
                return `${Math.min((this.focus() - this.initial()), this.amount)} / ${this.amount}`;
            } else {
                return `0 / ${this.amount}`;
            }
        });

        this.inProgress = ko.pureComputed(() => {
            return this.initial() !== null && !this.claimed();
        });

        // This computed has a side effect - creating a notification - so we cannot safely make it a pureComputed
        // This will only be a problem if we make it subscribe to a function which lives longer than itself
        // Since it is only subscribing to observables on `this`, and the function is being kept on `this`, we shouldn't have a problem
        this.isCompleted = ko.computed(() => {
            const completed = this.progress() == 1 || this.claimed();
            if (!this.autoComplete && completed && !this.notified) {
                Notifier.notify({
                    message: `You can complete your quest for ${this.pointsReward} quest points!`,
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 5e3,
                    sound: NotificationConstants.NotificationSound.quest_ready_to_complete,
                    setting: NotificationConstants.NotificationSetting.quest_ready_to_complete,
                });
                this.notified = true;
            }
            return completed;
        });
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

    //#endregion

    toJSON() {
        return {
            initial: this.initial(),
            index: this.index || 0,
            notified: this.notified,
            claimed: this.claimed(),
        };
    }
}
