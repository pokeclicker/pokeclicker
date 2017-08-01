class UndergroundUpgrade {
    name: string;
    text: string;
    maxUses: number;
    step: number;
    costStep: number;
    baseCost: number;
    initialValue: number;

    static list: Array<UndergroundUpgrade> = []

    constructor(name, text, step, baseCost) {
        this.name = name;
        this.text = text;
        this.maxUses = GameConstants.MaxUpgrades[name];
        this.step = step;
        this.baseCost = baseCost;
        this.initialValue = GameConstants.MineUpgradesInitialValues[name];
    }

    alreadyMax(): boolean {
        return player[this.name] == this.initialValue + (this.maxUses * this.step);
    }

    cost(): number {
        let timesUpgraded = (player[this.name] - this.initialValue) / this.step;
        return this.baseCost * (timesUpgraded + 1);
    }

    canAfford(): boolean {
        return player.diamonds >= this.cost();
    }

    buy() {
        if (!this.alreadyMax() && this.canAfford()) {
            player.diamonds -= this.cost();
            player[this.name] += this.step;
        }
    }
}

UndergroundUpgrade.list.push(new UndergroundUpgrade("maxMineEnergy", "Max Energy", 10, 50));
UndergroundUpgrade.list.push(new UndergroundUpgrade("maxUndergroundItems", "Max Items", 1, 200));
UndergroundUpgrade.list.push(new UndergroundUpgrade("mineEnergyGain", "Energy Gain", 1, 100));
UndergroundUpgrade.list.push(new UndergroundUpgrade("mineEnergyRegenTime", "Energy Regen Time", -1, 10));
UndergroundUpgrade.list.push(new UndergroundUpgrade("maxDailyDeals", "Max Daily Deals", 1, 150));
