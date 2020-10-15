export default class SettingOption<T> {
    text: string;
    value: T;

    constructor(text: string, value: T) {
        this.text = text;
        this.value = value;
    }
}
