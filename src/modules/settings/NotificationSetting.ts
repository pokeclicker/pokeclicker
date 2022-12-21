import { Computed } from 'knockout';
import NotificationOption from '../notifications/NotificationOption';
import Notifier from '../notifications/Notifier';
import BooleanSetting from './BooleanSetting';

export default class NotificationSetting {
    warnOnBlocked: () => void;
    inGameNotification: BooleanSetting;
    desktopNotification: BooleanSetting;

    private cachedTranslatedName: Computed<string>;

    constructor(public name: string, public defaultDisplayName: string, defaultValueInGame: boolean, lockInGame: boolean = false) {
        if (!lockInGame) {
            this.inGameNotification = new BooleanSetting(name, defaultDisplayName, defaultValueInGame ?? false);
        }
        this.desktopNotification = new BooleanSetting(`${name}.desktop`, defaultDisplayName, false);
        this.desktopNotification.observableValue.subscribe((changedTo) => {
            if (changedTo) {
                if (!('Notification' in window)) {
                    this.desktopNotification.observableValue(false);
                    Notifier.notify({
                        title: 'Desktop notifications blocked',
                        message: 'Your browser does not support desktop notifications.',
                        type: NotificationOption.warning,
                    });
                    return;
                }
                if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                    Notification.requestPermission();
                }
                if (Notification.permission !== 'granted') {
                    this.desktopNotification.observableValue(false);
                    Notifier.notify({
                        title: 'Desktop notifications blocked',
                        message: 'Your browser is blocking desktop notifications.',
                        type: NotificationOption.warning,
                    });
                }
            }
        });
    }

    get displayName(): string {
        if (!this.cachedTranslatedName) {
            this.cachedTranslatedName = App.translation.get(
                this.name,
                'settings',
                { defaultValue: this.defaultDisplayName },
            );
        }
        return this.cachedTranslatedName();
    }
}
