import { MaxIDPerRegion, Region } from '../GameConstants';
import type { PokemonMapProxy } from './PokemonList';
import { PokemonNameType } from './PokemonNameType';

let pokemonMap: PokemonMapProxy;

export function calcNativeRegion(pokemonName: PokemonNameType) {
    const pokemon = pokemonMap[pokemonName];
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

export function setPokemonMap(map: PokemonMapProxy) {
    pokemonMap = map;
}
