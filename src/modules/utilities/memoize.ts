/**
 * Wraps a function with a cache of previous results, returns values from cache when possible
 * Resolver can return null to skip caching
 * @param func The function to memoize
 * @param resolver A function to determine cache key from arguments. Defaults to just using the first argument
 * @returns memoized version of func
 */
export default function memoize<T extends unknown[], R>(
    func: (...args: T) => R,
    resolver = (...args: T) => args[0],
): (...args: T) => R {
    const cache = new Map();
    const memoized = (...args: T) => {
        const key = resolver(...args);

        if (key !== null && cache.has(key)) {
            return cache.get(key);
        }

        const val = func(...args);
        if (key !== null) cache.set(key, val);

        return val;
    };

    return memoized;
}
