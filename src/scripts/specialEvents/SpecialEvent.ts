type EmptyCallback = () => void;

enum SpecialEventStatus {
    none,
    started,
    ended,
}

class SpecialEvent {
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

        this.initialize();
    }

    initialize(): void {
        // If event already over, do nothing
        if (this.timeTillEnd() <= 0) {
            this.status = SpecialEventStatus.ended;
            return;
        }

        const timeTillEventStart = this.timeTillStart();
        // If more than 1 week, don't notify the player yet
        if (timeTillEventStart > 7 * GameConstants.DAY) {
            // Check again when 7 days left until event start
            setTimeout(() => {
                this.initialize();
            }, timeTillEventStart - 7 * GameConstants.DAY);
            return;
        }

        // If more than 1 day, notify player about the upcoming event
        if (timeTillEventStart > 1 * GameConstants.DAY) {
            this.notify(`starts in ${GameConstants.formatTimeShortWords(timeTillEventStart)}!`, Math.min(1 * GameConstants.HOUR));
            // Check again when less than 6 hours till event start
            setTimeout(() => {
                this.initialize();
            }, timeTillEventStart - 6 * GameConstants.HOUR);
            return;
        }

        // If more than 1 hour, notify player about event starting time
        if (timeTillEventStart > 1 * GameConstants.HOUR) {
            this.notify(`starts in ${GameConstants.formatTimeShortWords(timeTillEventStart)}!`, Math.min(timeTillEventStart, 1 * GameConstants.HOUR));
        }

        // If not started yet, notify player event will start soon
        if (!this.shouldStartNow()) {
            // Notify player when 1 hour left, or now
            const sendNotificationTimeout = Math.max(timeTillEventStart - 1 * GameConstants.HOUR, 0);
            const notificationTimeout = sendNotificationTimeout ? 1 * GameConstants.HOUR : timeTillEventStart;
            setTimeout(() => {
                this.notify(`starts in ${GameConstants.formatTimeShortWords(notificationTimeout)}!`, notificationTimeout);
            }, sendNotificationTimeout);
        }

        // Start event now, or at start time
        setTimeout(() => {
            this.start();
        }, Math.max(0, timeTillEventStart));
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
        return this.status == SpecialEventStatus.started;
    }

    hasEnded(): boolean {
        return this.status == SpecialEventStatus.ended;
    }

    notify(time: string, timeout: number, type = GameConstants.NotificationOption.info) {
        timeout -= 1000;
        Notifier.notify({ title: `[EVENT] ${this.title}`, message: `${this.description}<br/><br/><strong>Start time:</strong> ${this.startTime.toLocaleString()}<br/><strong>End time:</strong> ${this.endTime.toLocaleString()}`, type, time, timeout, setting: GameConstants.NotificationSetting.event_start_end });
    }

    start() {
        this.status = SpecialEventStatus.started;
        const timeTillEventEnd = this.timeTillEnd();

        this.notify('on now!', Math.min(1 * GameConstants.HOUR, timeTillEventEnd), GameConstants.NotificationOption.success);
        this.startFunction();

        if (timeTillEventEnd > 0) {
            // Notify player when 1 hour left, or now
            const sendNotificationTimeout = Math.max(timeTillEventEnd - 1 * GameConstants.HOUR, 0);
            const notificationTimeout = sendNotificationTimeout ? 1 * GameConstants.HOUR : timeTillEventEnd;
            setTimeout(() => {
                this.notify(`ends in ${GameConstants.formatTimeShortWords(notificationTimeout)}!`, notificationTimeout, GameConstants.NotificationOption.warning);
            }, sendNotificationTimeout);
        }

        // End event now, or at end time
        setTimeout(() => {
            this.end();
        }, Math.max(0, timeTillEventEnd));
    }

    end() {
        this.status = SpecialEventStatus.ended;
        this.notify('just ended!', 1 * GameConstants.HOUR, GameConstants.NotificationOption.danger);
        this.endFunction();
    }
}
