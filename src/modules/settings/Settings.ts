import Setting from './Setting';
import SettingOption from './SettingOption';
import { camelCaseToString } from '../GameConstants';
import GameHelper from '../GameHelper';

export default class Settings {
    static list: Setting<any>[] = [];

    static add(setting: Setting<any>) {
        if (!setting.name) {
            // eslint-disable-next-line no-console
            console.warn(`Cannot add settings with no name (display name: '${setting.defaultDisplayName}')`);
        } else if (!this.getSetting(setting.name)) {
            this.list.push(setting);
        }
    }

    static setSettingByName(name: string, value: any) {
        const setting = this.getSetting(name);
        if (setting) {
            setting.set(value);
        } else {
            console.warn(`Setting ${name} does not exist`);
        }
    }

    static getSetting(name: string): Setting<any> {
        return this.list.find((setting) => setting.name === name) || null;
    }

    static toJSON() {
        const json = {};
        this.list.forEach((setting) => {
            json[setting.name] = setting.value;
        });
        return json;
    }

    static fromJSON(dict) {
        Object.entries(dict || {})?.forEach(([name, value]) => {
            this.setSettingByName(name, value);
        });
    }

    static checkAndFix() {
        this.list.forEach((setting) => {
            if (!setting.validValue(setting.value)) {
                console.warn(`Resetting ${setting.name} to default from invalid value ${setting.value}`);
                setting.set(setting.defaultValue);
            }
        });
    }

    static enumToSettingOptionArray<T extends Record<string, unknown>>(obj: T, filter: (v) => boolean = () => true, displayNames?: Record<keyof T, string>) {
        return GameHelper.enumStrings(obj).filter(filter).map(
            (val) => new SettingOption(displayNames ? displayNames[val] : camelCaseToString(val), `${obj[val]}`),
        );
    }

    static enumToNumberSettingOptionArray(obj: any, filter: (v) => boolean = () => true) {
        return GameHelper.enumStrings(obj).filter(filter).map((val) => new SettingOption(camelCaseToString(val), obj[val]));
    }

    static selectOptionsToSettingOptions<T>(opts: Array<{ name: string, value: T }>) {
        return opts.map(({ name, value }) => new SettingOption(camelCaseToString(name), value));
    }

    static saveDefault() {
        localStorage.setItem('settings', JSON.stringify(Settings.toJSON()));
    }

    static loadDefault() {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        this.list.forEach((setting) => {
            settings[setting.name] = settings[setting.name] ?? setting.defaultValue;
        });
        this.fromJSON(settings);
    }

    static resetDefault() {
        localStorage.removeItem('settings');
    }
}
