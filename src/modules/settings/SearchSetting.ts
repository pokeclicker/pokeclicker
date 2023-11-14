import Setting from './Setting';
import GameHelper from '../GameHelper';

export default class SearchSetting extends Setting<string> {
    public regex: ko.PureComputed<RegExp>;

    constructor(name: string, displayName: string, defaultValue: string) {
        super(
            name,
            displayName,
            [],
            defaultValue,
        );

        // Updates the value from user input
        this.observableValue.subscribe(() => {
            this.value = this.observableValue();
        });

        this.regex = ko.pureComputed(() => {
            return GameHelper.safelyBuildRegex(this.observableValue());
        });
    }
}
