import GameHelper from '../GameHelper';
import FilterSetting from './FilterSetting';
import { PureComputed } from 'knockout';

export default class SearchSetting extends FilterSetting<string> {
    public regex: ko.PureComputed<RegExp>;

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
