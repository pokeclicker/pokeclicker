import { PokeBlockColor, Currency } from '../GameConstants';
import { TmpPartyPokemonType } from '../TemporaryScriptTypes';
import ContestType from '../enums/ContestType';
import Item from './Item';

export default class PokeBlock extends Item {
    type: PokeBlockColor;
    contestType: ContestType[];
    _canUse: (pokemon?: TmpPartyPokemonType) => boolean;
    value: number;
    exp: number;
    ignoreDebuff: boolean;

    constructor(
        color: PokeBlockColor,
        value: number,
        exp: number,
        contestType?: ContestType[],
        description: string = `A ${PokeBlockColor[color]} Pokéblock`,
        canUse?: (pokemon?: TmpPartyPokemonType) => boolean,
        ignoreDebuff: boolean = false,
        displayName: string = `${PokeBlockColor[color]} Pokéblock`,
        basePrice: number = 1,
        currency: Currency = Currency.money,
    ) {
        super(`PokeBlock_${PokeBlockColor[color]}`, basePrice, currency, undefined, displayName, description, 'pokeblock');
        this.type = color;
        this.contestType = contestType;
        this._canUse = canUse;
        this.value = value;
        this.exp = exp;
        this.ignoreDebuff = ignoreDebuff;
    }

    // eslint-disable-next-line class-methods-use-this
    use(): boolean {
        return true;
    }

    canUse(pokemon: TmpPartyPokemonType): boolean {
        if (pokemon.breeding) {
            return false;
        }
        return true;
        // todo: check fullness for poffins
    }
}
