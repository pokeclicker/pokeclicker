class ArrayOfObservables<T> extends Array<T> implements Array<T> {

    private _array: Array<KnockoutObservable<T>>;

    constructor(protected array: T[]) {
        super();
        this._array = this.array.map((el) => {
            return ko.observable(el)
        });
        return new Proxy(this._array, ArrayOfObservables.proxyHandler);
    }

    static proxyHandler = {
        get: function (target: any, prop: string) {
            if (ko.isObservable(target[prop])) {
                return target[prop]();
            } else {
                return Reflect.get(target, prop);
            }
        },

        set: function (target: any, prop: string, value: any) {
            if (Array.prototype.hasOwnProperty(prop)) {
                return Reflect.set(target, prop, value)
            }

            if (ko.isObservable(target[prop])) {
                target[prop](value);
            } else {
                target[prop] = ko.observable(value);
            }

            return true
        },
    }

}
