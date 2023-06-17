import Setting from './Setting';
import Requirement from '../requirements/Requirement';

export default class CssVariableSetting extends Setting<string> {
    constructor(name: string, displayName: string, options = [], defaultValue = '', requirements: Requirement[] = []) {
        // Get the default value from our css
        const defValue = defaultValue || getComputedStyle(document.documentElement).getPropertyValue(`--${name}`) || '';
        super(
            `--${name}`,
            displayName,
            options,
            defValue,
            requirements,
        );

        // Update the value
        this.observableValue.subscribe((newValue) => {
            this.value = newValue === '#ffffff' ? 'transparent' : newValue;
            document.documentElement.style.setProperty(this.name, this.value);
        });
    }
}
