import Setting from './Setting';

export default class RangeSetting extends Setting<number> {
    constructor(
        name: string,
        displayName: string,
        public minValue: number,
        public maxValue: number,
        public step: number,
        defaultValue: number,
    ) {
        super(
            name,
            displayName,
            undefined,
            defaultValue,
        );
    }

    validValue(value: number): boolean {
        if (!this.isValueUnlocked(value)) {
            return false;
        }
        return (this.minValue === undefined || value >= this.minValue) && (this.maxValue === undefined || value <= this.maxValue);
    }
}
