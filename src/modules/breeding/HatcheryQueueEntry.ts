import PokemonType from '../enums/PokemonType';
import * as GameConstants from '../GameConstants';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import EggType from './EggType';

type EggNameType = keyof typeof GameConstants.EggItemType;
type FossilNameType = keyof typeof GameConstants.FossilToPokemon;

export type HatcheryQueueEntry = PokemonNameType | EggNameType | FossilNameType;

export default class HatcheryQueue {
    public static isHatcheryEgg(u: unknown): u is EggNameType { return typeof u === 'string' && Object.keys(GameConstants.EggItemType).includes(u); }
    public static isHatcheryFossil(u: unknown): u is FossilNameType { return typeof u === 'string' && Object.keys(GameConstants.FossilToPokemon).includes(u); }
    public static isHatcheryPokemon(u: HatcheryQueueEntry): u is PokemonNameType { return !HatcheryQueue.isHatcheryEgg(u) && !HatcheryQueue.isHatcheryFossil(u); }

    public static eggItemTypeToEggType = (eggName: EggNameType): EggType => {
        const type = eggName.split('_')[0];
        if (Object.keys(EggType).includes(type)) {
            return EggType[type];
        }

        return EggType.None;
    };

    public static eggTypeToEggItemType = (eggType: EggType): string => {
        const name = `${eggType}_egg`;
        if (Object.keys(GameConstants.EggItemType).includes(name)) {
            return name;
        }

        return '';
    };

    public static pokemonTypeToEggItemType = (pokemonType: PokemonType): string => {
        const name = `${PokemonType[PokemonType[pokemonType]]}_egg`;
        if (Object.keys(GameConstants.EggItemType).includes(name)) {
            return name;
        }

        return '';
    };
}
