/// <reference path="../../declarations/GameHelper.d.ts" />
type QuestOptionalArgument = {
    clearedMessage?: string;
    npcDisplayName?: string,
    npcImageName?: string,
};

abstract class Quest {
    public static questObservable: KnockoutObservable<Quest> = ko.observable();

    index: number;
    amount: number
    customDescription?: string;
    pointsReward: number;
    progress: KnockoutComputed<number>;
    progressText: KnockoutComputed<string>;
    inProgress: KnockoutComputed<boolean>;
    isCompleted: KnockoutComputed<boolean>;
    claimed: KnockoutObservable<boolean>;
    private _focus: KnockoutObservable<any>;
    private focusSub: KnockoutSubscription;
    private focusValue: number;
    initial: KnockoutObservable<any>;
    notified: boolean;
    autoComplete: boolean;
    autoCompleter: KnockoutSubscription;
    inQuestLine: boolean;
    _onLoad?: () => void;
    onLoadCalled: boolean;
    suspended: boolean;
    customReward?: () => void;
    optionalArgs?: QuestOptionalArgument;
    initialValue?: number;

    constructor(amount: number, pointsReward: number) {
        this.amount = isNaN(amount) ? 0 : amount;
        this.pointsReward = pointsReward;
        this.initial = ko.observable(null);
        this.claimed = ko.observable(false);
        this.notified = false;
        this.onLoadCalled = false;
        this.suspended = false;
    }

    public static canComplete() {
        return true;
    }

    get description(): string {
        return this.customDescription ?? 'Generic Quest Description. This should be overriden.';
    }

    public static generateData(): any[] {
        return [1, 0];
    }

    public static randomizeReward(pointsReward: number) {
        const randomPointBonus = 0.9 + SeededRand.float(0.2); // random between 0.9 and 1.1
        return Math.ceil(pointsReward * randomPointBonus);
    }

    get xpReward(): number {
        return 100 + (this.pointsReward / 10);
    }

    //#region Quest Status

    claim() {
        if (this.isCompleted() && !this.claimed()) {
            App.game.quests.addXP(this.xpReward);
            if (this.customReward !== undefined) {
                this.customReward();
            }
            if (this.optionalArgs?.clearedMessage !== undefined) {
                Quest.questObservable(this);
                $('#questStepClearedModal').modal('show');
            }
            this.focusSub?.dispose?.();
            this.claimed(true);
            if (this.pointsReward) {
                App.game.wallet.gainQuestPoints(this.pointsReward);
                Notifier.notify({
                    message: `You have completed your quest!\nYou claimed <img src="./assets/images/currency/questPoint.svg" height="24px"/> ${this.pointsReward.toLocaleString('en-US')}!`,
                    strippedMessage: `You have completed your quest and claimed ${this.pointsReward.toLocaleString('en-US')} Quest Points!`,
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.General.quest_completed,
                });
                App.game.logbook.newLog(
                    LogBookTypes.QUEST,
                    createLogContent.completedQuestWithPoints({
                        quest: this.description,
                        points: this.pointsReward.toLocaleString('en-US'),
                    })
                );
            } else {
                Notifier.notify({
                    message: 'You have completed a quest!',
                    type: NotificationConstants.NotificationOption.success,
                    setting: NotificationConstants.NotificationSetting.General.quest_completed,
                });
                App.game.logbook.newLog(
                    LogBookTypes.QUEST,
                    createLogContent.completedQuest({ quest: this.description })
                );
            }
            GameHelper.incrementObservable(App.game.statistics.questsCompleted);
            return true;
        }
        return false;
    }

    quit(shouldConfirm = false) {
        if (shouldConfirm) {
            Notifier.confirm({
                title: 'Quit Quest',
                message: 'Are you sure?\n\nYou can start the quest again later but you will lose all progress!',
                type: NotificationConstants.NotificationOption.warning,
                confirm: 'Quit',
            }).then(confirmed => {
                if (confirmed) {
                    this.initial(null);
                }
            });
        } else {
            this.initial(null);
        }
    }

    begin() {
        this.initial(this.initialValue ?? this.focus());
        this.onLoad();
    }

    set focus(value: KnockoutObservable<any>) {
        this._focus = value;
        this.createProgressObservables();
    }

    get focus() {
        return this._focus;
    }

    protected createProgressObservables() {
        // Dispose of our old subscriber if one exists
        this.focusSub?.dispose?.();

        // Subscribe to the new focus
        this.focusValue = this._focus();
        this.focusSub = this._focus.subscribe?.((newValue) => {
            // If we aren't actively completing this quests, don't do anything
            if (!this.inProgress()) {
                return;
            }
            // If the focus goes down, adjust our initial value
            if (newValue < this.focusValue) {
                this.initial(this.initial() - (this.focusValue - newValue));
            }
            // Prevent progress on suspended quests by adjusting the initial value
            if (this.suspended && newValue > this.focusValue) {
                this.initial(this.initial() + (newValue - this.focusValue));
            }
            this.focusValue = newValue;
        });

        // Calculate our progress
        this.progress = ko.pureComputed(() => {
            if (this.initial() !== null) {
                return Math.min(1, ( this.focus() - this.initial()) / this.amount);
            } else {
                return 0;
            }
        });

        this.progressText = ko.pureComputed(() => {
            if (this.initial() !== null) {
                return `${Math.min((this.focus() - this.initial()), this.amount).toLocaleString('en-US')} / ${this.amount.toLocaleString('en-US')}`;
            } else {
                return `0 / ${this.amount.toLocaleString('en-US')}`;
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
                    message: `You can complete your quest for <img src="./assets/images/currency/questPoint.svg" height="24px"/> ${this.pointsReward.toLocaleString('en-US')}!`,
                    strippedMessage: `You can complete your quest for ${this.pointsReward.toLocaleString('en-US')} Quest Points!`,
                    type: NotificationConstants.NotificationOption.success,
                    timeout: 5e3,
                    sound: NotificationConstants.NotificationSound.Quests.quest_ready_to_complete,
                    setting: NotificationConstants.NotificationSetting.General.quest_ready_to_complete,
                });
                this.notified = true;
            }
            return completed;
        });
    }

    onLoad() {
        if (typeof this._onLoad === 'function' && !this.onLoadCalled) {
            this._onLoad();
            this.onLoadCalled = true;
        }
    }

    complete(bypassAutoCompleter = false) {
        if (bypassAutoCompleter) {
            this.deleteAutoCompleter();
            // Was consequently disposed on auto completion.
            this.focusSub?.dispose();
        }
        this.initial(this.focus() - this.amount);
    }

    createAutoCompleter() {
        this.autoComplete = true;
        this.autoCompleter = this.isCompleted.subscribe(() => {
            if (this.isCompleted()) {
                this.claim();
                this.deleteAutoCompleter();
            }
        });
    }

    deleteAutoCompleter() {
        this.autoCompleter?.dispose();
    }

    withDescription(description: string): Quest {
        this.customDescription = description;
        return this;
    }

    withOnLoad(onLoad: () => void): Quest {
        this._onLoad = onLoad;
        return this;
    }

    withCustomReward(customReward: () => void): Quest {
        this.customReward = typeof customReward === 'function' ? customReward : undefined;
        return this;
    }

    withOptionalArgs(optionalArgs: QuestOptionalArgument): Quest {
        this.optionalArgs = optionalArgs;
        return this;
    }

    withInitialValue(initialValue: number): Quest {
        this.initialValue = initialValue;
        return this;
    }

    public getClearedMessage() {
        return this.optionalArgs.clearedMessage;
    }

    public getNpcDisplayName() {
        return this.optionalArgs.npcDisplayName;
    }

    public getNpcImage() {
        const npcImageName = this.optionalArgs?.npcImageName;
        return `assets/images/npcs/${npcImageName}.png`;
    }

    //#endregion

    toJSON(): Record<string, any> {
        return {
            index: this.index || 0,
            customDescription: this.customDescription,
            data: <any[]>[this.amount, this.pointsReward],
            initial: this.initial(),
            claimed: this.claimed(),
            notified: this.notified,
        };
    }

    fromJSON(json: any) {
        if (!json) {
            this.index = 0;
            this.claimed(false);
            this.initial(null);
            this.notified = false;
        }
        this.index = json.hasOwnProperty('index') ? json.index : 0;
        this.claimed(json.hasOwnProperty('claimed') ? json.claimed : false);
        this.initial(json.hasOwnProperty('initial') ? json.initial : null);
        this.notified = json.hasOwnProperty('notified') ? json.notified : false;
    }
}
