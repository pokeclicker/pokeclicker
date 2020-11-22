/**
 * Handles storing the state of the machine.
 */
abstract class MachineState implements Saveable {

    saveKey: string;
    defaults: {
        active: false,
    }

    private _active: KnockoutObservable<boolean>;

    constructor() {
        this._active = ko.observable(false);
    }

    /**
     * Handles updating the machine state
     * @param delta The seconds passed
     */
    abstract update(delta: number);

    /**
     * Handles removing the machine from the lab
     */
    abstract remove();

    toJSON(): Record<string, any> {
        return { active: this.active };
    }
    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }
        this.active = json.hasOwnProperty('active') ? json['active'] : false;
    }

    get active(): boolean {
        return this._active();
    }

    set active(value: boolean) {
        this._active(value);
    }
}
