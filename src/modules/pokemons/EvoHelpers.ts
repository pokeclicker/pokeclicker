import { StoneType } from '../GameConstants';
import { EvoTrigger, StoneEvoData } from './evolutions/Base';
import * as PokemonHelper from '../pokemons/PokemonHelper';

// TODO: Maybe this should be on Party instead?
// Separate file because Evo -> calcNativeRegion, and this -> Evo stuff, this + calcNative in same file = cycle
// eslint-disable-next-line import/prefer-default-export
export function getEvolution(id: number, evoType: StoneType): string {
    const pokemon = App.game.party.getPokemon(id);
    if (pokemon) {
        return pokemon.evolutions
            .find((evo) => evo.trigger === EvoTrigger.STONE && (evo as StoneEvoData).stone === evoType)
            ?.evolvedPokemon || '';
    }
    return '';
}

export function getEvolutionDepth(id: number, excludeFormChange = true, depth = 0): number {
    const pokemon = PokemonHelper.getPokemonById(id);

    if (pokemon && pokemon.evolutions) {
        const evos = pokemon.evolutions
            .filter(x => Math.floor(PokemonHelper.getPokemonByName(x.evolvedPokemon).id) != Math.floor(id) || !excludeFormChange);
        if (evos.length > 0) {
            return Math.max(...evos
                .map(x => getEvolutionDepth(PokemonHelper.getPokemonByName(x.evolvedPokemon).id, excludeFormChange, depth + 1)));
        }
    }

    return depth;
}
