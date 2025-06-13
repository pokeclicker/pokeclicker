import PokemonType from '../enums/PokemonType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import Requirement from '../requirements/Requirement';
import UndergroundItem from './UndergroundItem';

export default class UndergroundGemItem extends UndergroundItem {
    constructor(
        public id: number,
        itemName: string,
        space: Array<Array<number>>,
        public type: PokemonType,
        public value = 100,
        public requirement?: Requirement,
    ) {
        super(id, itemName, space, value, UndergroundItemValueType.Gem, requirement, 1);
    }
}
