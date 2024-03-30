import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import Requirement from '../requirements/Requirement';
import Settings from '../settings';
import UndergroundItem from './UndergroundItem';
import UndergroundUpgrade from './UndergroundUpgrade';

export default class UndergroundShardItem extends UndergroundItem {
    constructor(
        id: number,
        itemName: string,
        space: Array<Array<number>>,
        requirement?: Requirement,
    ) {
        super(id, itemName, space, 0, UndergroundItemValueType.Shard, requirement, ()=>{
            return App.game.underground.getUpgrade(UndergroundUpgrade.Upgrades.Reduced_Shards).isMaxLevel() && Settings.getSetting('underground.Reduced_Shards').observableValue() ? 0.1 : 1;
        });
    }
}
