import * as GameConstants from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class WandererOnFarmRequirement extends Requirement {
    constructor(
        private pokemon: PokemonNameType[],
        wanderersNeeded = 1,
        option: GameConstants.AchievementOption = GameConstants.AchievementOption.more,
    ) {
        super(wanderersNeeded, option);
    }

    public getProgress() {
        const numWanderer = App.game.farming.plotList.filter(plot => this.pokemon.includes(plot.wanderer?.name)).length;
        return Math.min(numWanderer, this.requiredValue);
    }

    public hint(): string {
        return `Have at least ${this.requiredValue} ${this.pokemon.join(' and ')} wandering on the Farm at the same time.`;
    }
}
