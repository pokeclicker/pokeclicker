/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../upgrades/ExpUpgrade.ts" />

class OakItem extends ExpUpgrade {
    defaults = {
        level: 0,
        exp: 0,
        isActive: false,
    };

    private _isActive: KnockoutObservable<boolean>;

    constructor(
        name: any,
        displayName: string,
        public description: string,
        increasing: boolean,
        bonusList: number[],
        public inactiveBonus: number,
        public unlockReq: number,
        public expGain: number,
        expList: number[] = [500, 1000, 2500, 5000, 10000],
        maxLevel = 5,
        costList: Amount[] = AmountFactory.createArray([50000, 100000, 250000, 500000, 1000000], GameConstants.Currency.money),
        public bonusSymbol: string = '×'
    ) {
        super(name, displayName, maxLevel, expList, costList, bonusList, increasing);
        this._isActive = ko.observable(false);
    }

    use(exp: number = this.expGain, scale = 1) {
        if (!this.isActive) {
            return;
        }
        if (!this.isMaxLevel()) {
            this.gainExp(exp * scale);
        }
        GameHelper.incrementObservable(App.game.statistics.oakItemUses[this.name]);
    }

    isUnlocked(): boolean {
        return App.game.party.caughtPokemon.length >= this.unlockReq;
    }

    getHint(): string {
        return `Capture ${this.unlockReq - App.game.party.caughtPokemon.length} more unique Pokémon`;
    }

    hint = ko.pureComputed(() => {
        return `Capture ${this.unlockReq - App.game.party.caughtPokemon.length} more unique Pokémon`;
    });

    calculateBonus(level: number = this.level): number {
        if (!this.isActive) {
            return this.inactiveBonus;
        }
        return super.calculateBonus(level);
    }

    calculateBonusIfActive(level: number = this.level) {
        return super.calculateBonus(level);
    }


    toJSON(): Record<string, any> {
        const json = super.toJSON();
        json['isActive'] = this.isActive;
        return json;
    }

    fromJSON(json: Record<string, any>): void {
        super.fromJSON(json);
        this.isActive = json['isActive'] ?? this.defaults.isActive;
    }

    // Knockout getters/setters
    get expPercentage() {
        const nextLevelExp = this.level === 0 ? this.expList[this.level] : this.expList[this.level] - this.expList[this.level - 1];
        return Math.floor(this.normalizedExp / this.expGain) / Math.ceil(nextLevelExp / this.expGain) * 100;
    }

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

    get bonusText(): string {
        return `${this.calculateBonusIfActive()}${this.bonusSymbol}`;
    }

    tooltip = ko.pureComputed(() => {
        return `<u>${this.displayName}</u><br/><p>${this.description}</p>Level: <strong>${this.level}/${this.maxLevel}</strong><br/>Bonus: <strong>${this.bonusText}</strong>`;
    });
}
