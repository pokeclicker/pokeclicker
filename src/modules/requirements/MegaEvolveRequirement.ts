import { AchievementOption, MegaStoneType } from '../GameConstants';
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
        return player.itemList[MegaStoneType[this.megaStone]]() > 0
            && partyPokemon?.attack >= pokemonMap[this.name].attack * this.baseAttackMultiplier ? 1 : 0;
    }

    hint(): string {
        const attackRequired = pokemonMap[this.name].attack * this.baseAttackMultiplier;
        if (this.getProgress()) {
            return 'Use a Key Stone to Mega Evolve.';
        } else if (App.game.party.getPokemonByName(this.name).attack < attackRequired) {
            return `Needs at least ${attackRequired.toLocaleString('en-US')} attack to Mega Evolve.`;
        } else {
            return `${this.name} holds no Mega Stone.`;
        }
    }
}
