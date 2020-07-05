class ObservableArrayProxy<T> extends Array<T> implements Array<T> {

    private _array: KnockoutObservableArray<T>;

    constructor(protected array: T[]) {
        super();
        this._array = ko.observableArray(this.array);
        return new Proxy(this._array, ObservableArrayProxy.proxyHandler);
    }

    static proxyHandler = {
        get: function (target: any, prop: string) {
            if (target[prop]) { // this lets us use ObservableArray functions like reverse or peek
                return target[prop];
            } else {
                return target()[prop];
            }
        },

        set: function (target: any, prop: string, value: any) {
            target()[prop] = value;

            return true;
        },

        has: function (target: any, prop: string) {
            // This is needed for map, forEach etc to work,
            // because they want to check if target.hasOwnProperty("0") first.
            // The ko function doesn't seem to have any OwnProperties anyway, so no harm here (don't quote me)
            return Reflect.has(target(), prop);
        },
    }

}
