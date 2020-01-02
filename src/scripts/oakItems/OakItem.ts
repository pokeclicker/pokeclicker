///<reference path="../upgrades/ExpUpgrade.ts"/>
class OakItem extends ExpUpgrade {

    private _isActive: KnockoutObservable<boolean>;
    inactiveBonus: number;
    unlockReq: number;
    description: string;
    expGain: number;


    constructor(name: any, displayName: string, bonusList: number[], inactiveBonus: number, increasing: boolean, unlockReq: number, description: string, expGain: number) {
        super(name, displayName, 5, [1000, 2500, 5000, 10000, 20000], AmountFactory.createArray([1000, 2500, 5000, 10000, 20000], GameConstants.Currency.money), bonusList, increasing);
        this._isActive = ko.observable(false);
        this.inactiveBonus = inactiveBonus;
        this.unlockReq = unlockReq;
        this.description = description;
        this.expGain = expGain;
    }

    use(exp: number = this.expGain) {
        if (this.isMaxLevel() || !this.isActive) {
            return;
        }

        GameHelper.incrementObservable(player.statistics.oakItemUses[this.name]);
        this.gainExp(exp);
    }

    calculateBonus(level: number = this.level): number {
        if (!this.isActive) {
            return this.inactiveBonus;
        }
        return super.calculateBonus(level);
    }

    calculateBonusIfActive(level: number = this.level) {
        return super.calculateBonus(level);
    }

    // Knockout getters/setters
    get isActive() {
        return this._isActive();
    }

    set isActive(bool: boolean) {
        this._isActive(bool)
    }
}
