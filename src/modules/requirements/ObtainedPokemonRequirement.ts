import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';
import P from '../pokemons/mapProvider';
import { PokemonNameType } from '../pokemons/PokemonNameType';

export default class ObtainedPokemonRequirement extends Requirement {
    constructor(public pokemon: PokemonNameType, uncaught = false) {
        super(1, uncaught ? AchievementOption.less : AchievementOption.more);
    }

    public getProgress() {
        return Math.min(App.game?.statistics?.pokemonCaptured[P.pokemonMap[this.pokemon].id](), this.requiredValue);
    }

    public hint(): string {
        return this.option === AchievementOption.more
            ? `${this.pokemon} needs to be caught.`
            : `${this.pokemon} cannot be caught yet.`;
    }
}
