import PokemonType from '../enums/PokemonType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import Requirement from '../requirements/Requirement';
import Settings from '../settings';
import UndergroundItem from './UndergroundItem';
import UndergroundUpgrade from './UndergroundUpgrade';

export default class UndergroundGemItem extends UndergroundItem {
    constructor(
        public id: number,
        itemName: string,
        space: Array<Array<number>>,
        public type: PokemonType,
        public value = 100,
        public requirement?: Requirement,
    ) {
        super(id, itemName, space, value, UndergroundItemValueType.Gem, requirement, () => {
            return App.game.underground.getUpgrade(UndergroundUpgrade.Upgrades.Reduced_Plates).isMaxLevel() && Settings.getSetting('underground.Reduced_Plates').observableValue() ? 0.1 : 1;
        });
    }
}
