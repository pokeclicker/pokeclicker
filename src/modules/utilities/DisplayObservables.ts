import type { Observable } from 'knockout';

enum BootstrapState {
    'hidden' = 'hidden',
    'hide' = 'hide',
    'show' = 'show',
}

function subscribeToElemState(elemID: string, type: string, obs: Observable<BootstrapState>) {
    const $elem = $(`#${elemID}`);
    if (!$elem.length) {
        console.error(`DisplayObservables: ${type} ${elemID} not found, cannot subscribe state observable`);
    } else {
        obs(BootstrapState[$elem.hasClass('show') ? 'show' : 'hidden']);
        Object.values(BootstrapState).forEach((st) => {
            $elem.on(`${st}.bs.${type}`, () => obs(st));
        });
    }
}

function createStateObservable(elemID: string, type: string): Observable<BootstrapState> {
    const obs = ko.observable(BootstrapState.hidden);
    $(document).ready(() => {
        subscribeToElemState(elemID, type, obs);
    });
    return obs;
}

function getObservableState(proxyTarget, elemID: string, type: string) {
    let returnObservable = false;
    if (elemID.endsWith('Observable')) {
        returnObservable = true;
        // eslint-disable-next-line no-param-reassign
        elemID = elemID.replace(/Observable$/, '');
    }
    if (!proxyTarget[elemID]) {
        proxyTarget[elemID] = createStateObservable(elemID, type);
    }

    return returnObservable ? (proxyTarget[elemID] as Observable<BootstrapState>) : (proxyTarget[elemID]() as BootstrapState);
}

// eslint-disable-next-line import/prefer-default-export
export const modalState: Record<string, BootstrapState | Observable<BootstrapState>> = new Proxy({}, {
    get(target, modalID: string) {
        return getObservableState(target, modalID, 'modal');
    },
});

// eslint-disable-next-line import/prefer-default-export
export const collapseState: Record<string, BootstrapState | Observable<BootstrapState>> = new Proxy({}, {
    get(target, collapseID: string) {
        return getObservableState(target, collapseID, 'collapse');
    },
});

/*
    Disabling optional modules like the farmDisplay breaks the state tracking by removing the events set up in subscribeToElemState()
    This detects any collapsibles within optional modules and reattaches the tracking events when the modules are re-enabled
    Optional modules should be given the class pokeclicker-optional-module
*/
$(document).ready(() => {
    document.querySelectorAll('.pokeclicker-optional-module [data-toggle="collapse"]').forEach(collapseButton => {
        const collapseID = collapseButton.getAttribute('href')?.substring(1);
        if (!collapseID) {
            return console.error('DisplayObservables: Cannot detect collapse state within an optional module without a static collapse target ID');
        }
        const stateObservable = collapseState[`${collapseID}Observable`] as Observable<BootstrapState>;
        // The collapse target should ideally be a direct child of the optional module's root element
        // to save on the overhead of scanning every addition/removal across the entire subtree
        const moduleContainer = document.getElementById(collapseID).closest('.pokeclicker-optional-module');
        const isDirectChild = document.getElementById(collapseID).parentElement === moduleContainer;
        const moduleObserver = new MutationObserver((records) => {
            let added = false;
            let removed = false;
            records.forEach(r => {
                added ||= Array.from(r.addedNodes).some(n => n instanceof Element && (n.id === collapseID || (!isDirectChild && n.querySelector(`#${collapseID}`))));
                removed ||= Array.from(r.removedNodes).some(n => n instanceof Element && (n.id === collapseID || (!isDirectChild && n.querySelector(`#${collapseID}`))));
            });
            if (added && document.getElementById(collapseID)) {
                subscribeToElemState(collapseID, 'collapse', stateObservable);
            } else if (removed) {
                stateObservable(BootstrapState.hidden);
            }
        });
        moduleObserver.observe(moduleContainer, {
            subtree: !isDirectChild,
            childList: true,
        });
    });

});
