import {
    Observable as KnockoutObservable,
} from 'knockout';
import Amount from '../wallet/Amount';
import Upgrade from './Upgrade';

/**
 * An upgrade that requires experience to level up.
 */
export default class ExpUpgrade extends Upgrade {
    defaults = {
        level: 0,
        exp: 0,
    };

    expList: number[];

    private expKO: KnockoutObservable<number>;

    constructor(name: any, displayName: string, maxLevel: number, expList: number[], costList: Amount[], bonusList: number[], increasing: boolean) {
        super(name, displayName, maxLevel, costList, bonusList, increasing);
        this.expList = expList;
        this.expKO = ko.observable(0);
    }

    gainExp(exp: number) {
        this.exp = Math.min(this.expList[this.level], this.exp + exp);
    }

    canBuy(): boolean {
        return super.canBuy() && this.hasEnoughExp();
    }

    hasEnoughExp() {
        return this.exp >= this.expList[this.level];
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json.exp = this.exp;
        return json;
    }

    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        this.exp = json.exp ?? this.defaults.exp;
    }

    // Knockout getters/setters
    get normalizedExp() {
        if (this.level === 0) {
            return this.exp;
        }
        return this.exp - this.expList[this.level - 1];
    }

    get expPercentage() {
        const nextLevelExp = this.level === 0 ? this.expList[this.level] : this.expList[this.level] - this.expList[this.level - 1];
        return (Math.round(this.normalizedExp) / nextLevelExp) * 100;
    }

    get progressString(): string {
        const nextLevelExp = this.level === 0 ? this.expList[this.level] : this.expList[this.level] - this.expList[this.level - 1];
        return `${Math.round(this.normalizedExp)}/${nextLevelExp}`;
    }

    // Private as external sources should use gainExp and normalizedExp
    private get exp() {
        return this.expKO();
    }

    private set exp(exp: number) {
        this.expKO(exp);
    }
}
