import EncounterType from '../enums/EncounterType';
import { PokemonNameType } from '../pokemons/PokemonNameType';

export type CatchOptions = {
    pokemon?: PokemonNameType,
    encounterType?: EncounterType,
};
