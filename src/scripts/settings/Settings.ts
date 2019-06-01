/// <reference path="Setting.ts" />
/// <reference path="BooleanSetting.ts"/>
/// <reference path="MultipleChoiceSetting.ts"/>
/// <reference path="FreeChoiceSetting.ts"/>


class Settings {
    static list: Setting[] = [];


    static add(setting: Setting) {
        if (this.list.indexOf(setting) === -1) {
            this.list.push(setting);
        }
    }

    static load(dict) {
        for (let name in dict) {
            let value = dict[name];
            this.setSettingByName(name, value)
        }
    }

    static setSettingByName(name: string, value: any) {
        let setting = this.getSetting(name);
        if (setting) {
            setting.set(value);
        } else {
            Notifier.notify("Setting " + name + " does not exist", GameConstants.NotificationOption.warning);
        }

    }

    static getSetting(name: string) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name == name) {
                return this.list[i]
            }
        }
        return false;
    }

    static save() {
        let dict = {};
        for (let i = 0; i < this.list.length; i++) {
            dict[this.list[i].name] = this.list[i].value;
        }
        console.log(this.list);
        console.log();
        return dict;
    }
}

Settings.add(
    new MultipleChoiceSetting("Theme", "default.css",
        [
            new GameConstants.Option("Default", 'default.css'),
            new GameConstants.Option("Dark Mode", 'dark.css')
        ]
    )
);
Settings.add(new BooleanSetting("Test?", true));
Settings.add(new FreeChoiceSetting("Name", ""));