///<reference path="../upgrades/Upgrade.ts"/>
///<reference path="../Main.ts"/>
///<reference path="../GameHelper.ts"/>

class PokeballFactoryUpgrade extends Upgrade {

    public baseCost: number;
    public secondBonus: number;

    constructor(name: PokeballFactory.Upgrades, displayName: string, maxLevel: number, baseCost: number, secondBonus: number) {
        super(name, displayName, maxLevel, [], [], false);
        this.baseCost = baseCost;
        this.secondBonus = secondBonus
    }


    calculateCost(): Cost {
        return new Cost(this.baseCost * (this.level + 1), GameConstants.Currency.money);
    }

    calculateBonus(level: number = this.level): number {
        return level * this.secondBonus;
    }
}

PokeballFactory.upgradeList.push(
    new PokeballFactoryUpgrade(
        PokeballFactory.Upgrades.Pokeball_Time,
        "Pokeball Time",
        9,
        100,
        PokeballFactory.BASE_POKEBALL_TIME / 10
    )
);

PokeballFactory.upgradeList.push(
    new PokeballFactoryUpgrade(
        PokeballFactory.Upgrades.Greatball_Time,
        "Greatball Time",
        9,
        100,
        PokeballFactory.BASE_GREATBALL_TIME / 10
    )
);

PokeballFactory.upgradeList.push(
    new PokeballFactoryUpgrade(
        PokeballFactory.Upgrades.Ultraball_Time,
        "Ultraball Time",
        9,
        100,
        PokeballFactory.BASE_ULTRABALL_TIME / 10
    )
);

PokeballFactory.upgradeList.push(
    new PokeballFactoryUpgrade(
        PokeballFactory.Upgrades.Masterball_Time,
        "Masterball Time",
        9,
        100,
        PokeballFactory.BASE_MASTERBALL_TIME / 10
    )
);
