///<reference path="./OakItem.ts"/>
class BoughtOakItem extends OakItem {

    shopName: string;

    private _purchased: KnockoutObservable<boolean>;

    constructor(
        name: any,
        displayName: string,
        description: string,
        shopName: string,
        increasing: boolean,
        bonusList: number[],
        inactiveBonus = 1,
        expGain = 1,
        expList: number[] = [500, 1000, 2500, 5000, 10000],
        maxLevel = 5,
        costList: Amount[] = AmountFactory.createArray([50000, 100000, 250000, 500000, 1000000], GameConstants.Currency.money)
    ) {
        super(name, displayName, description, increasing, bonusList, inactiveBonus, -1,  expGain, expList, maxLevel, costList);
        this.shopName = shopName;
        this._purchased = ko.observable(false);
    }

    isUnlocked(): boolean {
        return this.purchased;
    }

    hint = ko.pureComputed(() => {
        return `Purchase from the ${this.shopName}`;
    });

    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json['purchased'] = this.purchased;
        return json;
    }

    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        this.purchased = json['purchased'] ?? false;
    }

    get purchased(): boolean {
        return this._purchased();
    }

    set purchased(bool: boolean) {
        this._purchased(bool);
    }

}
