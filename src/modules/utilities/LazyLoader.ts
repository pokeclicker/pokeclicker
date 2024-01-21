import { Subscribable, Observable, PureComputed } from 'knockout';
import GameHelper from '../GameHelper';

function createObserver(loader: HTMLElement, doneLoading: { status: boolean }, options: IntersectionObserverInit): { page: Observable<number>, observer: IntersectionObserver } {
    const page = ko.observable(1);

    let visible = false;
    let currentlyLoading = false;
    let lastHeight = 0;

    const loadMore = () => {
        if (visible && !doneLoading.status) {
            currentlyLoading = true;
            let currentHeight = (options.root as HTMLElement).scrollHeight;
            if (lastHeight != currentHeight) {
                // Wait to load subsequent pages until this page's data is actually added to the scrolling element
                GameHelper.incrementObservable(page);
                lastHeight = currentHeight;    
            }
            // Check again in case we don't push the loader off screen
            requestIdleCallback(loadMore, { timeout: 100 });
        } else {
            currentlyLoading = false;
        }
    };

    const callback = (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !currentlyLoading) {
            lastHeight = 0;
            loadMore();
        }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(loader);

    return {
        page,
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

const memo: Record<string, PureComputed<Array<unknown>>> = {};

export default function lazyLoad(key: string, boundNode: Node, list: Subscribable<Array<unknown>>, options?: Partial<LazyLoadOptions>): PureComputed<Array<unknown>> {
    // Get first parent that's not a table element, that's where we'll add the loader element
    const targetElement = boundNode.parentElement.closest(':not(table, thead, tbody, tr, td, th)') as HTMLElement;

    // Only return a memoized lazyList if the associated loader element still exists
    if (memo[key] && targetElement.querySelector(':scope > .lazy-loader-container')) {
        return memo[key];
    }

    const opts = {
        ...defaultOptions,
        ...options,
    };

    // Do this before creating the loader just in case it's not scrollable
    const scrollingParent = findScrollingParent(targetElement, key);

    const loader = createLoaderElem();
    targetElement.append(loader);

    const doneLoading = { status: false };

    const { page } = createObserver(loader, doneLoading, {
        root: scrollingParent,
        rootMargin: opts.triggerMargin,
        threshold: opts.threshold,
    });

    opts.reset?.subscribe(() => page(1));

    const lazyList = ko.pureComputed(() => {
        const lastElem = page() * opts.pageSize;
        const array = list();
        const isDone = lastElem >= array.length;

        if (isDone) {
            loader.style.display = 'none';
        } else {
            loader.style.removeProperty('display');
        }

        return array.slice(0, lastElem);
    });

    memo[key] = lazyList;
    return lazyList;
}
