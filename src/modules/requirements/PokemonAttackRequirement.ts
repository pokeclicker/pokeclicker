import { AchievementOption, AchievementType } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import AchievementRequirement from './AchievementRequirement';

export default class PokemonAttackRequirement extends AchievementRequirement {
    constructor(
        public pokemon: PokemonNameType,
        attackValue: number,
        private isMultiplier: boolean = false,
        option: AchievementOption = AchievementOption.more,
    ) {
        super(attackValue, option, AchievementType.Attack);
    }

    getProgress(): number {
        let currentValue = App.game.party.getPokemonByName(this.pokemon)?.attack ?? 0;
        if (this.isMultiplier) {
            currentValue = Math.trunc(currentValue / pokemonMap[this.pokemon].attack);
        }

        return Math.min(currentValue, this.requiredValue);
    }

    hint(): string {
        if (this.getProgress() == this.requiredValue) {
            return 'Level up to evolve.';
        }

        const attackRequired = this.isMultiplier ? pokemonMap[this.pokemon].attack * this.requiredValue : this.requiredValue;
        const comparisonOperator = this.option === AchievementOption.less ? 'less than' :
            this.option === AchievementOption.more ? 'more than' : 'exactly';

        return `${this.pokemon} needs ${comparisonOperator} ${attackRequired.toLocaleString('en-US')} attack.`;
    }
}
