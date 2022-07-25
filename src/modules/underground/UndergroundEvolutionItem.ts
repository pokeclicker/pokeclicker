import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { StoneType } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import UndergroundItem from './UndergroundItem';

export default class UndergroundEvolutionItem extends UndergroundItem {
    constructor(
        public name: string,
        public id: number,
        space: Array<Array<number>>,
        public value = 1,
        public type: StoneType,
        public requirement?: Requirement,
    ) {
        super(name, id, space, value, UndergroundItemValueType.Gem, requirement);
    }
}
