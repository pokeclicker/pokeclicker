///<reference path="../GameConstants.ts"/>
///<reference path="Cost.ts"/>
///<reference path="CostFactory.ts"/>

class Upgrade {
    name: any;
    displayName: string;
    maxLevel: number;
    level: number;
    // Optional array of costs
    costList: Cost[] = [];
    // Optional array of benefits
    bonusList: number[] = [];


    calculateCost(): Cost {
        return this.costList[this.level];
    }

    // Override with a custom function
    calculateBonus(): number {
        return this.bonusList[this.level];
    }

    upgradeBonus() {
        if (this.level < this.maxLevel) {

            return this.bonusList[this.level + 1] - this.bonusList[this.level];
        }
        return 0;
    }

    canAfford(): boolean {
        return player.canAfford(this.calculateCost())
    }

    // Override in subclass when other requirements exist.
    canBuy(): boolean {
        return this.level < this.maxLevel && this.canAfford()
    }

    buy() {
        if (this.canBuy()) {
            player.payCost(this.calculateCost());
            this.level++;
        }
    }

    constructor(name: any, displayName: string, maxLevel: number, costList: Cost[], bonusList: number[]) {
        this.name = name;
        this.displayName = displayName;
        this.maxLevel = maxLevel;
        this.level = 1;
        this.costList = costList;
        this.bonusList = bonusList;
    }
}