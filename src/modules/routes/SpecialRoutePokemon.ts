import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from '../requirements/Requirement';

export default class SpecialRoutePokemon {
    constructor(
        public pokemon: PokemonNameType[],
        public req: Requirement,
    ) {}

    isAvailable(): boolean {
        return this.req.isCompleted();
    }
}
