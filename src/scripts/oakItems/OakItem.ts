///<reference path="../upgrades/ExpUpgrade.ts"/>
class OakItem extends ExpUpgrade {
    defaults = {
        level: 0,
        exp: 0,
        isActive: false,
    };

    private _isActive: KnockoutObservable<boolean>;
    inactiveBonus: number;
    unlockReq: number;
    description: string;
    expGain: number;


    constructor(name: any, displayName: string, bonusList: number[], inactiveBonus: number, increasing: boolean, unlockReq: number, description: string, expGain: number) {
        super(name, displayName, 5, [500, 1000, 2500, 5000, 10000], AmountFactory.createArray([50000, 100000, 250000, 500000, 1000000], GameConstants.Currency.money), bonusList, increasing);
        this._isActive = ko.observable(false);
        this.inactiveBonus = inactiveBonus;
        this.unlockReq = unlockReq;
        this.description = description;
        this.expGain = expGain;
    }

    use(exp: number = this.expGain) {
        if (!this.isActive) {
            return;
        }
        if (!this.isMaxLevel()) {
            this.gainExp(exp);
        }
        GameHelper.incrementObservable(App.game.statistics.oakItemUses[this.name]);
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


    toJSON(): object {
        const json = super.toJSON();
        json['isActive'] = this.isActive;
        return json;
    }

    fromJSON(json: object): void {
        super.fromJSON(json);
        this.isActive = json['isActive'] ?? this.defaults.isActive;
    }

    // Knockout getters/setters
    get progressString(): string {
        const nextLevelExp = this.level === 0 ? this.expList[this.level] : this.expList[this.level] - this.expList[this.level - 1];
        return `${Math.floor(this.normalizedExp / this.expGain)} / ${Math.ceil(nextLevelExp / this.expGain)}`;
    }

    get isActive() {
        return this._isActive();
    }

    set isActive(bool: boolean) {
        this._isActive(bool);
    }
}
