import {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
    Observable,
} from 'knockout';
import SettingOption from './SettingOption';
import Requirement from '../requirements/Requirement';

export default abstract class BaseSetting<T, S> {
    value: T;
    observableValue: KnockoutObservable<T>;

    // We can't set this up in the constructor because App.translation doesn't exist yet
    private cachedTranslatedName: KnockoutComputed<string>;

    // Leave options array empty to allow all options.
    constructor(
        public name: string,
        private defaultDisplayName: string,
        public options: SettingOption<S>[],
        public defaultValue: T,
        public requirement : Requirement = undefined,
    ) {
        this.observableValue = ko.observable(this.defaultValue);
        this.set(defaultValue);
    }

    set(value: T): void {
        if (this.validValue(value)) {
            this.value = value;
            this.observableValue(value);
        } else {
            // eslint-disable-next-line no-console
            console.warn(`${value} is not a valid value for setting ${this.name}`);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
    validValue(value: T): boolean {
        return false;
    }
    
    isSelected(value: T): KnockoutComputed<boolean> {
        return ko.pureComputed(() => (this.observableValue() === value), this);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
    isValueUnlocked(value: T): boolean { 
        return true;
    }

    isUnlocked(): boolean {
        return this.requirement ? this.requirement.isCompleted() : true;
    }

    getValidOptions() {
        return this.options.filter((opt) => opt.isUnlocked());
    }

    get displayName(): string {
        if (!this.cachedTranslatedName) {
            this.cachedTranslatedName = App.translation.get(
                this.name,
                'settings',
                { defaultValue: this.defaultDisplayName },
            );
        }
        return this.cachedTranslatedName();
    }

    subscribeToVal(value: Observable<T>): void {
        this.observableValue = value;
        value.subscribe((val) => {
            this.value = val;
        });
    }
}
