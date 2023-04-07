import PokemonType from '../enums/PokemonType';
import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class MonotypeChallengeRequirement extends Requirement {
    public selectedType: PokemonType;

    constructor(selectedType: PokemonType, option: AchievementOption = AchievementOption.equal) {
        super(1, option);
        this.selectedType = selectedType;
    }

    public getProgress(): number {
        return +(App.game.challenges.listSpecial.monotype.active() && App.game.challenges.listSpecial.monotype.pokemonType() === this.selectedType);
    }

    public hint(): string {
        return `Requires the Monotype challenge to be enabled and the ${this.selectedType}-type to be selected.`;
    }
}
