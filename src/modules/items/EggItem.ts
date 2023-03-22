import EggType from '../breeding/EggType';
import CaughtStatus from '../enums/CaughtStatus';
import PokemonType from '../enums/PokemonType';
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
        } else if (this.type === EggItemType.Monotype_egg) {
            success = App.game.breeding.gainMonotypeEgg();
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
            case (EggItemType.Monotype_egg): {
                return App.game.breeding.getTypeCaughtStatus(EggType.Monotype);
            }
            default: {
                const etype = EggType[EggItemType[this.type].split('_')[0]];
                return App.game.breeding.getTypeCaughtStatus(etype);
            }
        }
    }

    isVisible(): boolean {
        if (this.type === EggItemType.Monotype_egg && !App.game.challenges.listSpecial.monotype.active()) {
            return false;
        }
        return this.visible?.isCompleted() ?? true;
    }

    isAvailable(): boolean {
        if (this.type === EggItemType.Monotype_egg && !App.game.challenges.listSpecial.monotype.active()) {
            return false;
        }
        return super.isAvailable();
    }

    get image() {
        const subDirectory = this.imageDirectory ? `${this.imageDirectory}/` : '';
        let eggName = this.name;
        if (this.type === EggItemType.Monotype_egg && App.game.challenges.listSpecial.monotype.active()) {
            eggName = `${PokemonType[App.game.challenges.listSpecial.monotype.pokemonType()]}_egg`;
        }
        return `assets/images/items/${subDirectory}${eggName}.png`;
    }
}
