import {
    Observable as KnockoutObservable,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import * as GameConstants from '../GameConstants';
import Notifier from '../notifications/Notifier';
import Settings from '../settings';

export default class SaveReminder implements Saveable {
    public static counter = 0;

    saveKey = 'saveReminder';

    defaults: Record<string, any> = {};

    public lastDownloaded: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });
    public lastReminder: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
    constructor() {}

    static tick() {
        this.counter = 0;

        // Check if reminders are disabled
        if (!+Settings.getSetting('saveReminder').value) return;

        let timeSinceSaveReminder = App.game.statistics.secondsPlayed() - Math.max(App.game.saveReminder.lastDownloaded(), App.game.saveReminder.lastReminder());
        // Adjust to measure against ms
        timeSinceSaveReminder *= 1000;
        const saveReminderInterval = +Settings.getSetting('saveReminder').value;
        if (timeSinceSaveReminder >= saveReminderInterval) {
            // Show reminder notification
            Notifier.notify({
                title: 'Save Reminder',
                message: `It has been ${GameConstants.formatTimeShortWords(saveReminderInterval)} since your last save download. Would you like to download a backup now?

                <button class="btn btn-block btn-success" onclick="Save.download()" data-dismiss="toast">Download Save</button>`,
                // Timeout either the reminder interval or 3 hours, whichever is lower
                timeout: Math.min(saveReminderInterval, 3 * GameConstants.HOUR),
            });
            App.game.saveReminder.lastReminder(App.game.statistics.secondsPlayed());
        }
    }

    fromJSON(json): void {
        if (!json) {
            return;
        }

        if (json.lastDownloaded) this.lastDownloaded(json.lastDownloaded);
        if (json.lastReminder) this.lastReminder(json.lastReminder);
    }

    toJSON(): Record<string, any> {
        return {
            lastDownloaded: this.lastDownloaded(),
            lastReminder: this.lastReminder(),
        };
    }
}
