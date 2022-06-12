import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class CaughtPokemonRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Caught Pokemon']);
    }

    public getProgress() {
        return Math.min(App.game.party.caughtPokemon.filter((p) => p.id > 0).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} unique Pokémon need to be caught.`;
    }
}
