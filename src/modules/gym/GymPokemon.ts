import * as GameConstants from '../GameConstants';
import Requirement from '../requirements/Requirement';
import type { PokemonNameType } from '../pokemons/PokemonNameType';
import { GymPokemonBaseData } from './GymPokemonBaseData';
import { getPokemonByName } from '../pokemons/PokemonHelper';

export default class GymPokemon {
    name: PokemonNameType;
    maxHealth: number;
    level: number;
    shiny: boolean;
    shadow: GameConstants.ShadowStatus;
    requirements: Requirement[];

    constructor(name: PokemonNameType, maxHealth: number, level: number, requirements: Requirement | Requirement[] = [], shiny?: boolean, shadow = GameConstants.ShadowStatus.None) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.level = level;
        if (requirements instanceof Requirement) {
            this.requirements = [requirements];
        } else {
            this.requirements = requirements;
        }
        this.shiny = shiny;
        this.shadow = shadow;
    }

    public getBaseData(): GymPokemonBaseData {
        const basePokemon = getPokemonByName(this.name);
        return {
            id: basePokemon.id,
            type1: basePokemon.type1,
            type2: basePokemon.type2,
            exp: basePokemon.exp,
            catchRate: basePokemon.catchRate,
            genderData: basePokemon.gender,
            incrementDefeatedStatistic: true,
        };
    }
}
