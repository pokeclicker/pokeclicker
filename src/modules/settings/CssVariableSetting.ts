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
        const newVal = value === '#ffffff' ? 'transparent' : value;
        super.set(newVal);
        document.documentElement.style.setProperty(this.name, newVal);
    }

    validValue(value: string): boolean {
        return CSS.supports('color', value) && super.validValue(value);
    }
}
