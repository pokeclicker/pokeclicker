import { AchievementOption, ATTACK_EVO_REQUIRED_ATTACK_MULTIPLIER } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class AttackEvolveRequirement extends Requirement {
    constructor(private name: PokemonNameType) {
        super(1, AchievementOption.equal);
    }

    getProgress(): number {
        const partyPokemon = App.game.party.getPokemonByName(this.name);

        return partyPokemon?.attack >= pokemonMap[this.name].attack * ATTACK_EVO_REQUIRED_ATTACK_MULTIPLIER ? 1 : 0;
    }

    hint(): string {
        const attackRequired = pokemonMap[this.name].attack * ATTACK_EVO_REQUIRED_ATTACK_MULTIPLIER;
        if (this.getProgress()) {
            return 'Level up to evolve.';
        } else {
            return `Needs at least ${attackRequired.toLocaleString('en-US')} attack to Mega Evolve.`;       
        }
    }
}
