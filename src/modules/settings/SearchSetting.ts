import GameHelper from '../GameHelper';
import Setting from './Setting';

export default class SearchSetting extends Setting<string> {
    public readonly regex: ko.PureComputed<RegExp>;

    constructor(name: string, displayName: string, defaultValue: string) {
        super(
            name,
            displayName,
            [],
            defaultValue,
        );

        this.regex = ko.pureComputed(() => {
            return GameHelper.safelyBuildRegex(this.observableValue());
        });
    }
}
