/**
 * window.requestIdleCallback()
 * version 0.0.0
 * Browser Compatibility:
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback#browser_compatibility
 */
if (!(window as any).requestIdleCallback) {
    Object.assign(<any>window, {
        requestIdleCallback(callback, options = { timeout: 0 }): any {
            const relaxation = 1;
            const timeout = options.timeout || relaxation;
            const start = performance.now();
            return setTimeout(() => {
                callback({
                    get didTimeout() {
                        return options.timeout ? false : (performance.now() - start) - relaxation > timeout;
                    },
                    timeRemaining() {
                        return Math.max(0, relaxation + (performance.now() - start));
                    },
                });
            }, relaxation);
        },
    });
}

/**
* window.cancelIdleCallback()
* version 0.0.0
* Browser Compatibility:
* https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback#browser_compatibility
*/
if (!(window as any).cancelIdleCallback) {
    Object.assign(<any>window, {
        cancelIdleCallback(id) {
            clearTimeout(id);
        },
    });
}

/**
* window.requestAnimationFrame()
* version 0.0.0
* Browser Compatibility:
* https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#browser_compatibility
*/
if (!window.requestAnimationFrame) {
    Object.assign(<any>window, {
        requestAnimationFrame(callback): any {
            return window.setTimeout(() => {
                callback(Date.now());
            }, 1000 / 60);
        },
    });
}

/**
* window.cancelAnimationFrame()
* version 0.0.0
* Browser Compatibility:
* https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame#browser_compatibility
*/
if (!window.cancelAnimationFrame) {
    Object.assign(<any>window, {
        cancelAnimationFrame(id) {
            clearTimeout(id);
        },
    });
}
