import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { MegaStoneType, Region } from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import UndergroundItem from './UndergroundItem';

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
        super(id, itemName, space, value,
            UndergroundItemValueType.MegaStone,
            new MultiRequirement([new MaxRegionRequirement(Region.kalos), new ObtainedPokemonRequirement(pokemon)]),
            () => (player.hasMegaStone(megaStone) ? 0 : weight));
    }
}
