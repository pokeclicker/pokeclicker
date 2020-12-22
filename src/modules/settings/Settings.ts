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

    static load(dict) {
        Object.entries(dict || {})?.forEach(([name, value]) => this.setSettingByName(name, value));
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

    static save() {
        const dict = this.list.reduce((_dict, setting) => Object.assign(_dict, { [setting.name]: setting.value }), {});
        return JSON.stringify(dict);
    }

    static enumToSettingOptionArray(obj: any, filter: (v) => boolean = () => true) {
        return GameHelper.enumStrings(obj).filter(filter).map((val) => new SettingOption(camelCaseToString(val), `${obj[val]}`));
    }
}
