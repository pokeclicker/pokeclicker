import { PokeBlockColor, Currency } from '../GameConstants';
import { TmpPartyPokemonType } from '../TemporaryScriptTypes';
import ContestType from '../enums/ContestType';
import { pokemonMap } from '../pokemons/PokemonList';
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

    canUse(pokemon: TmpPartyPokemonType): boolean {
        const hasBlockType = this.contestType?.some(ct => pokemon.currentContestTypes.includes(ct) || pokemonMap[pokemon.name].contestTypes.includes(ct));
        return this._canUse?.(pokemon) ?? hasBlockType ?? true;
    }
}
