import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { StoneType } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import UndergroundItem from './UndergroundItem';

export default class UndergroundEvolutionItem extends UndergroundItem {
    constructor(
        name: string,
        id: number,
        space: Array<Array<number>>,
        value = 1,
        public type: StoneType,
        requirement?: Requirement,
        weight?: (() => number) | number,
    ) {
        super(name, id, space, value, UndergroundItemValueType.EvolutionItem, requirement, weight);
    }
}
