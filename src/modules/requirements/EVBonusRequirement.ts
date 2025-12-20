import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class EVBonusRequirement extends AchievementRequirement {
    static highestPokemonBonus = ko.pureComputed(() => {
        return Math.max(...App.game.party.caughtPokemon.map(p => p.calculateEVAttackBonus()));
    }).extend({ rateLimit: 1000 });

    constructor(
        requiredBonus: number,
        option: GameConstants.AchievementOption = GameConstants.AchievementOption.more,
    ) {
        super(requiredBonus, option);
    }

    public getProgress() {
        return Math.min(EVBonusRequirement.highestPokemonBonus(), this.requiredValue);
    }

    public hint(): string {
        return `Reach a x${this.requiredValue} EV bonus with any Pokémon.`;
    }
}
