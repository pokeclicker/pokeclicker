import {
    Observable as KnockoutObservable,
    ObservableArray as KnockoutObservableArray,
} from 'knockout';
import Setting from './Setting';
import SettingOption from './SettingOption';
import Requirement from '../requirements/Requirement';
import GameLoadState from '../utilities/GameLoadState';

export default class MultiSelectSetting<T> extends Setting<T[], T> {
    private readonly usesComputedOptions: boolean;

    constructor(
        name: string,
        displayName: string,
        options: SettingOption<T>[] | (() => SettingOption<T>[]),
        defaultValue: T[],
        requirement: Requirement = undefined,
        saveAsDefault: boolean = true,
    ) {
        super(name, displayName, options, defaultValue, requirement, saveAsDefault);
        this.usesComputedOptions = typeof options === 'function';
    }

    protected createObservable(initial: T[]): KnockoutObservable<T[]> {
        return ko.observableArray(initial ? initial.slice() : []);
    }

    // Binding field for multi-select UI
    get observableArray(): KnockoutObservableArray<T> {
        return this._observable as KnockoutObservableArray<T>;
    }

    validValue(value: T[]): boolean {
        if (!Array.isArray(value)) {
            return false;
        }

        const opts = this.options;
        if (!Array.isArray(opts) || opts.length === 0) {
            return true;
        }

        const allValid = value.every((v) => opts.some((opt) => opt.value === v && opt.isUnlocked()));
        if (allValid) {
            return true;
        }

        if (this.usesComputedOptions && !GameLoadState.reachedLoadState(GameLoadState.states.initialized)) {
            return true;
        }

        return false;
    }
}
