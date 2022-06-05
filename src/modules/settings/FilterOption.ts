import { Observable } from 'knockout';
import SettingOption from './SettingOption';

export default class FilterOption<T = any> {
    public displayName: string;
    public value: Observable<T>;
    public optionName: string;
    public options: SettingOption<string>[];

    constructor(displayName: string, value: Observable<T>, optionName?: string, options?: SettingOption<string>[]) {
        this.displayName = displayName;
        this.value = value;
        this.optionName = optionName || '';
        this.options = options || [];
    }
}
