import { AchievementOption } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class AttackEvolveRequirement extends Requirement {
    constructor(public pokemon: PokemonNameType, attackMultiplier: number) {
        super(attackMultiplier, AchievementOption.equal);
    }

    getProgress(): number {
        const partyPokemon = App.game.party.getPokemonByName(this.pokemon);

        return partyPokemon?.attack >= pokemonMap[this.pokemon].attack * this.requiredValue ? 1 : 0;
    }

    hint(): string {
        const attackRequired = pokemonMap[this.pokemon].attack * this.requiredValue;
        if (this.getProgress()) {
            return 'Level up to evolve.';
        } else {
            return `Needs at least ${attackRequired.toLocaleString('en-US')} attack to evolve.`;       
        }
    }
}
