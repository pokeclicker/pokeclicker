/// <reference path="./NotificationOption.d.ts"/>
/// <reference path="../utilities/Sound.d.ts"/>
/// <reference path="../settings/BooleanSetting.d.ts"/>
declare class Notifier {
    static notify({ message, type, title, timeout, time, sound, setting, }: {
        message: string;
        type?: NotificationOption;
        title?: string;
        timeout?: number;
        time?: string;
        sound?: Sound;
        setting?: BooleanSetting;
    }): void;
    static prompt({ title, message, type, timeout, sound, }: {
        title: string;
        message: string;
        type?: NotificationOption;
        timeout?: number;
        sound?: Sound;
    }): Promise<string>;
    static confirm({ title, message, confirm, cancel, type, timeout, sound, }: {
        title: string;
        message: string;
        confirm?: string;
        cancel?: string;
        type?: NotificationOption;
        timeout?: number;
        sound?: Sound;
    }): Promise<boolean>;
}
