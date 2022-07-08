import {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
} from 'knockout';
import { Currency } from '../GameConstants';
import NotificationOption from '../notifications/NotificationOption';
import Notifier from '../notifications/Notifier';

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
        this.setYear();

        this.manualActiveSecoundsLeft = ko.observable(0);
        this.currentDate = ko.observable(new Date());

        this.isActive = ko.pureComputed(() => (this.currentDate() >= this.startTime
                && this.currentDate() <= this.endTime)
                || this.manualActiveSecoundsLeft() > 0);
        this.timeLeft = ko.pureComputed(() => {
            if (!this.isActive()) {
                return '';
            }
            if ((this.currentDate() >= this.startTime
                && this.currentDate() <= this.endTime)
                && this.manualActiveSecoundsLeft() < (+this.endTime - +this.currentDate()) / 1000) {
                return this.timeTillEndFormatted((+this.endTime - +this.currentDate()) / 1000);
            }
            return this.timeTillEndFormatted(this.manualActiveSecoundsLeft());
        });
    }

    // Is ran every 10 sec
    public tick() {
        this.currentDate(new Date());
        if (this.manualActiveSecoundsLeft() > 0) {
            this.manualActiveSecoundsLeft(this.manualActiveSecoundsLeft() - 10);
        }
    }

    public async startEarly() {
        const daysLeft = Math.floor((+this.startTime - +this.currentDate()) / 1000 / 60 / 60 / 24);
        const price = 500 * daysLeft;

        if (price > App.game.wallet.currencies[Currency.questPoint]()) {
            Notifier.notify({
                title: 'Cannot afford',
                message: `This costs ${price} QP.`,
                type: NotificationOption.danger,
            });
            return;
        }
        if (await Notifier.confirm({
            title: 'Do you want to start this event early?',
            message: `Starting '${this.title}' early will cost you ${price} QP.`,
        })) {
            App.game.wallet.loseAmount({ amount: price, currency: Currency.questPoint });
            this.manualActiveSecoundsLeft(12 * 60 * 60);
        }
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

    setYear() : void {
        // TODO: call this again at end
        if (+this.endTime < Date.now()) {
            this.startTime.setFullYear(new Date().getFullYear());
            this.endTime.setFullYear(new Date().getFullYear());
        }
        // if this is still true, the event has happend this year
        if (+this.endTime < Date.now()) {
            this.startTime.setFullYear(new Date().getFullYear() + 1);
            this.endTime.setFullYear(new Date().getFullYear() + 1);
        }
    }
}
