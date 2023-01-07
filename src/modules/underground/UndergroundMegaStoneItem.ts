import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from '../requirements/Requirement';
import UndergroundItem from './UndergroundItem';

export default class UndergroundMegaStoneItem extends UndergroundItem {
    constructor(
        name: string,
        id: number,
        space: Array<Array<number>>,
        value = 1,
        public pokemon: PokemonNameType,
        requirement?: Requirement,
        weight?: (() => number) | number,
    ) {
        super(name, id, space, value, UndergroundItemValueType.MegaStone, requirement, weight);
    }
}
