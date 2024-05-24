import PokemonType from '../enums/PokemonType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import Requirement from '../requirements/Requirement';
import Settings from '../settings';
import UndergroundItem from './UndergroundItem';
import UndergroundUpgrade from './UndergroundUpgrade';
import { PLATE_VALUE } from '../GameConstants';

export default class UndergroundGemItem extends UndergroundItem {
    constructor(
        public id: number,
        itemName: string,
        space: Array<Array<number>>,
        public type: PokemonType,
        public baseValue = PLATE_VALUE,
        public requirement?: Requirement,
    ) {
        super(id, itemName, space, baseValue, UndergroundItemValueType.Gem, requirement, () => {
            return App.game.underground.getUpgrade(UndergroundUpgrade.Upgrades.Reduced_Plates).isMaxLevel() && Settings.getSetting('underground.Reduced_Plates').observableValue() ? 0.1 : 1;
        });
    }
}
