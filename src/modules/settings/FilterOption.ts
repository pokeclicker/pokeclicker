import { Observable } from 'knockout';
import SettingOption from './SettingOption';

export default class FilterOption<T = any> {
    [key: string]: any;

    constructor(
        public displayName: string,
        public value: Observable<T>,
        public optionName = '',
        public options: SettingOption<T>[] = [],
        computedProperties: Record<string, (() => any)> = {},
    ) {
        Object.entries(computedProperties).forEach(([key, callback]) => {
            this[key] = ko.pureComputed(callback, this);
        });
    }
}
