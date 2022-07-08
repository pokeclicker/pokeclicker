import {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
} from 'knockout';

export default class SpecialEvent {
    public isActive: KnockoutComputed<boolean>;
    public timeLeft: KnockoutComputed<string>;
    manualActiveSecoundsLeft: KnockoutObservable<number>;
    currentDate: KnockoutObservable<Date>;

    constructor(
        public title: string,
        public description: string,
        public startTime: Date,
        public endTime: Date,
    ) {
        this.manualActiveSecoundsLeft = ko.observable(0);
        this.currentDate = ko.observable(new Date());

        this.isActive = ko.pureComputed(() => this.currentDate() >= this.startTime
                && this.currentDate() <= this.endTime
                && this.manualActiveSecoundsLeft() > 0);
        this.timeLeft = ko.pureComputed(() => {
            if (this.manualActiveSecoundsLeft() > (+this.endTime - +this.currentDate()) / 1000) {
                return this.timeTillEndFormatted(this.manualActiveSecoundsLeft());
            }
            return this.timeTillEndFormatted((+this.endTime - +this.currentDate()) / 1000);
        });
    }

    // eslint-disable-next-line class-methods-use-this
    timeTillEndFormatted(secondsLeft: number): string {
        if (secondsLeft < 60) {
            return `${secondsLeft} seconds`;
        }
        if (secondsLeft < 3600) {
            return `${Math.floor(secondsLeft / 60)} minutes`;
        }
        if (secondsLeft < 3600 * 24) {
            return `${Math.floor(secondsLeft / 3600 / 24)} hours`;
        }
        return `${Math.floor((secondsLeft / 3600 / 24))} days`;
    }
}
