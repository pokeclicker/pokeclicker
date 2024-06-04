import { PokeBlockColor, Currency } from '../GameConstants';
import ContestType from '../enums/ContestType';
import FlavorType from '../enums/FlavorType';
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
        displayName: string = `${PokeBlockColor[color]} Pokéblock`,
    ) {
        super(`PokeBlock_${PokeBlockColor[color]}`, basePrice, currency, undefined, displayName, undefined, 'pokeblock');
        this.type = color;
        this.contestType = contestType;
        this._canUse = canUse;
    }

    get description(): string {
        return this._description || `A ${FlavorType[this.contestType]} Pokéblock that boosts the Appeal of ${ContestType[this.contestType]} Pokémon`;
    }

    canUse(pokemon: { [key: string]: any }): boolean {
        return this._canUse?.(pokemon) ?? true;
    }
}
