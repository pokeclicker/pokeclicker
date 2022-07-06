import {
    Observable as KnockoutObservable,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Amount from '../wallet/Amount';

export default class Upgrade implements Saveable {
    defaults = {
        level: 0,
    };
    saveKey: string;

    levelKO: KnockoutObservable<number> = ko.observable();

    constructor(
        public name: any,
        public displayName: string,
        public maxLevel: number,
        // Optional array of costs
        public costList: Amount[] = [],
        // Optional array of benefits
        public bonusList: number[] = [],
        // Describes whether this upgrade increases or decreases a number.
        // (e.g. power is increasing, time is decreasing).
        public increasing = true,
    ) {
        this.saveKey = name;
        this.level = this.defaults.level;
    }

    calculateCost(): Amount {
        return this.costList[this.level];
    }

    // Override with a custom function
    calculateBonus(level: number = this.level): number {
        return this.bonusList[level];
    }

    upgradeBonus() {
        if (!this.isMaxLevel()) {
            return this.calculateBonus(this.level + 1) - this.calculateBonus(this.level);
        }
        return 0;
    }

    isMaxLevel() {
        return this.level >= this.maxLevel;
    }

    canAfford(): boolean {
        return App.game.wallet.hasAmount(this.calculateCost());
    }

    // Override in subclass when other requirements exist.
    canBuy(): boolean {
        return this.level < this.maxLevel && this.canAfford();
    }

    buy() {
        if (this.canBuy()) {
            App.game.wallet.loseAmount(this.calculateCost());
            this.levelUp();
        } else {
            Notifier.notify({
                message: 'You cannot afford to buy this upgrade yet.',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    levelUp() {
        this.level += 1;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }
        this.level = json.level ?? this.defaults.level;
    }

    toJSON(): Record<string, any> {
        return {
            level: this.level,
        };
    }

    // Knockout getters/setters
    get level(): number {
        return this.levelKO();
    }

    set level(value) {
        this.levelKO(Math.min(value, this.maxLevel));
    }
}
