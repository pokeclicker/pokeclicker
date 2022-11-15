import type { PokemonMapProxy, PokemonList } from './PokemonList';

const container: { pokemonMap: PokemonMapProxy, pokemonList: PokemonList } = {
    pokemonMap: undefined,
    pokemonList: undefined,
};

export function setPokemonMap(map: PokemonMapProxy, list: PokemonList) {
    container.pokemonMap = map;
    container.pokemonList = list;
}

export default container;
