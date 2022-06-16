import { PokemonNameType } from '../pokemons/PokemonNameType';
import { EggNameType, FossilNameType, HatcheryQueueEntryName } from './HatcheryNameTypes';
import * as GameConstants from '../GameConstants';
import EggType from './EggType';
import PokemonTypeGuards from '../pokemons/PokemonTypeGuards';

export default class HatcheryTypeGuards {
    // If u is a key in EggType | 'Mystery', excluding 'Pokemon' and 'Fossil'
    public static isHatcheryEgg(u: unknown): u is EggNameType { return typeof u === 'string' && [...Object.keys(EggType).filter((k) => !['Pokemon', 'Fossil'].includes(k)), 'Mystery'].includes(u); }

    public static isHatcheryFossil(u: unknown): u is FossilNameType { return typeof u === 'string' && Object.keys(GameConstants.FossilToPokemon).includes(u); }

    public static isHatcheryPokemon(u: HatcheryQueueEntryName): u is PokemonNameType { return PokemonTypeGuards.isPokemonNameType(u); }
}
