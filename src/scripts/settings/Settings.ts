/// <reference path="Setting.ts" />
/// <reference path="BooleanSetting.ts"/>
/// <reference path="MultipleChoiceSetting.ts"/>
/// <reference path="RangeSetting.ts"/>
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
Settings.add(new MultipleChoiceSetting('shopButtons', 'Shop amount buttons:',
    [
        new SettingOption('+10, +100', 'original'),
        new SettingOption('+100, +1000', 'bigplus'),
        new SettingOption('×10, ÷10', 'multiplication'),
    ],
    'original'
));
Settings.add(new BooleanSetting('showCurrencyGainedAnimation', 'Show currency gained animation', true));
Settings.add(new MultipleChoiceSetting('backgroundImage', 'Background image:',
    [
        new SettingOption('Day', 'background-day'),
        new SettingOption('Night', 'background-night'),
        new SettingOption('Dynamic', 'background-dynamic'),
    ],
    'background-day'
));
Settings.add(new MultipleChoiceSetting('eggAnimation', 'Egg Hatching Animation:',
    [
        new SettingOption('None', 'none'),
        new SettingOption('Almost & fully ready', 'almost'),
        new SettingOption('Fully ready', 'full'),
    ],
    'full'
));
Settings.add(new MultipleChoiceSetting('hideHatchery', 'Hide Hatchery Modal:',
    [
        new SettingOption('Never', 'never'),
        new SettingOption('Egg Slots Full', 'egg'),
        new SettingOption('Queue Slots Full', 'queue'),
    ],
    'queue'
));

// Other settings
Settings.add(new BooleanSetting('disableAutoDownloadBackupSaveOnUpdate', 'Disable automatic backup save downloading when game updates', false));


// Sound settings
Object.values(NotificationConstants.NotificationSound).forEach(sound => {
    Settings.add(new BooleanSetting(`sound.${sound.name}`, sound.name, true));
});
Settings.add(new RangeSetting('sound.volume', 'Volume', 0, 100, 1, 100));

// Notification settings
Object.values(NotificationConstants.NotificationSetting).forEach(setting => {
    Settings.add(setting);
});

/*
 * THESE SETTINGS ARE NOT SUPPOSED TO BE IN THE SETTINGS MENU
 */
const sortsettings = Object.keys(SortOptionConfigs).map(
    function(opt) {
        return new SettingOption(SortOptionConfigs[opt].text, parseInt(opt, 10));
    }
);
Settings.add(new MultipleChoiceSetting('partySort', 'Sort:',
    sortsettings,
    SortOptions.id
));
Settings.add(new BooleanSetting('partySortDirection', 'reverse', false));

/*
 * SUBSCRIBERS
 */
Settings.getSetting('backgroundImage').observableValue.subscribe(newValue => {
    newValue == 'background-dynamic' ? DynamicBackground.startScene() : DynamicBackground.stopScene();
});
