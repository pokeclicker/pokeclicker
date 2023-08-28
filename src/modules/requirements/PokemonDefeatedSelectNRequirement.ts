import { PokemonNameType } from '../pokemons/PokemonNameType';
import TmpPokemonHelper from '../pokemons/TmpPokemonHelper';
import SeededRand from '../utilities/SeededRand';
import SelectNRequirement from './SelectNRequirement';

export default class PokemonDefeatedSelectNRequirement extends SelectNRequirement {
    constructor(private pokemon: PokemonNameType, index: number, total: number, select: number) {
        super(index, total, select);
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Find it elsewhere.';
    }

    setSeed(): void {
        SeededRand.seed(App.game.statistics.pokemonDefeated[TmpPokemonHelper.getPokemonByName(this.pokemon).id]());
    }
}
