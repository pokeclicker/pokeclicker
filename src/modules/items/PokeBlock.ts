import { PokeBlockColor, Currency } from '../GameConstants';
import ContestType from '../enums/ContestType';
import Item from './Item';

export default class PokeBlock extends Item {
    type: PokeBlockColor;
    contestType: ContestType;
    _canUse: (pokemon: any) => boolean;

    constructor(
        color: PokeBlockColor,
        basePrice: number,
        currency: Currency = Currency.money,
        contestType?: ContestType,
        canUse?: (pokemon: any) => boolean,
        description: string = `A ${PokeBlockColor[color]} Pokéblock`,
        displayName: string = `${PokeBlockColor[color]} Pokéblock`,
    ) {
        super(`PokeBlock_${PokeBlockColor[color]}`, basePrice, currency, undefined, displayName, description, 'pokeblock');
        this.type = color;
        this.contestType = contestType;
        this._canUse = canUse;
    }

    canUse(pokemon: { [key: string]: any }): boolean {
        return this._canUse?.(pokemon) ?? true;
    }
}
