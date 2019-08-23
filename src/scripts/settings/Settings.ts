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
            console.log(`Setting ${name} does not exist`);
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
        return JSON.stringify(dict);
    }
}

Settings.add(
    new MultipleChoiceSetting('theme', 'Theme',
        [
            new GameConstants.Option('Cerulean', 'cerulean'),
            new GameConstants.Option('Cosmo', 'cosmo'),
            new GameConstants.Option('Cyborg', 'cyborg'),
            new GameConstants.Option('Darkly', 'darkly'),
            new GameConstants.Option('Flatly', 'flatly'),
            new GameConstants.Option('Journal', 'journal'),
            new GameConstants.Option('Litera', 'litera'),
            new GameConstants.Option('Lumen', 'lumen'),
            new GameConstants.Option('Lux', 'lux'),
            new GameConstants.Option('Materia', 'materia'),
            new GameConstants.Option('Minty', 'minty'),
            new GameConstants.Option('Pulse', 'pulse'),
            new GameConstants.Option('Sandstone', 'sandstone'),
            new GameConstants.Option('Simplex', 'simplex'),
            new GameConstants.Option('Sketchy', 'sketchy'),
            new GameConstants.Option('Slate', 'slate'),
            new GameConstants.Option('Solar', 'solar'),
            new GameConstants.Option('Spacelab', 'spacelab'),
            new GameConstants.Option('Superhero', 'superhero'),
            new GameConstants.Option('United', 'united'),
            new GameConstants.Option('Yeti (default)', 'yeti'),
        ],
        'yeti',
    )
);
