import FilterOption from './FilterOption';
import Setting from './Setting';

export default class FilterSetting extends Setting<string> {
    constructor(filter: FilterOption) {
        super(filter.optionName, filter.displayName, filter.options, filter.value());
        this.observableValue = filter.value;
        filter.value.subscribe((val) => {
            this.value = val;
        });
    }
}
