import MultiRequirement from '../requirements/MultiRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';
import { PokemonListData, pokemonMap } from './PokemonList';
import { PokemonNameType } from './PokemonNameType';

export default class RoamingPokemon {
    public pokemon: PokemonListData;

    constructor(
        public pokemonName: PokemonNameType,
        public unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    ) {
        this.pokemon = pokemonMap[pokemonName];
    }

    public isRoaming() {
        return this.unlockRequirement ? this.unlockRequirement.isCompleted() : true;
    }
}
