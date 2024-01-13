import { Observable, ObservableArray, PureComputed } from 'knockout';
import GameHelper from '../GameHelper';

function createObserver(loader: HTMLElement, doneLoading: { status: boolean }, options: IntersectionObserverInit): { page: Observable<number>, observer: IntersectionObserver } {
    const page = ko.observable(1);

    let visible = false;
    let currentlyLoading = false;

    const loadMore = () => {
        if (visible && !currentlyLoading && !doneLoading.status) {
            currentlyLoading = true;
            GameHelper.incrementObservable(page);

            // keep loading more in case we don't push the loader off screen
            // @ts-ignore
            requestIdleCallback(loadMore, { timeout: 100 });
        } else {
            currentlyLoading = false;
        }
    };

    const callback = (entries) => {
        visible = entries[0].isIntersecting;
        if (visible) {
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

function findScrollingParent(element: HTMLElement): HTMLElement {
    let elem = element;
    while (elem.parentElement) {
        const { overflowY } = window.getComputedStyle(elem);
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return elem;
        }
        elem = elem.parentElement;
    }

    return elem;
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

const memo = new WeakMap<HTMLElement, PureComputed<Array<unknown>>>();

export default function lazyLoad(element: HTMLElement, list: ObservableArray<unknown>, options?: Partial<LazyLoadOptions>): PureComputed<Array<unknown>> {
    if (memo.has(element)) {
        return memo.get(element);
    }

    const opts = {
        ...defaultOptions,
        ...options,
    };

    const loader = createLoaderElem();
    element.parentElement.append(loader);

    const doneLoading = { status: false };

    const { page } = createObserver(loader, doneLoading, {
        root: findScrollingParent(element),
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

    memo.set(element, lazyList);
    return lazyList;
}
