export function findRight<T>(
    arr: Array<T>,
    pred: (elem: T, index: number, arr: Array<T>) => boolean,
): T | undefined {
    if (!arr.length) {
        return undefined;
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        if (pred(arr[i], i, arr)) {
            return arr[i];
        }
    }

    return undefined;
}
