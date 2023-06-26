import Setting from './Setting';
import Requirement from '../requirements/Requirement';

export default class CssVariableSetting extends Setting<string> {
    constructor(name: string, displayName: string, options = [], defaultValue = '', requirement: Requirement = undefined) {
        // Get the default value from our css
        const defValue = defaultValue || getComputedStyle(document.documentElement).getPropertyValue(`--${name}`) || '';
        super(
            `--${name}`,
            displayName,
            options,
            defValue,
            requirement,
        );

        // Update the value
        this.observableValue.subscribe((newValue) => {
            this.value = newValue === '#ffffff' ? 'transparent' : newValue;
            document.documentElement.style.setProperty(this.name, this.value);
        });
    }
}
