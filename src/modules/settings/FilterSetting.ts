import FilterOption from './FilterOption';
import Setting from './Setting';

export default class FilterSetting extends Setting<string> {
    constructor(filter: FilterOption<string>) {
        super(filter.optionName, filter.displayName, filter.options, filter.value());
        this.set(filter.value());
        filter.value.subscribe((val) => {
            this.value = val;
        });
        this.observableValue.subscribe((val) => {
            filter.value(val);
        });
    }
}
