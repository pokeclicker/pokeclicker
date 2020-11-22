class PlacedMachine implements Saveable {

    saveKey: string;
    defaults: {
        x: 0,
        y: 0,
        active: false,
    }

    private _machine: KnockoutObservable<Machine>;

    private _x: KnockoutObservable<number>;
    private _y: KnockoutObservable<number>;

    private _active: KnockoutObservable<boolean>;

    constructor() {
        this._machine = ko.observable<Machine>();
        this._x = ko.observable<number>(this.defaults.x);
        this._y = ko.observable<number>(this.defaults.y);
        this._active = ko.observable<boolean>(this.defaults.active);
    }

    toJSON(): Record<string, any> {
        return {
            x: this.x,
            y: this.y,
            active: this.active,
        };
    }
    fromJSON(json: Record<string, any>): void {
        this.x = json.hasOwnProperty('x') ? json['x'] : this.defaults.x;
        this.y = json.hasOwnProperty('y') ? json['y'] : this.defaults.y;
        this.active = json.hasOwnProperty('active') ? json['active'] : this.defaults.active;
    }

    get x(): number {
        return this._x();
    }

    set x(value: number) {
        this._x(value);
    }

    get y(): number {
        return this._y();
    }

    set y(value: number) {
        this._y(value);
    }

    get active(): boolean {
        return this._active();
    }

    set active(value: boolean) {
        this._active(value);
    }

    get machine(): Machine {
        return this._machine();
    }

    set machine(value: Machine) {
        this._machine(value);
    }
}
