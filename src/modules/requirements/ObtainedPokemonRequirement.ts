import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';
import { PokemonNameType } from '../pokemons/PokemonNameType';

export default class ObtainedPokemonRequirement extends Requirement {
    constructor(public pokemon: PokemonNameType, uncaught = false) {
        super(1, uncaught ? AchievementOption.less : AchievementOption.more);
    }

    public getProgress() {
        return App.game.party.alreadyCaughtPokemonByName(this.pokemon) ? 1 : 0;
    }

    public hint(): string {
		const name = App.translation.get(this.pokemon, 'pokemon')();
        return this.option === AchievementOption.more
            ? `${name} needs to be owned.`
            : `${name} cannot be owned yet.`;
    }
}
