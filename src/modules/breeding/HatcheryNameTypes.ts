import * as GameConstants from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import EggType from './EggType';

export type EggNameType = keyof typeof EggType;
export type FossilNameType = keyof typeof GameConstants.FossilToPokemon;
export type HatcheryQueueEntryName = PokemonNameType | EggNameType | FossilNameType;
