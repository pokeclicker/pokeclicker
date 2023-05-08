import BaseSetting from './BaseSetting';

export default class MultiSetting<T> extends BaseSetting<T[], T> {
    private _optionValues: Set<T>;
    private selectedValues = ko.pureComputed(() => {
        return this.observableValue().reduce((set, v) => set.add(v), new Set<T>());
    });

    validValue(value: T[]): boolean {
        if (!this.isUnlocked(value)) {
            return false;
        }

        for (let i = 0; i < value.length; i += 1) {
            if (!this.optionValues.has(value[i])) {
                return false;
            }
        }

        return true;
    }

    protected isSelected(value: T): boolean {
        return this.selectedValues().has(value);
    }

    public displayValue(): string {
        const selected = this.observableValue();

        if (selected.length === 0) {
            return 'None';
        }

        if (selected.length === 1) {
            return this.getOption(selected[0]).text;
        }

        if (selected.length === this.optionValues.size) {
            return 'All';
        }

        return `${selected.length} Selected`;
    }

    public select(value: T) {
        if (this.optionValues.has(value)) {
            const newValue = [...this.observableValue(), value];
            this.set(newValue);
        }
    }

    public deselect(value: T) {
        const newValue = this.observableValue().filter((v) => v !== value);
        this.set(newValue);
    }

    public toggle(value: T) {
        if (this.isSelected(value)) {
            this.deselect(value);
        } else {
            this.select(value);
        }
    }

    public toggleAll() {
        const newValue = this.observableValue().length === this.optionValues.size
            ? []
            : [...this.optionValues];
        this.set(newValue);
    }

    get optionValues(): Set<T> {
        if (!this._optionValues) {
            this._optionValues = this.options.reduce((set, o) => set.add(o.value), new Set<T>());
        }
        return this._optionValues;
    }
}
