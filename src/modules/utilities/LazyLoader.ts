import { Subscription, Subscribable, Observable, Computed, PureComputed } from 'knockout';
import GameHelper from '../GameHelper';

function createObserver(loader: HTMLElement, page: Observable<number>, fullyLoaded: { status: boolean },
    options: IntersectionObserverInit): { bindingCallback: () => void, observer: IntersectionObserver } {

    // Loader image currently visible
    let visible = false;
    // Timeout IDs for loading additional pages
    let bindingTimeout;
    let bindingIdleCallback;

    // Load one page of data
    const loadMore = () => {
        if (visible && !fullyLoaded.status) {
            GameHelper.incrementObservable(page);
        }  
    };

    // Called by Knockout's childrenComplete binding
    // Signals that the foreach binding is done updating the lazyList in the DOM and we can load another page if the loader is still onscreen
    const bindingCallback = () => {
        if (!App.isGameLoaded()) {
            // lazyList shouldn't load additional pages before the game starts
            return;
        }
        if (visible) {
            // Don't load immediately on childrenComplete so the observer has time to realize if it's been pushed offscreen
            // Otherwise the list will load two pages of data at once
            // Use setTimeout for a minimum delay, requestIdleCallback on its own can fire too soon
            bindingTimeout = setTimeout(() => {
                bindingIdleCallback = requestIdleCallback(() => loadMore(), { timeout: 100 });
            }, 100);
        }
    };

    // Called whenever the loader becomes more or less than <threshold> visible
    const observerCallback = (entries) => {
        const alreadyLoading = visible;
        visible = entries[0].isIntersecting;
        // Only start loading when the loader first becomes visible, just in case
        if (visible && !alreadyLoading) {
            loadMore();
        }
        // Clear timeouts when the loader is no longer visible, just in case
        if (!visible) {
            clearTimeout(bindingTimeout);
            cancelIdleCallback(bindingIdleCallback);
        }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Wait to observe the loader icon until the game is done loading
    // Otherwise the observer might wind up in an incorrect state
    const loadSub = ko.when(() => App.isGameLoaded(), () => {
        observer.observe(loader);
        loadSub.dispose();
    });

    return {
        bindingCallback,
        observer,
    };
}

function findScrollingParent(element: HTMLElement, key: string): HTMLElement {
    let elem = element;
    while (elem.parentElement) {
        const { overflowY } = window.getComputedStyle(elem);
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return elem;
        }
        elem = elem.parentElement;
    }
    throw new Error(`Could not find scrolling parent for LazyLoader '${key}'`);
}

function createLoaderElem(): HTMLElement {
    const loader = document.createElement('div');
    loader.className = 'lazy-loader-container';
    const loaderImage = document.createElement('img');
    loaderImage.src = 'assets/images/pokeball/Pokeball.svg';
    loaderImage.className = 'loader-pokeball';
    loader.append(loaderImage);
    return loader;
}

export type LazyLoadOptions = {
    triggerMargin: string; // must be px or %
    threshold: number;
    pageSize: number;
    reset?: Subscribable<any> | (() => any); // Whenever this changes, the lazyList will reset to the first page (non-KO functions must evaluate a KO observable)
};

const defaultOptions: LazyLoadOptions = {
    triggerMargin: '10%',
    threshold: 0,
    pageSize: 40,
};

const memo: Record<string, { list: PureComputed<Array<unknown>>, callback: () => void, toDispose: Array<Computed<any> | Subscription> }> = {};

/**
 * Provides a lazy-loading PureComputed slice of an observable array, for use in bindings like foreach, and inserts a loader element
 * into the page to trigger loading more of the underlying array. Computed lists are cached when possible.
 * 
 * @param key - Unique identifier for each list, used for caching
 * @param boundNode - HTML Node the list is bound to. Must be in a scrolling container, and the loader will be added to a non-table parent of this node.
 * @param list - The observable array to lazily load
 * @param options - Optional parameters
 * @param options.pageSize Number of elements per lazy list page, default 40
 * @param options.triggerMargin Trigger margin for IntersectionObserver, default 10%
 * @param options.threshold Threshold for IntersectionObserver, default 0
 * @param options.reset A function to trigger resets to the list. The function can be any Knockout subscribable or a function that evaluates a Knockout subscribable.
 * The list will reset to the first page whenever the output changes, or if reset is subscribable and reset.notifySubscribers() is called.
 * 
 * @return A PureComputed array initially showing the first pageSize elements of the base list.
 */
export function lazyLoad(key: string, boundNode: Node, list: Subscribable<Array<unknown>>, options?: Partial<LazyLoadOptions>): PureComputed<Array<unknown>> {
    // Get first parent that's not a table element, that's where we'll add the loader element
    const targetElement = boundNode.parentElement.closest(':not(table, thead, tbody, tr, td, th)') as HTMLElement;

    if (memo[key]) {
        if (targetElement.querySelector(':scope > .lazy-loader-container')) {
            // Only return a memoized lazyList if the associated loader element still exists
            return memo[key].list;
        } else {
            // Dispose of old subscriptions before making new computeds
            memo[key].toDispose.forEach(sub => sub.dispose());
        }
    }

    memo[key] = {
        list: null,
        callback: null,
        toDispose: [],
    };

    const opts = {
        ...defaultOptions,
        ...options,
    };

    // Do this before adding the loader to the DOM, just in case it's not somewhere scrollable
    const scrollingParent = findScrollingParent(targetElement, key);

    const loader = createLoaderElem();
    targetElement.append(loader);

    // How many sections of the source list are currently loaded 
    const page = ko.observable(1);

    // Track "is the entire source list loaded" in a way that's accessible to createObserver()
    const fullyLoaded = { status: false };

    // Create intersection observer and start watching for loading triggers
    // Returns a callback for Knockout to call whenever the list is done being updated in the DOM
    const { bindingCallback } = createObserver(loader, page, fullyLoaded, {
        root: scrollingParent,
        rootMargin: opts.triggerMargin,
        threshold: opts.threshold,
    });

    memo[key].callback = bindingCallback;

    if (opts.reset) {
        let reset = opts.reset;

        if (!(reset instanceof Function)) {
            throw new Error(`Invalid reset function used for '${key}' lazyLoad`);
        }

        // Wrap reset function in a computed if it's not a Knockout object already
        if (!ko.isObservable(reset)) {
            reset = ko.computed(reset);
            // We made the computed in here, we should dispose of it later
            memo[key].toDispose.push(reset as Computed);
        }

        // Reset the lazyList to its start size on any notification from the reset observable
        const resetSub = (reset as Subscribable).subscribe(() => page(1));
        memo[key].toDispose.push(resetSub);
    }

    // Computed slice of however much of the source list is currently loaded
    const lazyList = ko.pureComputed(() => {
        const lastElem = page() * opts.pageSize;
        const array = list();
        const isDone = lastElem >= array.length;

        fullyLoaded.status = isDone;

        // Hide loader image if there's nothing left to load
        if (isDone) {
            loader.style.display = 'none';
        } else {
            loader.style.removeProperty('display');
        }

        return array.slice(0, lastElem);
    });

    memo[key].list = lazyList;
    memo[key].toDispose.push(lazyList);

    return lazyList;
}

export function lazyLoadCallback(key: string) {
    // Notify a lazyList's handler after a page of data is done rendering, so it can start loading another
    if (memo[key]) {
        memo[key].callback();
    }
}
