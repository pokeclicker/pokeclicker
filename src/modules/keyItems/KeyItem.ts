import {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
    Subscription as KnockoutSubscription,
} from 'knockout';
import KeyItemType from '../enums/KeyItemType';
import * as GameConstants from '../GameConstants';

export default class KeyItem {
    public id: KeyItemType;
    public displayName: string;
    public description: string;
    public unlockReq: KnockoutComputed<boolean>;
    public unlocker: KnockoutSubscription;
    public isUnlocked: KnockoutObservable<boolean>;

    constructor(id: KeyItemType, description: string, unlockReq?: () => boolean, isUnlocked = false,
        public unlockRewardOnClose = () => {},
        displayName?: string,
        public unlockRewardOnUnlock = () => {}) {
        this.id = id;
        this.displayName = displayName ?? GameConstants.humanifyString(KeyItemType[this.id]);
        this.description = description;
        this.isUnlocked = ko.observable(isUnlocked ?? false);

        if (this.isUnlocked() || typeof unlockReq !== 'function') {
            this.unlockReq = null;
            return;
        }
        // This computed is disposed by unlock()
        this.unlockReq = ko.computed<boolean>(unlockReq);
        this.unlocker = this.unlockReq.subscribe(() => {
            if (this.unlockReq()) {
                App.game.keyItems.gainKeyItem(this.id);
            }
        });
    }

    unlock() {
        this.isUnlocked(true);
        if (this.unlocker) {
            this.unlocker.dispose();
        }
    }
}
