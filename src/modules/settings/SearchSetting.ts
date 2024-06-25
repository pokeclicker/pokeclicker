import GameHelper from '../GameHelper';
import Requirement from '../requirements/Requirement';
import Setting from './Setting';

export default class SearchSetting extends Setting<string> {
    public readonly regex: ko.PureComputed<RegExp>;

    constructor(
        name: string,
        displayName: string,
        defaultValue: string,
        requirement: Requirement = undefined,
        saveAsDefault: boolean = true,
    ) {
        super(
            name,
            displayName,
            [],
            defaultValue,
            requirement,
            saveAsDefault,
        );

        this.regex = ko.pureComputed(() => {
            return GameHelper.safelyBuildRegex(this.observableValue());
        });
    }
}
