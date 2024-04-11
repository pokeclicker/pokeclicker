import { AchievementOption, humanifyString } from '../GameConstants';
import GameHelper from '../GameHelper';
import { ItemNameType } from '../items/ItemNameType';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Requirement from './Requirement';

export default class HeldItemRequirement extends Requirement {
    constructor(public pokemon: PokemonNameType, public itemName: ItemNameType, public holding: boolean, option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        const heldItem = App.game.party.getPokemonByName(this.pokemon)?.heldItem();
        const hasItem = heldItem && heldItem.name === this.itemName;
        return this.holding ? Number(hasItem) : Number(!hasItem);
    }

    public hint(): string {
        return 'Your pokemon must' + (this.holding ? ' ' : ' not ') + `be holding ${
            GameHelper.anOrA(this.itemName)
        } ${
            humanifyString(this.itemName)
        }`;
    }
}
