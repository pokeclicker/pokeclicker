// eslint-disable-next-line max-classes-per-file
import {
    Subscription as KnockoutSubscription,
    Computed as KnockoutComputed,
} from 'knockout';
import KeyItemType from '../enums/KeyItemType';
import KeyItem from './KeyItem';

export class KeyItemLevel {
    public unlockReq: KnockoutComputed<boolean>;
    public unlocker: KnockoutSubscription;
    public parent: LevelableKeyItem;
    constructor(
        public description: string,
        unlockReq: () => boolean,
        public unlockReward = () => {},
    ) {
        this.unlockReq = ko.computed<boolean>(unlockReq);
        this.unlocker = this.unlockReq.subscribe(() => {
            if (this.unlockReq()) {
                // App.game.keyItems.level(this.name);
            }
        });
    }
}

export default class LevelableKeyItem extends KeyItem {
    levels: Array<KeyItemLevel>;
    level: number;

    constructor(name: KeyItemType, levels: Array<KeyItemLevel>, unlockReq?: () => boolean, isUnlocked = false, unlockReward = () => {}, displayName?: string, level = 0) {
        super(name, undefined, unlockReq, isUnlocked, unlockReward, displayName);
        this.levels = levels;
        this.setLevel(level, false);
    }

    public setLevel(level: number, newLevel = true) {
        if (!newLevel || this.level >= level) {
            return;
        }
        this.level = level;
        this.description = this.levels[level].description;
    }
}
