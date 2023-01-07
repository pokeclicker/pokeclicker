import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { Region } from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import UndergroundItem from './UndergroundItem';

export default class UndergroundMegaStoneItem extends UndergroundItem {
    constructor(
        name: string,
        id: number,
        space: Array<Array<number>>,
        value = 1,
        public pokemon: PokemonNameType,
        weight?: number,
    ) {
        super(name, id, space, value,
            UndergroundItemValueType.MegaStone,
            new MultiRequirement([new MaxRegionRequirement(Region.kalos), new ObtainedPokemonRequirement(pokemon)]),
            () => (App.game.party.getPokemonByName(pokemon)?.megaStone ? 0 : weight));
    }
}
