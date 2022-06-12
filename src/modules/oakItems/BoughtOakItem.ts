import {
    Observable as KnockoutObservable,
} from 'knockout';
import { Currency } from '../GameConstants';
import Amount from '../wallet/Amount';
import AmountFactory from '../wallet/AmountFactory';
import OakItem from './OakItem';

export default class BoughtOakItem extends OakItem {
    private purchasedKO: KnockoutObservable<boolean>;

    constructor(
        name: any,
        displayName: string,
        description: string,
        public shopName: string,
        increasing: boolean,
        bonusList: number[],
        inactiveBonus = 1,
        expGain = 1,
        expList: number[] = [500, 1000, 2500, 5000, 10000],
        maxLevel = 5,
        costList: Amount[] = AmountFactory.createArray([50000, 100000, 250000, 500000, 1000000], Currency.money),
        bonusSymbol = '×',
    ) {
        super(name, displayName, description, increasing, bonusList, inactiveBonus, -1, expGain, expList, maxLevel, costList, bonusSymbol);
        this.purchasedKO = ko.observable(false);
    }

    isUnlocked(): boolean {
        return this.purchased;
    }

    get hint() {
        return ko.pureComputed(() => `Purchase from the ${this.shopName}`);
    }

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json.purchased = this.purchased;
        return json;
    }

    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        this.purchased = json.purchased ?? false;
    }

    get purchased(): boolean {
        return this.purchasedKO();
    }

    set purchased(bool: boolean) {
        this.purchasedKO(bool);
    }
}
