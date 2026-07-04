import PokemonType from '../enums/PokemonType';
import { Genders } from '../GameConstants';

export interface GymPokemonBaseData {
    id: number;
    type1: PokemonType;
    type2: PokemonType;
    exp: number;
    catchRate: number;
    genderData?: { femaleRatio: number, type: Genders };
    displayName?: string;
    customImageName?: string;
    incrementDefeatedStatistic: boolean;
}
