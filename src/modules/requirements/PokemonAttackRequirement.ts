import { AchievementOption } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class PokemonAttackRequirement extends Requirement {
    constructor(public pokemon: PokemonNameType, attackMultiplier: number, option: AchievementOption) {
        super(attackMultiplier, option);
    }

    getProgress(): number {
        const partyPokemon = App.game.party.getPokemonByName(this.pokemon);
        const partyPokemonAttackRatio = Math.trunc(partyPokemon?.attack / pokemonMap[this.pokemon].attack);

        switch (this.option) {
            case AchievementOption.less: 
            case AchievementOption.more: return Math.min(partyPokemonAttackRatio, this.requiredValue);
            case AchievementOption.equal: 
            default: return partyPokemonAttackRatio;
        }

        
    }

    hint(): string {
        if (this.getProgress() == this.requiredValue) {
            return 'Level up to evolve.';
        } else {
            const attackRequired = pokemonMap[this.pokemon].attack * this.requiredValue;
            const comparisonOperator = this.option === AchievementOption.less ? 'less than' :
                this.option === AchievementOption.more ? 'more than' :
                    'exactly';
            return `${this.pokemon} needs ${comparisonOperator} ${attackRequired.toLocaleString('en-US')} attack.`;
        }
    }
}
