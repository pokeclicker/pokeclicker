import Setting from './Setting';
import SettingOption from './SettingOption';
import { camelCaseToString } from '../GameConstants';
import GameHelper from '../GameHelper';

export default class Settings {
    static list: Setting<any>[] = [];

    static add(setting: Setting<any>) {
        if (!this.getSetting(setting.name)) {
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
        Object.entries(dict || {})?.forEach(([name, value]) => this.setSettingByName(name, value));
    }

    static enumToSettingOptionArray(obj: any, filter: (v) => boolean = () => true) {
        return GameHelper.enumStrings(obj).filter(filter).map((val) => new SettingOption(camelCaseToString(val), `${obj[val]}`));
    }

    static enumToNumberSettingOptionArray(obj: any, filter: (v) => boolean = () => true) {
        return GameHelper.enumStrings(obj).filter(filter).map((val) => new SettingOption(camelCaseToString(val), obj[val]));
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
