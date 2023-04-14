import KeyItemType from '../enums/KeyItemType';
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
    'Survey_Efficiency',
    'NewYLayer',
}

export default class UndergroundUpgrade extends Upgrade {

    static Upgrades = Upgrades;

    constructor(
        name: Upgrades, displayName: string, maxLevel: number,
        costList: Amount[], bonusList: number[], increasing = true,
    ) {
        super(name, displayName, maxLevel, costList, bonusList, increasing);
    }


    canBuy(): boolean {
        return super.canBuy() && App.game.keyItems.hasKeyItem(KeyItemType.Explorer_kit);
    }

}

