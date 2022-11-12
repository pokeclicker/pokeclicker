import { MaxIDPerRegion, Region } from '../GameConstants';
import { PokemonNameType } from './PokemonNameType';
import P from './mapProvider';

export function calcNativeRegion(pokemonName: PokemonNameType) {
    const pokemon = P.pokemonMap[pokemonName];
    if (pokemon.nativeRegion !== undefined) {
        return pokemon.nativeRegion;
    }
    const { id } = pokemon;
    const region = MaxIDPerRegion.findIndex((maxRegionID) => maxRegionID >= Math.floor(id));
    return region >= 0 ? region : Region.none;
}

export const TmpPokemonHelper = {
    calcNativeRegion,
};
