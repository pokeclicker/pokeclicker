import Requirement from '../requirements/Requirement';
import Setting from './Setting';

export default class OrderSetting<T> extends Setting<T[]> {
    constructor(
        name: string,
        displayName: string,
        defaultValue: T[],
        requirement: Requirement = undefined,
        saveAsDefault: boolean = true,
    ) {
        super(
            name,
            displayName,
            [],
            defaultValue,
            requirement,
            saveAsDefault,
        );
    }

    validValue(value: T[]): boolean {
        const all = new Set(value);
        return value.length === this.defaultValue.length && this.defaultValue.every(v => all.has(v));
    }
}
