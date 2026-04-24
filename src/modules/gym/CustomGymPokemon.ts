import * as GameConstants from '../GameConstants';
import Requirement from '../requirements/Requirement';
import GymPokemon from './GymPokemon';
import PokemonType from '../enums/PokemonType';
import { GymPokemonBaseData } from './GymPokemonBaseData';

export default class CustomGymPokemon extends GymPokemon {
    constructor(
        private displayName: string,
        maxHealth: number,
        level: number,
        private type: PokemonType[],
        private image: string,
        requirements: Requirement | Requirement[] = [],
        shiny?: boolean,
    ) {
        super('MissingNo.', maxHealth, level, requirements, shiny, GameConstants.ShadowStatus.None);
    }

    public override getBaseData(): GymPokemonBaseData {
        return {
            id: 0,
            type1: this.type[0],
            type2: this.type[1] ?? PokemonType.None,
            exp: 0,
            catchRate: 0,
            displayName: this.displayName,
            customImageName: this.image,
            incrementDefeatedStatistic: false,
        };
    }
}
