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

        return Math.min(Math.trunc(partyPokemon?.attack / pokemonMap[this.pokemon].attack), this.requiredValue);
    }

    hint(): string {
        if (this.getProgress() == this.requiredValue) {
            return 'Level up to evolve.';
        } else {
            const attackRequired = pokemonMap[this.pokemon].attack * this.requiredValue;
            return `Needs at least ${attackRequired.toLocaleString('en-US')} attack to evolve.`;       
        }
    }
}
