export default function getArrayOfObservables<T>(input: Array<T>): Array<T> {
    const mapped = input.map((el) => ko.observable(el));

    return new Proxy(mapped, {
        get: (target: any, prop: string) => (
            ko.isObservable(target[prop]) ? target[prop]() : Reflect.get(target, prop)
        ),

        set: (target: any, prop: string, value: any) => {
            if (Array.prototype.hasOwnProperty.call(target, prop)) {
                return Reflect.set(target, prop, value);
            }

            if (ko.isObservable(target[prop])) {
                target[prop](value);
            } else {
                // eslint-disable-next-line no-param-reassign
                target[prop] = ko.observable(value);
            }

            return true;
        },
    });
}
