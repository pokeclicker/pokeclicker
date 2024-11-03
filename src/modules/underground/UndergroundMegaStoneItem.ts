import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { AchievementOption, MegaStoneType, Region } from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import UndergroundItem from './UndergroundItem';
import ItemOwnedRequirement from '../requirements/ItemOwnedRequirement';

export default class UndergroundMegaStoneItem extends UndergroundItem {
    constructor(
        public megaStone: MegaStoneType,
        id: number,
        itemName: string,
        space: Array<Array<number>>,
        public pokemon: PokemonNameType,
        value = 0,
        weight?: number,
    ) {
        // The ItemRequirement needs to be 1 and less, because Requirement can't handle 0 and equal
        super(id, itemName, space, value,
            UndergroundItemValueType.MegaStone,
            new MultiRequirement([new MaxRegionRequirement(Region.kalos), new ObtainedPokemonRequirement(pokemon), new ItemOwnedRequirement(itemName, 1, AchievementOption.less)]),
            weight);
    }
}
