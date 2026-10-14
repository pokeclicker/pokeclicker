import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from '../requirements/Requirement';

export default class BerryWandererGroup {
    constructor(
        public pokemon: PokemonNameType[],
        public req?: Requirement,
        public weight = 1,
    ) {}

    isAvailable(): boolean {
        return this.req?.isCompleted() ?? true;
    }
}
