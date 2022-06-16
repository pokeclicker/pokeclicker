import PokemonType from '../enums/PokemonType';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import { EggNameType, FossilNameType, HatcheryQueueEntryName } from './HatcheryNameTypes';
import * as GameConstants from '../GameConstants';

export default class HatcheryTypeGuards {
    // Type guards
    public static isHatcheryEgg(u: unknown): u is EggNameType { return typeof u === 'string' && [...Object.keys(PokemonType), 'Mystery'].includes(u); }
    public static isHatcheryFossil(u: unknown): u is FossilNameType { return typeof u === 'string' && Object.keys(GameConstants.FossilToPokemon).includes(u); }
    public static isHatcheryPokemon(u: HatcheryQueueEntryName): u is PokemonNameType { return typeof u === 'string' && !HatcheryTypeGuards.isHatcheryEgg(u) && !HatcheryTypeGuards.isHatcheryFossil(u); }
}
