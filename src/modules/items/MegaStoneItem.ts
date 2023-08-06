import { Currency, MegaStoneType } from '../GameConstants';
//import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Item from './Item';
import { ShopOptions } from './types';

export default class MegaStoneItem extends Item {
    constructor(
        public megaStone: MegaStoneType,
        public basePokemon: PokemonNameType,
        basePrice: number,
        currency: Currency = Currency.questPoint,
        options?: ShopOptions,
        displayName?: string,
        description?: string,
    ) {
        super(MegaStoneType[megaStone], basePrice, currency, { maxAmount: 1, ...options }, displayName, description);
    }

    totalPrice(amount: number) {
        let amt = amount;
        if (amt > this.maxAmount) {
            amt = this.maxAmount;
        }
        return this.basePrice * amt;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    gain(amt: number) {
        player.gainMegaStone(this.megaStone);
    }

    isAvailable(): boolean {
        return super.isAvailable() && App.game.party.alreadyCaughtPokemonByName(this.basePokemon);
    }

    get image(): string {
        return `assets/images/megaStone/${MegaStoneType[this.megaStone]}.png`;
    }

    isSoldOut(): boolean {
        return player.hasMegaStone(this.megaStone);
    }

    get description(): string {
        return this._description || `A Mega Stone for ${this.basePokemon}.`;
    }
}
