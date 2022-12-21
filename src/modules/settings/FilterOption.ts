import { Observable } from 'knockout';
import SettingOption from './SettingOption';

export default class FilterOption<T = any> {
    constructor(
        public displayName: string,
        public value: Observable<T>,
        public optionName = '',
        public options: SettingOption<string>[] = [],
    ) {}
}
