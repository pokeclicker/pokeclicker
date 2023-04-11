import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class ShadowPokemonRequirement extends AchievementRequirement {
    constructor(value: number, private status: GameConstants.ShadowStatus = GameConstants.ShadowStatus.Shadow, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Shadow Pokemon']);
    }

    public getProgress() {
        return Math.min(App.game.party.caughtPokemon.filter((p) => p.shadow >= this.status).length, this.requiredValue);
    }

    public hint(): string {
        switch (this.status) {
            case GameConstants.ShadowStatus.Shadow:
                return `${this.requiredValue} Shadow Pokémon need to be obtained.`;
            case GameConstants.ShadowStatus.Purified:
                return `${this.requiredValue} Shadow Pokémon need to be purified.`;
        }
    }
}
