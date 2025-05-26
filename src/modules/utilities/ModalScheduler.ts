import GameLoadState from './GameLoadState';

/**
 * Wraps a function with a cache of previous results, returns values from cache when possible
 * Resolver can return null to skip caching
 * @param func The function to memoize
 * @param resolver A function to determine cache key from arguments. Defaults to just using the first argument
 * @returns memoized version of func
 */
export function withModalsClosed({
    callback,
    modalSelectors = [],
}: {
    callback: () => unknown,
    modalSelectors: string[],
}) {
    if (typeof callback !== 'function') {
        return console.warn('ModalScheduler.withModalsClosed() called without a callback function');
    }

    const checkModals = () => {
        const waitingForModal = modalSelectors.some((selector) => {
            const elems = $(selector).filter('.modal:visible');
            // Open modals found, check again once the first one is closed
            if (elems.length) {
                elems.first().one('hidden.bs.modal', checkModals);
                return true;
            }
        });
        if (!waitingForModal) {
            // No conflicting modals found
            callback();
        }
    };

    // Short delay to let other modals start changing state
    GameLoadState.onRunning(() => {
        setTimeout(checkModals, 10);
    });
}