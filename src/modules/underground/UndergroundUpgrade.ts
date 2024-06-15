import KeyItemType from '../enums/KeyItemType';
import Requirement from '../requirements/Requirement';
import Upgrade from '../upgrades/Upgrade';
import Amount from '../wallet/Amount';

export enum Upgrades {
    'Energy_Max',
    'Items_Max',
    'Items_Min',
    'Energy_Gain',
    'Energy_Regen_Time',
    'Daily_Deals_Max',
    'Bomb_Efficiency',
    'Survey_Cost',
    'Items_All',
    'Reduced_Shards',
    'Reduced_Plates',
    'Reduced_Evolution_Items',
    'Reduced_Fossil_Pieces',
}

export default class UndergroundUpgrade extends Upgrade {

    static Upgrades = Upgrades;

    constructor(
        name: Upgrades, displayName: string, maxLevel: number,
        costList: Amount[], bonusList: number[], increasing = true,
        private requirement?: Requirement,
    ) {
        super(name, displayName, maxLevel, costList, bonusList, increasing);
    }


    canBuy(): boolean {
        return super.canBuy() && App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit) && this.isUnlocked();
    }

    isUnlocked(): boolean {
        return this.requirement?.isCompleted() ?? true;
    }
}

