import { useMemo, useRef, useEffect } from 'react';

// Like useMemo, but calls `disposer` on the previously memoized values when they're replaced
export default function useMemoWithDisposer<T>(
    memoizer: () => T,
    disposer: (t: T) => void,
    deps: any[] | undefined,
) {
    // Stores the previous value so that it can be disposed
    const memoizedVal = useRef<T | undefined>(undefined);

    // Dispose the last value on unmount
    useEffect(() => () => disposer(memoizedVal.current!), []);

    return useMemo(() => {
        if (memoizedVal.current) { disposer(memoizedVal.current); }
        memoizedVal.current = memoizer();
        return memoizedVal.current;
    }, deps);
}
