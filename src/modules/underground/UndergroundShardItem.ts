import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import Requirement from '../requirements/Requirement';
import UndergroundItem from './UndergroundItem';

export default class UndergroundShardItem extends UndergroundItem {
    constructor(
        id: number,
        itemName: string,
        space: Array<Array<number>>,
        requirement?: Requirement,
    ) {
        super(id, itemName, space, 0, UndergroundItemValueType.Shard, requirement, 1);
    }
}
