import GameHelper from '../GameHelper';
import Requirement from '../requirements/Requirement';
import Setting from './Setting';
import type { PureComputed } from 'knockout';

export default class SearchSetting extends Setting<string> {
    public readonly regex: PureComputed<RegExp>;

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
