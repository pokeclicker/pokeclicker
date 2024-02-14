import { Subscribable, Observable, PureComputed } from 'knockout';
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
    observer.observe(loader);

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
    reset?: Observable; // Whenever this changes, the page will reset to the first page
};

const defaultOptions: LazyLoadOptions = {
    triggerMargin: '10%',
    threshold: 0,
    pageSize: 40,
};

const memo: Record<string, { list: PureComputed<Array<unknown>>, callback: () => void }> = {};

export function lazyLoad(key: string, boundNode: Node, list: Subscribable<Array<unknown>>, options?: Partial<LazyLoadOptions>): PureComputed<Array<unknown>> {
    // Get first parent that's not a table element, that's where we'll add the loader element
    const targetElement = boundNode.parentElement.closest(':not(table, thead, tbody, tr, td, th)') as HTMLElement;

    // Only return a memoized lazyList if the associated loader element still exists
    if (memo[key] && targetElement.querySelector(':scope > .lazy-loader-container')) {
        return memo[key].list;
    }

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

    // Reset the lazyList to its start size on any notification from the reset observable
    opts.reset?.subscribe(() => page(1));

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

    // Memoize the computed list and associated callback
    memo[key] = {
        list: lazyList,
        callback: bindingCallback,
    };

    return lazyList;
}

export function lazyLoadCallback(key: string) {
    // Notify a lazyList's handler after a page of data is done rendering, so it can start loading another
    if (memo[key]) {
        memo[key].callback();
    }
}
