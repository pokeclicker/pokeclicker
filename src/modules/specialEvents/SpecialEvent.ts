import SpecialEventNotifiedStatus from './SpecialEventsNotifiedStatus';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import { DAY, HOUR, formatTimeShortWords, formatTime, Currency, SPECIAL_EVENT_TICK, SECOND } from '../GameConstants';
import NotificationOption from '../notifications/NotificationOption';
import { SpecialEventTitleType } from './SpecialEventTitleType';

type EmptyCallback = () => void;

export enum SpecialEventStatus {
    none,
    started,
    ended,
}

export default class SpecialEvent {
    title: SpecialEventTitleType;
    description: string;
    status: KnockoutObservable<SpecialEventStatus>;
    startTime: Date;
    startFunction: EmptyCallback;
    endTime: Date;
    endFunction: EmptyCallback;
    hideFromEventCalendar: boolean;
    eventCalendarTimeLeft: KnockoutObservable<number>;
    isActive: KnockoutObservable<boolean>;

    // TODO: only notify once initially until event about to start/end
    notified: SpecialEventNotifiedStatus;

    constructor(title: SpecialEventTitleType, description: string, startTime: Date, startFunction: EmptyCallback, endTime: Date, endFunction: EmptyCallback, hideFromEventCalendar: boolean) {
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.startFunction = startFunction;
        this.endTime = endTime;
        this.endFunction = endFunction;
        this.status = ko.observable(SpecialEventStatus.none);
        this.hideFromEventCalendar = hideFromEventCalendar;
        this.eventCalendarTimeLeft = ko.observable(0);
        this.eventCalendarTimeLeft.equalityComparer = () => false; // Forcefully update timeLeft
        this.isActive = ko.pureComputed<boolean>(() => this.status() == SpecialEventStatus.started || this.eventCalendarTimeLeft() > 0);
    }

    initialize(): void {
        // Start checking when the event should start
        this.checkStart();
    }

    shouldStartNow(): boolean {
        // If passed the start time, and not ended already
        return this.timeTillStart() <= 0 && !this.hasEnded();
    }

    timeTillStart(): number {
        return +this.startTime - Date.now();
    }

    timeTillEnd(): number {
        return +this.endTime - Date.now();
    }

    hasStarted(): boolean {
        return this.status() === SpecialEventStatus.started;
    }

    hasEnded(): boolean {
        return this.status() === SpecialEventStatus.ended;
    }

    timeLeft(): string {
        const eventCalendarTimeLeft = this.eventCalendarTimeLeft();
        if (this.hasStarted()) {
            return formatTime(this.timeTillEnd() / 1000);
        }
        if (eventCalendarTimeLeft > 0) {
            return formatTime(eventCalendarTimeLeft);
        }
        return '';
    }

    tick(): void {
        this.eventCalendarTimeLeft(Math.max(0, this.eventCalendarTimeLeft() - SPECIAL_EVENT_TICK / SECOND));
    }

    eventCalendarActivate(): void {
        if (this.hideFromEventCalendar) {
            return;
        }
        const daysLeft = Math.floor(this.timeTillStart() / 1000 / 60 / 60 / 24);
        const price = 500 * (daysLeft + 1);
        if (price > App.game.wallet.currencies[Currency.questPoint]()) {
            Notifier.notify({
                title: 'Cannot afford',
                message: `This costs ${price} QP.`,
                type: NotificationOption.danger,
            });
            return;
        }
        Notifier.confirm({
            title: 'Do you want to start this event early?',
            message: `Starting '${this.title}' early will cost you ${price.toLocaleString('en-US')} Quest Points for 24 hours of event time.`,
        }).then((result: boolean) => {
            if (result) {
                App.game.wallet.loseAmount({ amount: price, currency: Currency.questPoint });
                this.eventCalendarTimeLeft(24 * 60 * 60); // Adds a day
            }
        });
    }

    notify(time: string, timeout: number, type = NotificationConstants.NotificationOption.info) {
        Notifier.notify({
            title: `[EVENT] ${this.title}`,
            message: `${this.description}\n\n<strong>Start time:</strong> ${this.startTime.toLocaleString()}\n<strong>End time:</strong> ${this.endTime.toLocaleString()}`,
            type,
            time,
            timeout,
            setting: NotificationConstants.NotificationSetting.General.event_start_end,
        });
    }

    checkStart() {
        // If event already over, move it to next year
        if (this.timeTillEnd() <= 0) {
            this.updateDate();
            return;
        }

        const timeTillEventStart = this.timeTillStart();
        // If more than 1 week, don't notify the player yet
        if (timeTillEventStart > 7 * DAY) {
            // Check again when 7 days left until event start, or in 7 days
            setTimeout(() => {
                this.checkStart();
            }, Math.min(7 * DAY, timeTillEventStart - 7 * DAY));
            // return as this function will be run again after the timeout
            return;
        }

        // If more than 1 day, notify player about the upcoming event
        if (timeTillEventStart > 1 * DAY) {
            this.notify(`starts in ${formatTimeShortWords(timeTillEventStart)}!`, Math.min(1 * HOUR));
            // Check again when less than 6 hours till event start
            setTimeout(() => {
                this.checkStart();
            }, timeTillEventStart - 6 * HOUR);
            // return as this function will be run again after the timeout
            return;
        }

        // If more than 1 hour, notify player about event starting time
        if (timeTillEventStart > 1 * HOUR) {
            this.notify(`starts in ${formatTimeShortWords(timeTillEventStart)}!`, Math.min(timeTillEventStart, 1 * HOUR));
        }

        // If not started yet, notify player event will start soon
        if (!this.shouldStartNow()) {
            // Notify player when 1 hour left, or now
            const sendNotificationTimeout = Math.max(timeTillEventStart - 1 * HOUR, 0);
            const notificationTimeout = sendNotificationTimeout ? 1 * HOUR : timeTillEventStart;
            setTimeout(() => {
                this.notify(`starts in ${formatTimeShortWords(notificationTimeout)}!`, notificationTimeout);
            }, sendNotificationTimeout);
        }

        // Start event now, or at start time
        setTimeout(() => {
            this.start();
        }, Math.max(0, timeTillEventStart));
    }

    start() {
        // Update event status
        this.status(SpecialEventStatus.started);

        // We only wan't the notification displayed for 1 hour, or until the event is over
        const timeTillEventEnd = this.timeTillEnd();
        this.notify('on now!', Math.min(1 * HOUR, timeTillEventEnd), NotificationConstants.NotificationOption.success);

        this.startFunction();
        // Start checking when the event should be ending
        this.checkEnd();
    }

    checkEnd() {
        const timeTillEventEnd = this.timeTillEnd();

        // If more than 1 day, don't notify the player yet
        if (timeTillEventEnd > 1 * DAY) {
            // Check again when 1 day left until event start, or in 1 day (whichever is less)
            setTimeout(() => {
                this.checkEnd();
            }, Math.min(1 * DAY, timeTillEventEnd - 1 * DAY));
            // return as this function will be run again after the timeout
            return;
        }

        // If less than 1 day, and not already over, notify the player when it will end
        if (timeTillEventEnd > 0) {
            // Notify player when 1 hour left, or now
            const sendNotificationTimeout = Math.max(timeTillEventEnd - 1 * HOUR, 0);
            const notificationTimeout = sendNotificationTimeout ? 1 * HOUR : timeTillEventEnd;
            setTimeout(() => {
                this.notify(`ends in ${formatTimeShortWords(notificationTimeout)}!`, notificationTimeout, NotificationConstants.NotificationOption.warning);
            }, sendNotificationTimeout);
        }

        // End event now, or at end time
        setTimeout(() => {
            this.end();
        }, Math.max(0, timeTillEventEnd));
    }

    end() {
        // Update event status
        this.notify('just ended!', 1 * HOUR, NotificationConstants.NotificationOption.danger);
        this.endFunction();
        this.status(SpecialEventStatus.none);
        this.updateDate();
    }

    // Move the event to the next year
    updateDate() {
        this.endTime.setFullYear(this.endTime.getFullYear() + 1);
        this.startTime.setFullYear(this.startTime.getFullYear() + 1);
        this.checkStart();
    }

    fromJSON(json: any): void {
        if (!json) {
            return;
        }
        this.eventCalendarTimeLeft(json.eventCalendarTimeLeft ?? 0);
    }

    toJSON() {
        return {
            name: this.title,
            eventCalendarTimeLeft: this.eventCalendarTimeLeft(),
        };
    }
}
