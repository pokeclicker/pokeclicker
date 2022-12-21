import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class PokerusStatusRequirement extends AchievementRequirement {
    constructor(pokemonRequired: number, public statusRequired: GameConstants.Pokerus) {
        super(pokemonRequired, GameConstants.AchievementOption.more, GameConstants.AchievementType.Pokerus);
    }

    public getProgress() {
        return Math.min(App.game.party.caughtPokemon.filter((p) => p.pokerus >= this.statusRequired).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Pokémon needs to be infected.`;
    }
}
