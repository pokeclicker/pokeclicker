///<reference path="../upgrades/Upgrade.ts"/>
///<reference path="../Main.ts"/>
///<reference path="../GameHelper.ts"/>

class PokeballFactoryUpgrade extends Upgrade {

    public baseCost: number;

    constructor(name: PokeballFactory.Upgrades, displayName: string, maxLevel: number, baseCost: number) {
        super(name, displayName, maxLevel, [], [], false);
        this.baseCost = baseCost;
    }


    calculateCost(): Cost {
        return new Cost(this.baseCost * this.level, GameConstants.Currency.money);
    }

    calculateBonus(level: number = this.level): number {
        return level;
    }

    canBuy(): boolean {
        return super.canBuy() && player.hasKeyItem("Town Map");
    }
}

PokeballFactory.upgradeList.push(
    new PokeballFactoryUpgrade(
        PokeballFactory.Upgrades.Pokeball_Time,
        "Pokeball Time",
        100,
        100
    )
);

PokeballFactory.upgradeList.push(
    new PokeballFactoryUpgrade(
        PokeballFactory.Upgrades.Greatball_Time,
        "Greatball Time",
        100,
        100
    )
);

PokeballFactory.upgradeList.push(
    new PokeballFactoryUpgrade(
        PokeballFactory.Upgrades.Ultraball_Time,
        "Ultraball Time",
        100,
        100
    )
);

PokeballFactory.upgradeList.push(
    new PokeballFactoryUpgrade(
        PokeballFactory.Upgrades.Masterball_Time,
        "Masterball Time",
        100,
        100
    )
);