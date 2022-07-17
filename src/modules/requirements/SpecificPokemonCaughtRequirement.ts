import { AchievementOption } from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class SpecificPokemonCaughtRequirement extends Requirement {
    constructor(private pokemon: PokemonNameType) {
        super(1, AchievementOption.equal);
    }

    public getProgress() {
        return +App.game.party.alreadyCaughtPokemonByName(this.pokemon);
    }

    public hint(): string {
        return `${this.pokemon} needs to be caught.`;
    }
}
