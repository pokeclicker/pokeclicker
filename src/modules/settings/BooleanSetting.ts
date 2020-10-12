import Setting from './Setting';
import SettingOption from './SettingOption';

export default class BooleanSetting extends Setting {
    constructor(name: string, displayName: string, defaultValue: boolean) {
        super(
            name,
            displayName,
            [
                new SettingOption('On', true),
                new SettingOption('Off', false),
            ],
            defaultValue,
        );
    }

    toggle(): void {
        this.set(!this.value);
    }
}
