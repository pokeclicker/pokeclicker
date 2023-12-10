import {
    Computed as KnockoutComputed,
} from 'knockout';
import Requirement from '../requirements/Requirement';
import SettingOption from './SettingOption';

export default class SettingOptionTranslate<T> extends SettingOption<T> {

    // We can't set this up in the constructor because App.translation doesn't exist yet
    private cachedTranslatedName: KnockoutComputed<string>;

    constructor(
        public name: string,
        private _defaultDisplayName: string,
        public value: T,
        public requirement?: Requirement,
    ) {
        super(_defaultDisplayName, value, requirement);
    }

    get text(): string {
        if (!this.cachedTranslatedName) {
            this.cachedTranslatedName = App.translation.get(
                this.name,
                'settings',
                { defaultValue: this._defaultDisplayName },
            );
        }
        return this.cachedTranslatedName();
    }
}
