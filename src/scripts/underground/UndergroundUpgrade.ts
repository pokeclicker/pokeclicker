
class UndergroundUpgrade extends Upgrade {

    constructor(
        name: UndergroundUpgrade.Upgrades, displayName: string, maxLevel: number,
        costList: Amount[], bonusList: number[], increasing = true
    ) {
        super(name, displayName, maxLevel, costList, bonusList, increasing);
    }


    canBuy(): boolean {
        return super.canBuy() && App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit);
    }
}


namespace UndergroundUpgrade {
    export enum Upgrades {
        'Energy_Max',
        'Items_Max',
        'Items_Min',
        'Energy_Gain',
        'Energy_Regen_Time',
        'Daily_Deals_Max',
        'Bomb_Efficiency',
        'Survey_Cost',
        'Survey_Efficiency',
        'NewYLayer',
    }
}
