class OakItem {
    public id: GameConstants.OakItem;
    public unlockReq: number;
    public description: KnockoutObservable<string>;
    public baseBonus: number;
    public stepBonus: number;
    public expGain: number;
    public level: KnockoutObservable<number>;
    public isActive: KnockoutObservable<boolean>;

    constructor(id: GameConstants.OakItem, unlockReq: number, description: string, baseBonus: number, stepBonus: number, expGain: number) {
        this.id = id;
        this.unlockReq = unlockReq;
        this.description = ko.observable(description);
        this.baseBonus = baseBonus;
        this.stepBonus = stepBonus;
        this.expGain = expGain;
        this.level = ko.observable(0);
        this.isActive = ko.observable(false);
    }

    public isUnlocked(): boolean {
        return player.caughtPokemonList.length >= this.unlockReq;
    }

    public expPercentage(): number {
        return this.getNormalizedPlayerExp() / this.getNormalizedRequiredExp() * 100;
    }

    public expProgress(): string {
        if (OakItemRunner.selectedItem().canUpgrade()) {
            return "Cost: " + GameConstants.OAKITEM_MONEY_COST[OakItemRunner.selectedItem().level()];
        }
        return OakItemRunner.inspectedItem().getNormalizedPlayerExp() + "/" + OakItemRunner.inspectedItem().getNormalizedRequiredExp();
    }

    public getNormalizedPlayerExp() {
        let previousExp = GameConstants.OAKITEM_XP_REQUIREMENT[this.level() - 1] || 0;
        return Math.floor((player.getOakItemExp(this.id) - previousExp) / this.expGain);
    }

    public getNormalizedRequiredExp() {
        let previousExp = GameConstants.OAKITEM_XP_REQUIREMENT[this.level() - 1] || 0;
        return Math.ceil((GameConstants.OAKITEM_XP_REQUIREMENT[this.level()] - previousExp) / this.expGain);
    }

    public use() {
        if (this.isActive()){
            GameHelper.incrementObservable(player.statistics.oakItemUses[this.id]);
        }
        if (this.isMaxLevel() || !this.isActive()) {
            return;
        }
        let expGain = Math.min(this.maxExp() - player.getOakItemExp(this.id), this.expGain);
        player.gainOakItemExp(this.id, expGain)
    }

    public upgrade() {
        if (this.canUpgrade()) {
            player.payMoney(GameConstants.OAKITEM_MONEY_COST[this.level()]);
            player.gainOakItemExp(this.id, 1);
            this.calculateLevel();
        }
    }

    public canUpgrade(): boolean {
        return this.canUpgradeExp() && this.canUpgradeMoney();
    }

    public canUpgradeExp(): boolean {
        return player.getOakItemExp(this.id) == this.maxExp();
    }

    public canUpgradeMoney(): boolean {
        return player.hasMoney(GameConstants.OAKITEM_MONEY_COST[this.level()])
    }

    public calculateBonus(): KnockoutComputed<number> {
        return ko.computed(function () {
            return this.baseBonus + this.stepBonus * this.level();
        }, this);
    }

    public calculateExpObservable(): KnockoutComputed<string> {
        return ko.computed(function () {
            return this.isMaxLevel() ? "Max" : player.getOakItemExp(this.id);
        }, this);
    }

    public calculateLevel(): number {
        let level = 0;
        for (let i = 0; i < GameConstants.OAKITEM_XP_REQUIREMENT.length; i++) {
            if (player.getOakItemExp(this.id) > GameConstants.OAKITEM_XP_REQUIREMENT[i]) {
                level = i + 1;

            }
        }
        this.level(level);
        return level;
    }

    public maxExp(): number {
        return GameConstants.OAKITEM_XP_REQUIREMENT[this.level()];
    }

    public isMaxLevel(): boolean {
        return this.level() == GameConstants.OAKITEM_MAX_LEVEL;
    }

}
