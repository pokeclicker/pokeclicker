import { AchievementOption } from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import TmpPokemonHelper from '../pokemons/TmpPokemonHelper';
import SeededRand from '../utilities/SeededRand';
import Requirement from './Requirement';

export default class PokemonDefeatedSelectNRequirement extends Requirement {
    constructor(private pokemon: PokemonNameType, private index: number, private total: number, private select: number) {
        super(1, AchievementOption.equal);
    }

    public getProgress(): number {
        SeededRand.seed(App.game.statistics.pokemonDefeated[TmpPokemonHelper.getPokemonByName(this.pokemon).id]());
        const numbersSelected = SeededRand.shuffleArray([...Array(this.total).keys()]).slice(0, this.select);

        return +numbersSelected.includes(this.index);
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Find it elsewhere.';
    }
}
