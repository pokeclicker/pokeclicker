import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { HeldItemType } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import UndergroundItem from './UndergroundItem';

export default class UndergroundHeldItem extends UndergroundItem {
    constructor(
        name: string,
        id: number,
        space: Array<Array<number>>,
        value = 1,
        public type: HeldItemType,
        requirement?: Requirement,
    ) {
        super(name, id, space, value, UndergroundItemValueType.HeldItem, requirement);
    }
}
