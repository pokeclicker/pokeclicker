import { StoneType } from '../GameConstants';
import { EvoTrigger, StoneEvoData } from './evolutions/Base';

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
