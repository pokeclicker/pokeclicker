import NotificationOption from '../notifications/NotificationOption';
import Notifier from '../notifications/Notifier';
import BooleanSetting from './BooleanSetting';

const NotificationWarnOnBlocked = () => {
    Notifier.notify({
        title: 'Desktop notifications blocked',
        message: 'Your browser is blocking desktop notifications.',
        type: NotificationOption.warning,
    });
};

export default class NotificationSetting {
    warnOnBlocked: () => void;
    inGameNotification: BooleanSetting;
    desktopNotification: BooleanSetting;
    name: string;
    displayName: string;

    constructor(name: string, displayName: string, defaultValueInGame: boolean, lockInGame: boolean = false) {
        this.warnOnBlocked = NotificationWarnOnBlocked;
        this.name = name;
        this.displayName = displayName;
        if (!lockInGame) {
            this.inGameNotification = new BooleanSetting(name, displayName, defaultValueInGame ?? false);
        }
        this.desktopNotification = new BooleanSetting(`${name}.desktop`, displayName, false);
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
