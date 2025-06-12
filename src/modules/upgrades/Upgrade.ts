import {
    Observable as KnockoutObservable, PureComputed,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Amount from '../wallet/Amount';

export type UpgradeProperties = {
    name: any;
    displayName: string;
    description: string;

    maxLevel: number;

    upgradeCostList: Amount[];
    bonusList: Array<number | (() => number)>;
    bonusFormat?: (bonus: number) => string;
};

export default class Upgrade implements Saveable {
    private readonly _name: any;
    private readonly _displayName: string;
    private readonly _description: string;
    private readonly _maxLevel: number;
    private readonly _upgradeCostList: Amount[];
    private readonly _bonusList: Array<number | (() => number)>;
    protected readonly _bonusFormat: (bonus: number) => string = undefined;

    defaults = {
        level: 0,
    };
    saveKey: string;

    private _level: KnockoutObservable<number> = ko.observable();

    public isMaxLevel: PureComputed<boolean> = ko.pureComputed(() => this.level >= this._maxLevel);

    constructor(properties: UpgradeProperties) {
        this.saveKey = properties.name;
        this.level = this.defaults.level;

        this._name = properties.name;
        this._displayName = properties.displayName;
        this._description = properties.description;
        this._maxLevel = properties.maxLevel;
        this._upgradeCostList = properties.upgradeCostList;
        this._bonusList = properties.bonusList;
        this._bonusFormat = properties.bonusFormat;
    }

    public calculateCost(level: number = this.level): Amount {
        return this._upgradeCostList[level];
    }

    public calculateBonus(level: number = this.level): number {
        const bonus = this._bonusList[level];
        return typeof bonus === 'function' ? bonus() : bonus;
    }

    public canAfford(level: number = this.level): boolean {
        return App.game.wallet.hasAmount(this.calculateCost(level));
    }

    // Override in subclass when other requirements exist.
    public canBuy(level: number = this.level): boolean {
        return level <= this._maxLevel && this.canAfford(level);
    }

    public buy() {
        if (this.isMaxLevel()) {
            return;
        }

        if (this.canBuy(this.level + 1)) {
            App.game.wallet.loseAmount(this.calculateCost(this.level + 1));
            this.levelUp();
        } else {
            Notifier.notify({
                message: 'You cannot afford to buy this upgrade yet.',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public formatBonus(level: number = this.level): string {
        return this._bonusFormat?.(this.calculateBonus(level)) ?? this.calculateBonus(level).toLocaleString('en-US');
    }

    private levelUp() {
        this.level += 1;
    }

    get name(): any {
        return this._name;
    }

    get displayName(): string {
        return this._displayName;
    }

    get description(): string {
        return this._description;
    }

    get level(): number {
        return this._level();
    }

    set level(value: number) {
        this._level(Math.min(value, this._maxLevel));
    }

    get maxLevel(): number {
        return this._maxLevel;
    }

    toJSON(): Record<string, any> {
        return {
            level: this.level,
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }
        this.level = json.level ?? this.defaults.level;
    }

}
