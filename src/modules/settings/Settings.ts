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

    static fromJSON(dict = {}) {
        Object.entries(dict).forEach(([name, value]) => {
            this.setSettingByName(name, value);
        });
    }

    static enumToSettingOptionArray<T extends Record<string, unknown>>(obj: T, filter: ((v) => boolean) = (() => true), displayNames?: Record<keyof T, string>) {
        return GameHelper.enumStrings(obj).filter(filter).map(
            (val) => new SettingOption(displayNames ? displayNames[val] : camelCaseToString(val), `${obj[val]}`),
        );
    }

    static enumToNumberSettingOptionArray(obj: any, filter: ((v) => boolean) = (() => true)) {
        return GameHelper.enumStrings(obj).filter(filter).map((val) => new SettingOption(camelCaseToString(val), obj[val]));
    }

    static selectOptionsToSettingOptions<T>(opts: Array<{ name: string, value: T }>) {
        return opts.map(({ name, value }) => new SettingOption(camelCaseToString(name), value));
    }

    static saveDefault() {
        localStorage.setItem('settings', JSON.stringify(Settings.toJSON()));
    }

    static loadDefault() {
        const loadedJSON = JSON.parse(localStorage.getItem('settings')) ?? {};
        const validatedJSON = {};
        this.list.forEach((setting) => {
            const currentVal = loadedJSON[setting.name];
            validatedJSON[setting.name] = (currentVal != null && setting.validValue(currentVal)) ? currentVal : setting.defaultValue;
        });
        localStorage.setItem('settings', JSON.stringify(validatedJSON));
        this.fromJSON(validatedJSON);
    }

    static resetDefault() {
        localStorage.removeItem('settings');
    }
}
