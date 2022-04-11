import BooleanSetting from './BooleanSetting';

export default class NotificationSetting {
    warnOnBlocked: () => void;
    inGameNotification: BooleanSetting;
    desktopNotification: BooleanSetting;
    name: string;
    displayName: string;

    constructor(name: string, displayName: string, defaultValueInGame: boolean, defaultValueDesktop: boolean, warnOnBlocked: () => void, lockInGame: boolean = false) {
        this.warnOnBlocked = warnOnBlocked;
        this.name = name;
        this.displayName = displayName;
        if (!lockInGame) {
            this.inGameNotification = new BooleanSetting(name, displayName, defaultValueInGame ?? false);
        }
        this.desktopNotification = new BooleanSetting(`${name}.desktop`, displayName, defaultValueDesktop ?? false);
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
