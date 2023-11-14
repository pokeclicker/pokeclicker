import FilterOption from './FilterOption';
import Setting from './Setting';

export default class FilterSetting<U> extends Setting<U> {
    constructor(filter: FilterOption<U>) {
        super(filter.optionName, filter.displayName, filter.options, filter.value());
        this.observableValue = filter.value; // use same observable as the FilterOption
        filter.value.subscribe((val) => {
            this.value = val;
        });
    }
}
