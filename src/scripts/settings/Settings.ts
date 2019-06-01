/// <reference path="Setting.ts" />
/// <reference path="BooleanSetting.ts"/>
/// <reference path="MultipleChoiceSetting.ts"/>

class Settings {
    static list: Setting[] = [];


    static add(setting: Setting) {
        if (!this.getSetting(setting.name)) {
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
        };
    }

    static save() {
        let dict = {};
        for (let i = 0; i < this.list.length; i++) {
            dict[this.list[i].name] = this.list[i].value;
        }
        return JSON.stringify(dict);
    }
}

Settings.add(
    new MultipleChoiceSetting("theme", "Theme",
        [
            new GameConstants.Option("Default", 'default.css'),
            new GameConstants.Option("Dark Mode", 'dark.css')
        ],
        "default.css",
    )
);
Settings.add(
    new BooleanSetting("use_pokemon_gifs", "Pokemon Gifs",
        false,
    )
);