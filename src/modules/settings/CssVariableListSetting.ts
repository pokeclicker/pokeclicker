import Setting from './Setting';

export default class CssVariableListSetting extends Setting<string> {
    constructor(name: string, displayName: string, options = [], defaultValue = '') {
        // Get the default value from our css
        const defValue = defaultValue || getComputedStyle(document.documentElement).getPropertyValue(`--${name}`) || '';
        super(
            `--${name}`,
            displayName,
            options,
            defValue,
        );

        // Update the value
        this.observableValue.subscribe((val) => {
            document.documentElement.style.setProperty(this.name, val);
        });
    }
}
