import Setting from './Setting';

export default class HotkeySetting extends Setting<string> {
    public prefix = '';
    public suffix = '';

    constructor(name: string, displayName: string, defaultValue = '', settings: { prefix?: string, suffix?: string } = { prefix: '', suffix: '' }) {
        super(
            name,
            displayName,
            [],
            defaultValue,
        );
        this.prefix = settings.prefix || '';
        this.suffix = settings.suffix || '';
    }
}
