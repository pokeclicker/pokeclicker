import { getEvolution } from './EvoHelpers';
import {
    calcNativeRegion,
    calcUniquePokemonsByRegion,
    displayName,
    getImage,
    getPokeballImage,
    getPokemonById,
    getPokemonByName,
    incrementPokemonStatistics,
    typeIdToString,
    typeStringToId,
    canPokemonDealDamage,
} from './PokemonHelper';

// Tmp class for scripts/pokemons/PokemonHelper to extend

export default class TmpPokemonHelper {
    static calcNativeRegion = calcNativeRegion;
    static getEvolution = getEvolution;
    static getPokemonById = getPokemonById;
    static getPokemonByName = getPokemonByName;
    static typeStringToId = typeStringToId;
    static typeIdToString = typeIdToString;
    static getImage = getImage;
    static calcUniquePokemonsByRegion = calcUniquePokemonsByRegion;
    static getPokeballImage = getPokeballImage;
    static incrementPokemonStatistics = incrementPokemonStatistics;
    static displayName = displayName;
    static canPokemonDealDamage = canPokemonDealDamage;
}
