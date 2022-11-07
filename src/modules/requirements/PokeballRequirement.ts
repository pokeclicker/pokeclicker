import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class PokeballRequirement extends AchievementRequirement {
    constructor(value: number, private pokeball: GameConstants.Pokeball, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Poke Balls']);
    }

    public getProgress() {
        return Math.min(App.game.statistics.pokeballsObtained[this.pokeball](), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} ${GameConstants.Pokeball[this.pokeball]} need to be obtained.`;
    }
}
