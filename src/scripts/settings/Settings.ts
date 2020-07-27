/// <reference path="Setting.ts" />
/// <reference path="BooleanSetting.ts"/>
/// <reference path="MultipleChoiceSetting.ts"/>
///<reference path="SortOptions.ts"/>

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
        'yeti'
    )
);
Settings.add(new MultipleChoiceSetting('breedingDisplay', 'Breeding progress display:',
    [
        new GameConstants.Option('Percentage', 'percentage'),
        new GameConstants.Option('Step count', 'stepCount'),
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
Settings.add(new BooleanSetting('disableBerryNotifications', 'Disable berry notifications', false));

/*
 * THESE SETTINGS ARE NOT SUPPOSED TO BE IN THE SETTINGS MENU
 */
const sortsettings = Object.keys(SortOptionConfigs).map(
    function(opt) {
        return new GameConstants.Option(SortOptionConfigs[opt].text, parseInt(opt));
    }
);
Settings.add(new MultipleChoiceSetting('partySort', 'Sort:',
    sortsettings,
    SortOptions.id
));
Settings.add(new BooleanSetting('partySortDirection', 'reverse', false));