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
        public specifyRoutes: number[] = [], // Specify the route numbers of the subregion the roaming Pokémon should appear on, [] means any route in the subregion
    ) {
        this.pokemon = pokemonMap[pokemonName];
    }

    public isRoaming(route: number) {
        const onRoute = !this.specifyRoutes.length || this.specifyRoutes.includes(route);
        return onRoute && (this.unlockRequirement ? this.unlockRequirement.isCompleted() : true);
    }
}
