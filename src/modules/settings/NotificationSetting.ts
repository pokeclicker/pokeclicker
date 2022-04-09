import BooleanSetting from './BooleanSetting';

export default class NotificationSetting {
    warnOnBlocked: () => void;
    inGameNotification: BooleanSetting;
    desktopNotification: BooleanSetting;

    constructor(name: string, displayName: string, defaultValue: Array<boolean>, warnOnBlocked: () => void) {
        this.warnOnBlocked = warnOnBlocked;
        this.inGameNotification = new BooleanSetting(name, displayName, defaultValue[0] ?? false);
        this.desktopNotification = new BooleanSetting(`${name}.desktop`, displayName, defaultValue[0] ?? false);
        this.desktopNotification.observableValue.subscribe((changedTo) => {
            if (changedTo) {
                if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                    Notification.requestPermission();
                }
                if (Notification.permission !== 'granted') {
                    this.desktopNotification.observableValue(false);
                    this.warnOnBlocked();
                }
            }
        });
    }
}
