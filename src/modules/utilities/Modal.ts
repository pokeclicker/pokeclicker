import type { Observable } from 'knockout';

enum ModalState {
    'hidden' = 'hidden',
    'hide' = 'hide',
    'show' = 'show',
}

function createStateObservable(modalID: string): Observable<ModalState> {
    const obs = ko.observable(ModalState.hidden);

    $(document).ready(() => {
        const $modal = $(`#${modalID}`);
        if (!$modal.length) {
            console.error(`Modal ${modalID} not found; cannot create state observable`);
        } else {
            obs(ModalState[$modal.hasClass('show') ? 'show' : 'hidden']);
            Object.values(ModalState).forEach((st) => {
                $modal.on(`${st}.bs.modal`, () => obs(st));
            });
        }
    });

    return obs;
}

// eslint-disable-next-line import/prefer-default-export
export const observableState: Record<string, ModalState> = new Proxy({}, {
    get(target, modalID: string) {
        let returnObservable = false;
        if (modalID.endsWith('Observable')) {
            returnObservable = true;
            // eslint-disable-next-line no-param-reassign
            modalID = modalID.replace(/Observable$/, '');
        }
        if (!target[modalID]) {
            // eslint-disable-next-line no-param-reassign
            target[modalID] = createStateObservable(modalID);
        }

        return returnObservable ? target[modalID] : target[modalID]();
    },
});
