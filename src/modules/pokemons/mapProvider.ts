import type { PokemonMapProxy } from './PokemonList';

const container = {
    pokemonMap: undefined,
};

export function setPokemonMap(map: PokemonMapProxy) {
    container.pokemonMap = map;
}

export default container;
