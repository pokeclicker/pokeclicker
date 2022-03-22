import useForceUpdate from './useForceUpdate';
import useMemoWithDisposer from './useMemoWithDisposer';

/**
 * Returns the result of a provided function, causing a rerender whenever
 *  any observables read by the function change.
 * @param func A pure function that reads observables to produce a value,
 *      (does not need to be a ko.computed, and probably shouldn't be)
 */
export function useComputed<T>(func: () => T, deps: any[] | undefined) {
    const forceUpdate = useForceUpdate();
    const computed = useMemoWithDisposer(
        () => {
            const c = ko.pureComputed(func);
            c.subscribe(forceUpdate);
            return c;
        },
        (comp) => comp.dispose(),
        deps,
    );
    return computed();
}

export default useComputed;
