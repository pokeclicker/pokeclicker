import Setting from './Setting';

export default class CssVariableSetting extends Setting<string> {
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
        this.observableValue.subscribe((newValue) => {
            this.value = newValue === '#ffffff' ? 'transparent' : newValue;
            document.documentElement.style.setProperty(this.name, this.value);
        });
    }
}
