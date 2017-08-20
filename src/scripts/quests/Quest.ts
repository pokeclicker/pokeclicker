abstract class Quest {
    description: string;
    pointsReward: number;
    xpReward: number;
    progress: KnockoutComputed<number>;
    isCompleted: KnockoutComputed<boolean>;
    claimed: KnockoutObservable<boolean>;
    questFocus: KnockoutObservable<any>;
    initial: any;

    constructor() {
        this.claimed = ko.observable(false);
    }

    claimReward() {
        if (this.isCompleted()) {
            console.log(`Gained ${this.pointsReward} quest points and ${this.xpReward} xp points`);
            this.claimed(true);
        } else {
            console.log("Quest not yet completed");
        }
    }

    beginQuest() {
        this.initial = this.questFocus();
        this.createProgressObservables();
    }

    protected createProgressObservables() {
        this.progress = ko.computed(function() {
            return Math.min(1, ( this.questFocus() - this.initial) / this.amount);
        }, this);
        this.isCompleted = ko.computed(function() {
            return this.progress() == 1;
        }, this);
    }
}