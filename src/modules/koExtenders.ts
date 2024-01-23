/// <reference path="./koExtenders.d.ts" />

import type { Subscribable, Observable, Computed } from 'knockout';

/*
    WARNING: Avoid importing local modules here at all costs!

    This file absolutely must be loaded before these extenders can be used elsewhere. The compiler cannot
    detect dependencies on these extenders on its own and attempts to use them before this file loads
    will fail silently. Local imports here would make the evaluation order unpredictable and unstable;
    minor commits could break unrelated parts of the game. This is a nightmare to debug! Don't do it!

    When using these extenders in a module, import this file to ensure proper dependency tracking.
*/

// Only numeric values allowed - usage: ko.observable(0).extend({ numeric: 0 });
const numericExtender = (target: Subscribable, precision: number) => {
    // create a writable computed observable to intercept writes to our observable
    const result = ko.pureComputed<number>({
        read: target, // always return the original observable's value
        write: (newValueRaw: string | number) => {
            const newValue = Number(newValueRaw);
            if (Number.isNaN(newValue)) { return; }

            const current = target();
            const roundingMultiplier = 10 ** precision;
            const valueToWrite = Math.round(newValue * roundingMultiplier) / roundingMultiplier;

            // only write if it changed
            if (valueToWrite !== current) {
                target(valueToWrite);
            } else if (newValue !== current) {
                // if the rounded value is the same, but a different value was
                // written, force a notification for the current field
                target.notifySubscribers(valueToWrite);
            }
        },
    }).extend({ notify: 'always' });

    // initialize with current value to make sure it is rounded appropriately
    result(target());

    // return the new computed observable
    return result;
};

const booleanExtender = (target: Subscribable) => {
    // create a writable computed observable to intercept writes to our observable
    const result = ko.pureComputed<boolean>({
        read: target, // always return the original observable's value
        write: (newValueRaw: boolean) => {
            target(!!newValueRaw);
        },
    }).extend({ notify: 'always' });

    // initialize with current value to make sure it is rounded appropriately
    result(target());

    // return the new computed observable
    return result;
};

// Don't treat shallowly-equal arrays as new values, i.e. don't notify subscribers
// Usage: ko.observable([]).extend({ arrayEquals: true });
const arrayEqualsExtender = (target: Observable<any[]> | Computed<any[]>) => {
    const defaultComparer = target.equalityComparer;
    target.equalityComparer = function (a, b) {
        if (Array.isArray(a) && Array.isArray(b)) {
            // Compare arrays by element
            return a.length === b.length && a.every((x, i) => x === b[i]);
        }
        // Default comparator always treats non-primitive values as changed
        return defaultComparer(a, b);
    };
    return target;
};

// A modified version of the rateLimit extender that can be forced to evaluate early
// Usage: const example = ko.pureComputed(() => { whatever }).extend({ skippableRateLimit: GameConstants.WEEK });
//        example.evaluateEarly();
const skippableRateLimitExtender = (target: Subscribable, delay: number): typeof target & SkippableRateLimit => {
    // Custom rate limiter function, see https://knockoutjs.com/documentation/rateLimit-observable.html#custom-rate-limit-methods
    const skippableLimiter = (callback, timeout) => {
        var timeoutInstance = null;
        var skipNextLimit = false;

        const startEvaluation = () => {
            timeoutInstance = null;
            skipNextLimit = false;
            // Starts target evaluation
            callback();
        };

        // Method added to the target observable to force evaluation
        const evaluateEarly = () => {
            if (timeoutInstance) {
                // Already rate-limited, evaluate now
                clearTimeout(timeoutInstance);
                startEvaluation();
            } else {
                // Not yet rate-limited, be ready to skip the limit
                // (This often happens when waiting for subscription notifications to propogate or for a dependency to reevaluate)
                skipNextLimit = true;
            }
        };
        Object.assign(target, { evaluateEarly });

        // Called to start pre-evaluation delay when a dependency updates
        const startRateLimit = () => {
            // Do nothing if already rate-limited
            if (!timeoutInstance) {
                if (skipNextLimit) {
                    // Skipping rate limit this time and going straight to evaluation
                    startEvaluation();
                } else {
                    // Start rate limit delay
                    timeoutInstance = setTimeout(startEvaluation, timeout);
                }
            }
        };
        return startRateLimit;
    };

    // Add rate limit using our custom limiter
    return target.extend({ rateLimit: { timeout: delay, method: skippableLimiter } }) as typeof target & SkippableRateLimit;
};

Object.assign(ko.extenders, {
    numeric: numericExtender,
    boolean: booleanExtender,
    arrayEquals: arrayEqualsExtender,
    skippableRateLimit: skippableRateLimitExtender,
});