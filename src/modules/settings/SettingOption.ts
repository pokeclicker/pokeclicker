export default class SettingOption {
    text: string;
    value: any;

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(text: string, value: any) {
        this.text = text;
        this.value = value;
    }
}
