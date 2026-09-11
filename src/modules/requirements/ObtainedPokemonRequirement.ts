import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import { displayName } from '../pokemons/PokemonHelper';

export default class ObtainedPokemonRequirement extends Requirement {
    constructor(public pokemon: PokemonNameType, uncaught = false) {
        super(1, uncaught ? AchievementOption.less : AchievementOption.more);
    }

    public getProgress() {
        return App.game.party.alreadyCaughtPokemonByName(this.pokemon) ? 1 : 0;
    }

    public hint(): string {
        return this.option === AchievementOption.more
            ? `${displayName(this.pokemon)} needs to be owned.`
            : `${displayName(this.pokemon)} cannot be owned yet.`;
    }
}
