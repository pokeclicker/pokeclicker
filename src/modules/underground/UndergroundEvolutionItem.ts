import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { StoneType } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import Settings from '../settings';
import UndergroundItem from './UndergroundItem';
import UndergroundUpgrade from './UndergroundUpgrade';

export default class UndergroundEvolutionItem extends UndergroundItem {
    constructor(
        id: number,
        itemName: string,
        space: Array<Array<number>>,
        public type: StoneType,
        value = 1,
        requirement?: Requirement,
    ) {
        super(id, itemName, space, value, UndergroundItemValueType.EvolutionItem, requirement, ()=>{
            return App.game.underground.getUpgrade(UndergroundUpgrade.Upgrades.Reduced_Evolution_Items).isMaxLevel() && Settings.getSetting('underground.Reduced_Evolution_Items').observableValue() ? 0.1 : 1;
        });
    }
}
