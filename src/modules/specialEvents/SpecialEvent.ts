import SpecialEventNotifiedStatus from './SpecialEventsNotifiedStatus';
import Notifier from '../notifications/Notifier';
import NotificationConstants from '../notifications/NotificationConstants';
import { DAY, HOUR, formatTimeShortWords } from '../GameConstants';

type EmptyCallback = () => void;

export enum SpecialEventStatus {
    none,
    started,
    ended,
}

export default class SpecialEvent {
    title: string;
    description: string;
    status: SpecialEventStatus = SpecialEventStatus.none;
    startTime: Date;
    startFunction: EmptyCallback;
    endTime: Date;
    endFunction: EmptyCallback;

    // TODO: only notify once initially until event about to start/end
    notified: SpecialEventNotifiedStatus;

    constructor(title: string, description: string, startTime: Date, startFunction: EmptyCallback, endTime: Date, endFunction: EmptyCallback) {
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.startFunction = startFunction;
        this.endTime = endTime;
        this.endFunction = endFunction;
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
        return this.status === SpecialEventStatus.started;
    }

    hasEnded(): boolean {
        return this.status === SpecialEventStatus.ended;
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
        this.status = SpecialEventStatus.started;

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
        this.status = SpecialEventStatus.none;
        this.updateDate();
    }

    // Move the event to the next year
    updateDate() {
        this.endTime.setFullYear(this.endTime.getFullYear() + 1);
        this.startTime.setFullYear(this.startTime.getFullYear() + 1);
        this.checkStart();
    }
}
