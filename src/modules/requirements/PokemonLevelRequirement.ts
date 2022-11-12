import { AchievementOption } from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class PokemonLevelRequirement extends Requirement {
    constructor(public pokemon: PokemonNameType, level: number, option = AchievementOption.more) {
        super(level, option);
    }

    public getProgress() {
        return Math.min(App.game.party.getPokemonByName(this.pokemon)?.level || 0, this.requiredValue);
    }

    public hint(): string {
        return `Your ${
            this.pokemon
        } needs to be ${
            this.option === AchievementOption.more
                ? 'at least'
                : 'below'
        } level ${this.requiredValue}.`;
    }
}
