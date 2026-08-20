import {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
} from 'knockout';
import SettingOption from './SettingOption';
import Requirement from '../requirements/Requirement';
import GameLoadState from '../utilities/GameLoadState';

export default class Setting<T, TOption = T> {
    protected readonly _observable: KnockoutObservable<T>;
    public readonly observableValue: KnockoutComputed<T>;
    private computedOptions: KnockoutComputed<SettingOption<TOption>[]>;

    // We can't set this up in the constructor because App.translation doesn't exist yet
    private cachedTranslatedName: KnockoutComputed<string>;

    // Leave options array empty to allow all options.
    constructor(
        public name: string,
        private _defaultDisplayName: string,
        private _options: SettingOption<TOption>[] | (() => SettingOption<TOption>[]),
        public defaultValue: T,
        public requirement: Requirement = undefined,
        public saveAsDefault: boolean = true,
    ) {
        this._observable = this.createObservable(this.defaultValue);
        this.set(defaultValue);

        // Redirects writes to the observable to this.set()
        this.observableValue = ko.pureComputed({
            read: this._observable,
            write: (value) => {
                this.set(value);
            },
            owner: this,
        });

        if (typeof this._options === 'function') {
            this.computedOptions = ko.pureComputed(this._options);
        }
    }

    protected createObservable(initial: T): KnockoutObservable<T> {
        return ko.observable(initial);
    }

    get value() {
        return this._observable.peek();
    }

    set value(value: T) {
        this.set(value);
    }

    get options(): SettingOption<TOption>[] {
        return this.computedOptions?.() || this._options as SettingOption<TOption>[];
    }

    set(value: T): void {
        if (this.validValue(value)) {
            this._observable(value);
        } else {
            let stringified = typeof value === 'string' ? `\"${value}\"` : value.toString();
            if (stringified == '[object Object]' && value.constructor?.name) {
                stringified = `${value.constructor.name} object`;
            }
            // eslint-disable-next-line no-console
            console.warn(`${stringified} is not a valid value for setting ${this.name}`);
        }
    }

    validValue(value: T): boolean {
        if (this.options.length === 0) {
            return true;
        }
        for (let i = 0; i < this.options.length; i += 1) {
            // Not a fan of `as unknown` however we don't actually need to worry about
            // type checking here since TOption and T are the same type
            if ((this.options[i].value as unknown) === value) {
                return this.options[i].isUnlocked();
            }
        }
        if (this.computedOptions && !GameLoadState.reachedLoadState(GameLoadState.states.initialized)) {
            // computedOptions might depend on game data that hasn't been loaded yet
            // assume it's fine for now, we'll check it again after initialization
            return true;
        }

        return false;
    }

    isSelected(value: T): KnockoutComputed<boolean> {
        return ko.pureComputed(() => (this._observable() === value), this);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
    isValueUnlocked(value: T): boolean {
        return true;
    }

    isUnlocked(): boolean {
        return this.requirement ? this.requirement.isCompleted() : true;
    }

    getValidOptions(): SettingOption<TOption>[] {
        return this.options.filter((opt) => opt.isUnlocked());
    }

    get displayName(): string {
        if (!this.cachedTranslatedName) {
            this.cachedTranslatedName = App.translation.get(
                this.name,
                'settings',
                { defaultValue: this._defaultDisplayName },
            );
        }
        return this.cachedTranslatedName();
    }

    get defaultDisplayName(): string {
        return this._defaultDisplayName;
    }
}
