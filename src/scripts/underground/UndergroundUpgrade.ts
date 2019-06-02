class UndergroundUpgrade extends Upgrade {

    constructor(name: Underground.Upgrades, displayName: string, maxLevel: number, costList: Cost[], bonusList: number[], increasing = true) {
        super(name, displayName, maxLevel, costList, bonusList, increasing);
    }


    canBuy(): boolean {
        return super.canBuy() && player.hasKeyItem("Explorer kit");
    }
}


Underground.upgradeList.push(
    new UndergroundUpgrade(
        Underground.Upgrades.Energy_Max,
        "Max Energy",
        10,
        CostFactory.createArray(
            GameHelper.createArray(50, 500, 50), GameConstants.Currency.diamond
        ),
        GameHelper.createArray(0, 100, 10)
    )
);

Underground.upgradeList.push(
    new UndergroundUpgrade(Underground.Upgrades.Items_Max, "Max items", 4,
        CostFactory.createArray(GameHelper.createArray(200, 800, 200), GameConstants.Currency.diamond),
        GameHelper.createArray(0, 4, 1)
    )
);

Underground.upgradeList.push(
    new UndergroundUpgrade(Underground.Upgrades.Energy_Gain, "Energy restored", 17,
        CostFactory.createArray(GameHelper.createArray(100, 1700, 100), GameConstants.Currency.diamond),
        GameHelper.createArray(0, 17, 1)
    )
);

Underground.upgradeList.push(
    new UndergroundUpgrade(Underground.Upgrades.Energy_Regen_Time, "Energy regen time", 20,
        CostFactory.createArray(GameHelper.createArray(20, 400, 20), GameConstants.Currency.diamond),
        GameHelper.createArray(0, 20, 1),
        false
    )
);

Underground.upgradeList.push(
    new UndergroundUpgrade(Underground.Upgrades.Daily_Deals_Max, "Daily deals", 2,
        CostFactory.createArray(GameHelper.createArray(150, 300, 150), GameConstants.Currency.diamond),
        GameHelper.createArray(0, 2, 1)
    )
);
