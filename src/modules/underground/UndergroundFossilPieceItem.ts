import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import Requirement from '../requirements/Requirement';
import Settings from '../settings';
import UndergroundItem from './UndergroundItem';
import UndergroundUpgrade from './UndergroundUpgrade';


export default class UndergroundFossilPieceItem extends UndergroundItem {
    constructor(
        id: number,
        itemName: string,
        space: Array<Array<number>>,
        value = 1,
        requirement?: Requirement,
    ) {
        super(id, itemName, space, value, UndergroundItemValueType.FossilPiece, requirement, ()=>{
            return App.game.underground.getUpgrade(UndergroundUpgrade.Upgrades.Reduced_Fossil_Pieces).isMaxLevel() && Settings.getSetting('underground.Reduced_Fossil_Pieces').observableValue() ? 0.1 : 1;
        });
    }
}
