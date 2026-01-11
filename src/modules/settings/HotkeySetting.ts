import Requirement from '../requirements/Requirement';
import Setting from './Setting';

export default class HotkeySetting extends Setting<string> {
    public prefix = '';
    public suffix = '';

    constructor(
        name: string,
        displayName: string,
        defaultValue = '',
        settings: { prefix?: string, suffix?: string } = { prefix: '', suffix: '' },
        requirement: Requirement = undefined,
    ) {
        super(
            name,
            displayName,
            [],
            defaultValue,
            requirement,
        );
        this.prefix = settings.prefix || '';
        this.suffix = settings.suffix || '';
    }
}
