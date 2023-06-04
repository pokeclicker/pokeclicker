import { Observable } from 'knockout';
import SettingOption from './SettingOption';
import FilterOption from './FilterOption';

export default class MultiFilterOption<T> extends FilterOption<T[]> {
    constructor(
        displayName: string,
        value: Observable<T[]>,
        optionName = '',
        options: SettingOption<T>[] = [],
    ) {
        super(displayName, value, optionName, options);
    }

    public selectAll() {
        this.value(this.options.map(o => o.value));
    }

    public getSelectedValue() {
        if (this.value().length === 0) {
            return 'None';
        } else if (this.value().length === this.options.length) {
            return 'All';
        } else {
            return this.value().map(val => this.options.find(o => o.value === val)?.text).join('; ');
        }
    }
}
