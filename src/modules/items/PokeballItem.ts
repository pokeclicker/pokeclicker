import { Pokeball as PokeballType, Currency } from '../GameConstants';
import Item from './Item';
import { ShopOptions } from './types';

export default class PokeballItem extends Item {
    type: PokeballType;

    constructor(type: PokeballType, basePrice: number, currency: Currency = Currency.money, options?: ShopOptions, displayName?: string) {
        super(PokeballType[type], basePrice, currency, options, displayName, 'A ball for catching Pokémon.', 'pokeball');
        this.type = type;
    }

    gain(amt: number) {
        App.game.pokeballs.gainPokeballs(this.type, amt);
    }

    getBagAmount() {
        return App.game.pokeballs.getBallQuantity(this.type);
    }
}
