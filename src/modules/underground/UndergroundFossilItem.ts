import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { FossilToPokemon } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import Settings from '../settings';
import UndergroundItem from './UndergroundItem';

export default class UndergroundFossilItem extends UndergroundItem {
    constructor(
        id: number,
        itemName: string,
        space: Array<Array<number>>,
        value = 1,
        requirement?: Requirement,
    ) {
        const weightFunc = (): number => {
            if (player.itemList[itemName]() == 0 && !App.game.party.alreadyCaughtPokemonByName(FossilToPokemon[this.name])) {
                return 1.5;
            }

            return Settings.getSetting('underground.Reduced_Fossils').observableValue() ? 0.1 : 1;
        };

        super(id, itemName, space, value, UndergroundItemValueType.Fossil, requirement, weightFunc);
    }
}
