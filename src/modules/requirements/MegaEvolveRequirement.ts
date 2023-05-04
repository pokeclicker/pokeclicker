import { AchievementOption, MegaStoneType, humanifyString } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class MegaEvolveRequirement extends Requirement {
    private readonly baseAttackMultiplier = 500;

    constructor(private name: PokemonNameType, private megaStone: MegaStoneType) {
        super(1, AchievementOption.equal);
    }

    getProgress(): number {
        const partyPokemon = App.game.party.getPokemonByName(this.name);
        return player.hasMegaStone(this.megaStone)
            && partyPokemon?.attack >= pokemonMap[this.name].attack * this.baseAttackMultiplier ? 1 : 0;
    }

    hint(): string {
        const attackRequired = pokemonMap[this.name].attack * this.baseAttackMultiplier;
        if (this.getProgress()) {
            return 'Use a Key Stone to Mega Evolve.';
        } else {
            const hints = [];
            if (!player.hasMegaStone(this.megaStone)) {
                hints.push(`${this.name} needs the ${humanifyString(MegaStoneType[this.megaStone])} Mega Stone.`);
            }
            if (App.game.party.getPokemonByName(this.name).attack < attackRequired) {
                hints.push(`Needs at least ${attackRequired.toLocaleString('en-US')} attack to Mega Evolve.`);
            }
            return hints.join('<br />');
        }
    }
}
