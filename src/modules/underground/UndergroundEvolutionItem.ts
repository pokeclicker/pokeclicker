import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { StoneType } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import UndergroundItem from './UndergroundItem';

export default class UndergroundEvolutionItem extends UndergroundItem {
    constructor(
        id: number,
        itemName: string,
        space: Array<Array<number>>,
        public type: StoneType,
        value = 1,
        requirement?: Requirement,
        weight?: (() => number) | number,
    ) {
        super(id, itemName, space, value, UndergroundItemValueType.EvolutionItem, requirement, weight);
    }
}
