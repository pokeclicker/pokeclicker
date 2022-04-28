// eslint-disable-next-line max-classes-per-file
import {
    Subscription as KnockoutSubscription,
    Computed as KnockoutComputed,
} from 'knockout';
import KeyItemType from '../enums/KeyItemType';
import KeyItem from './KeyItem';

export class KeyItemLevel {
    public unlockReqComputed: KnockoutComputed<boolean>;
    public unlocker: KnockoutSubscription;
    public parent: LevelableKeyItem;
    constructor(
        public description: string,
        public unlockReq: () => boolean,
    ) {
        this.unlockReqComputed = ko.computed<boolean>(unlockReq);
    }

    public setup(parent: LevelableKeyItem, level: number) {
        this.unlocker = this.unlockReqComputed.subscribe(() => {
            if (this.unlockReqComputed()) {
                parent.setLevel(level);
            }
        });
    }
}

export default class LevelableKeyItem extends KeyItem {
    levels: Array<KeyItemLevel>;
    level: number;
    baseDisplayName: string;

    constructor(name: KeyItemType, levels: Array<KeyItemLevel>, isUnlocked = false, unlockReward = () => {}, displayName?: string, level = 0) {
        super(name, undefined, levels[0].unlockReq, isUnlocked, unlockReward, undefined);
        this.baseDisplayName = displayName;
        this.levels = levels;
        this.levels.forEach((l, i) => l.setup(this, i));
        this.setLevel(level);
    }

    public setLevel(level: number) {
        if (this.level >= level) {
            return;
        }
        for (let i = this.level; i <= level; i++) {
            if (this.levels[i].unlockReqComputed) {
                this.levels[i].unlockReqComputed.dispose();
            }
        }
        this.level = level;
        this.description = this.levels[level].description;
        this.displayName = `${this.baseDisplayName} [Level: ${level + 1}]`;
    }
}
