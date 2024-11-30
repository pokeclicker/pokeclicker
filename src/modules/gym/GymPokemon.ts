import * as GameConstants from '../GameConstants';
import Requirement from '../requirements/Requirement';
import type { PokemonNameType } from '../pokemons/PokemonNameType';

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
}
