class Upgrade implements Saveable {
    defaults = {
        level: 0,
    };
    saveKey: string;

    name: any;
    displayName: string;
    maxLevel: number;
    _level: KnockoutObservable<number> = ko.observable();

    // Describes whether this upgrade increases or decreases a number.
    // (e.g. power is increasing, time is decreasing).
    increasing: boolean;

    // Optional array of costs
    costList: Amount[] = [];
    // Optional array of benefits
    bonusList: number[] = [];

    constructor(name: any, displayName: string, maxLevel: number, costList: Amount[], bonusList: number[], increasing = true) {
        this.saveKey = name;
        this.name = name;
        this.displayName = displayName;
        this.maxLevel = maxLevel;
        this.level = this.defaults.level;
        this.costList = costList;
        this.bonusList = bonusList;
        this.increasing = increasing;
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
            Notifier.notify({ message: 'You cannot afford to buy this upgrade yet', type: GameConstants.NotificationOption.warning });
        }
    }

    levelUp() {
        this.level = this.level + 1;
    }

    fromJSON(json: object): void {
        if (json == null) {
            return;
        }
        this.level = json['level'] ?? this.defaults.level;
    }

    toJSON(): object {
        return {
            level: this.level,
        };
    }

    // Knockout getters/setters
    get level(): number {
        return this._level();
    }

    set level(value) {
        this._level(Math.min(value, this.maxLevel));
    }

}
