import Setting from './Setting';

export default class NotificationSetting extends Setting<[boolean, boolean]> {
    constructor(name: string, displayName: string, defaultValue: [boolean, boolean]) {
        super(
            name,
            displayName,
            [],
            defaultValue,
        );
    }

    public toggle(): void {
        this.set([!this.value[0], this.value[1]]);
    }

    public toggleDesktop(): void {
        if (!this.value[1] && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
        this.set([this.value[0], !this.value[1]]);
    }
}
