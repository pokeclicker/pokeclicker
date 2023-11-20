import Setting from './Setting';

export default class FilterSetting<U> extends Setting<U> {
    constructor(...options: ConstructorParameters<typeof Setting<U>>) {
        super(...options);
        this.observableValue.subscribe((val) => {
            this.set(val);
        });
    }
}
