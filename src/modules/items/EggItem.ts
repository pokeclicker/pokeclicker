import EggType from '../breeding/EggType';
import CaughtStatus from '../enums/CaughtStatus';
import { Currency, EggItemType } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import CaughtIndicatingItem from './CaughtIndicatingItem';
import HatchableItem from '../interfaces/HatchableItem';

export default class EggItem extends CaughtIndicatingItem implements HatchableItem {
    type: EggItemType;

    constructor(type: EggItemType, basePrice: number, currency: Currency = Currency.questPoint, displayName?: string) {
        super(EggItemType[type], basePrice, currency, undefined, displayName, 'An egg. Can be hatched in the Day Care.', 'egg');
        this.type = type;
    }

    use(): boolean {
        return this.addToHatchery();
    }

    addToHatchery(): boolean {
        if (player.itemList[this.name]() <= 0) {
            return false;
        }
        
        const success = App.game.breeding.addItemToHatchery(this.name, EggType.EggItem);

        if (success) {
            player.loseItem(this.name, 1);
        }
        return success;
    }

    getCaughtStatus(): CaughtStatus {
        if (this.type === EggItemType.Mystery_egg) {
            return App.game.breeding.getAllCaughtStatus();
        } else {
            return App.game.breeding.getTypeCaughtStatus(this.type);
        }
    }
}
