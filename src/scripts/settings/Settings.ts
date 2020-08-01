/// <reference path="Setting.ts" />
/// <reference path="BooleanSetting.ts"/>
/// <reference path="MultipleChoiceSetting.ts"/>
/// <reference path="SortOptions.ts"/>

class Settings {
    static list: Setting[] = [];


    static add(setting: Setting) {
        if (!this.getSetting(setting.name)) {
            this.list.push(setting);
        }
    }

    static load(dict) {
        for (const name in dict) {
            const value = dict[name];
            this.setSettingByName(name, value);
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

    static getSetting(name: string): Setting {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name == name) {
                return this.list[i];
            }
        }
        return null;
    }

    static save() {
        const dict = {};
        for (let i = 0; i < this.list.length; i++) {
            dict[this.list[i].name] = this.list[i].value;
        }
        return JSON.stringify(dict);
    }
}

/*
 * THESE SETTINGS SHOULD ALL BE PUT IN SETTINGS MENU
 */

//Display settings
Settings.add(
    new MultipleChoiceSetting('theme', 'Theme',
        [
            new SettingOption('Cerulean', 'cerulean'),
            new SettingOption('Cosmo', 'cosmo'),
            new SettingOption('Cyborg', 'cyborg'),
            new SettingOption('Darkly', 'darkly'),
            new SettingOption('Flatly', 'flatly'),
            new SettingOption('Journal', 'journal'),
            new SettingOption('Litera', 'litera'),
            new SettingOption('Lumen', 'lumen'),
            new SettingOption('Lux', 'lux'),
            new SettingOption('Materia', 'materia'),
            new SettingOption('Minty', 'minty'),
            new SettingOption('Pulse', 'pulse'),
            new SettingOption('Sandstone', 'sandstone'),
            new SettingOption('Simplex', 'simplex'),
            new SettingOption('Sketchy', 'sketchy'),
            new SettingOption('Slate', 'slate'),
            new SettingOption('Solar', 'solar'),
            new SettingOption('Spacelab', 'spacelab'),
            new SettingOption('Superhero', 'superhero'),
            new SettingOption('United', 'united'),
            new SettingOption('Yeti (default)', 'yeti'),
        ],
        'yeti'
    )
);
Settings.add(new MultipleChoiceSetting('breedingDisplay', 'Breeding progress display:',
    [
        new SettingOption('Percentage', 'percentage'),
        new SettingOption('Step count', 'stepCount'),
    ],
    'percentage'
));
Settings.add(new BooleanSetting('showCurrencyGainedAnimation', 'Show currency gained animation', true));

// Other settings
Settings.add(new BooleanSetting('disableAutoDownloadBackupSaveOnUpdate', 'Disable automatic backup save downloading when game updates', false));


// Sound settings
Settings.add(new BooleanSetting('sound.Achievement', 'New achievement', true));
Settings.add(new BooleanSetting('sound.New Catch', 'New pokemon/shiny captured', true));
Settings.add(new BooleanSetting('sound.Shiny', 'Shiny encountered', true));
Settings.add(new BooleanSetting('sound.Ready to Hatch', 'Egg ready to hatch', true));

// Notification settings
Object.values(GameConstants.NotificationSetting).forEach(setting => {
    Settings.add(setting);
});

/*
 * THESE SETTINGS ARE NOT SUPPOSED TO BE IN THE SETTINGS MENU
 */
const sortsettings = Object.keys(SortOptionConfigs).map(
    function(opt) {
        return new SettingOption(SortOptionConfigs[opt].text, parseInt(opt));
    }
);
Settings.add(new MultipleChoiceSetting('partySort', 'Sort:',
    sortsettings,
    SortOptions.id
));
Settings.add(new BooleanSetting('partySortDirection', 'reverse', false));