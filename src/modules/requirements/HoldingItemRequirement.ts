import { AchievementOption, humanifyString } from '../GameConstants';
import GameHelper from '../GameHelper';
import { ItemNameType } from '../items/ItemNameType';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class HoldingItemRequirement extends Requirement {
    constructor(public pokemon: PokemonNameType, public itemName: ItemNameType, option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        const heldItem = App.game.party.getPokemonByName(this.pokemon)?.heldItem();
        return Number(heldItem && heldItem.name === this.itemName);
    }

    public hint(): string {
        return `Your pokemon must be holding ${
            GameHelper.anOrA(this.itemName)
        } ${
            humanifyString(this.itemName)
        }`;
    }
}
