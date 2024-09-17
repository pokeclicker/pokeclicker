import { AchievementOption, humanifyString } from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class BoxRequirement extends Requirement {
    constructor(public pokemon: PokemonNameType, option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return App.game.party.getPokemonByName(this.pokemon)?.box ? 1 : 0;
    }

    public hint(): string {
        return `The Pokémon must${this.option == AchievementOption.less?' not ':' '}be in a box.`;
    }
}