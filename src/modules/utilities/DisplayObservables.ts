import type { Observable } from 'knockout';

enum BootstrapState {
    'hidden' = 'hidden',
    'hide' = 'hide',
    'show' = 'show',
}

function createStateObservable(elemID: string, type: string): Observable<BootstrapState> {
    const obs = ko.observable(BootstrapState.hidden);

    $(document).ready(() => {
        const $elem = $(`#${elemID}`);
        if (!$elem.length) {
            console.error(`${type} ${elemID} not found; cannot create state observable`);
        } else {
            obs(BootstrapState[$elem.hasClass('show') ? 'show' : 'hidden']);
            Object.values(BootstrapState).forEach((st) => {
                $elem.on(`${st}.bs.${type}`, () => obs(st));
            });
        }
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
        // eslint-disable-next-line no-param-reassign
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
