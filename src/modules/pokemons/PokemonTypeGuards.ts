import { pokemonNameList, PokemonNameType } from './PokemonNameType';

export default class PokemonTypeGuards {
    public static isPokemonNameType(u: unknown): u is PokemonNameType {
        return typeof u === 'string' && pokemonNameList.includes(u as PokemonNameType);
    }
}
