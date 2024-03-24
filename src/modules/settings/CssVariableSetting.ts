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
    }

    set(value: string) {
        const newValue = value === '#ffffff' ? 'transparent' : value;
        super.set(newValue);
        document.documentElement.style.setProperty(this.name, newValue);
    }
}
