///<reference path="./OakItem.ts"/>
class BoughtOakItem extends OakItem {

    shopName: string;

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
    }

    isUnlocked(): boolean {
        return App.game.oakItems.purchaseList[this.name]();
    }

    hint = ko.pureComputed(() => {
        return `Purchase from the ${this.shopName}`;
    });

}
