import EggType from '../breeding/EggType';
import CaughtStatus from '../enums/CaughtStatus';
import { Currency, EggItemType } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import CaughtIndicatingItem from './CaughtIndicatingItem';

export default class EggItem extends CaughtIndicatingItem {
    type: EggItemType;

    constructor(type: EggItemType, basePrice: number, currency: Currency = Currency.questPoint, displayName?: string) {
        super(EggItemType[type], basePrice, currency, undefined, displayName, 'An egg. Can be hatched in the Day Care.', 'egg');
        this.type = type;
    }

    use(): boolean {
        if (player.itemList[this.name]() <= 0) {
            return false;
        }

        let success: boolean;
        if (this.type === EggItemType.Pokemon_egg) {
            success = App.game.breeding.gainPokemonEgg(pokemonMap.randomRegion(player.highestRegion()));
        } else if (this.type === EggItemType.Mystery_egg) {
            success = App.game.breeding.gainRandomEgg();
        } else {
            const etype = EggType[EggItemType[this.type].split('_')[0]];
            success = App.game.breeding.gainEgg(App.game.breeding.createTypedEgg(etype));
        }

        if (success) {
            player.loseItem(this.name, 1);
        }
        return success;
    }

    getCaughtStatus(): CaughtStatus {
        switch (this.type) {
            case (EggItemType.Pokemon_egg): {
                // random pokemon
                return CaughtStatus.NotCaught;
            }
            case (EggItemType.Mystery_egg): {
                return App.game.breeding.getAllCaughtStatus();
            }
            default: {
                const etype = EggType[EggItemType[this.type].split('_')[0]];
                return App.game.breeding.getTypeCaughtStatus(etype);
            }
        }
    }
}
