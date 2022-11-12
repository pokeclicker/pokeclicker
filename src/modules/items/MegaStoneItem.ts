import { Currency } from '../GameConstants';
import Item from './Item';
import { ShopOptions } from './types';

export default class MegaStoneItem extends Item {
    constructor(private pokemonId: number, megaStoneName: string, basePrice: number, currency: Currency = Currency.questPoint, options?: ShopOptions, displayName?: string) {
        super(megaStoneName, basePrice, currency, { maxAmount: 1, ...options }, displayName);
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
        App.game.party.getPokemon(this.pokemonId).giveMegastone();
    }

    isAvailable(): boolean {
        return super.isAvailable() && App.game.party.alreadyCaughtPokemon(this.pokemonId) && !App.game.party.getPokemon(this.pokemonId).megaStone;
    }

    get image(): string {
        return `assets/images/megaStone/${this.pokemonId}.png`;
    }
}
