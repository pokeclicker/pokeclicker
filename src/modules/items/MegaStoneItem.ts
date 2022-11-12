import { Currency } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import Item from './Item';
import { ShopOptions } from './types';

export default class MegaStoneItem extends Item {
    constructor(private pokemon: PokemonNameType, megaStoneName: string, basePrice: number, currency: Currency = Currency.questPoint, options?: ShopOptions, displayName?: string) {
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
        App.game.party.getPokemonByName(this.pokemon).giveMegastone();
    }

    isAvailable(): boolean {
        return super.isAvailable() && App.game.party.alreadyCaughtPokemonByName(this.pokemon) && !App.game.party.getPokemonByName(this.pokemon).megaStone;
    }

    get image(): string {
        return `assets/images/megaStone/${pokemonMap[this.pokemon].id}.png`;
    }
}
