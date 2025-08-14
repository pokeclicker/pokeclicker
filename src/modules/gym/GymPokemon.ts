import * as GameConstants from '../GameConstants';
import Requirement from '../requirements/Requirement';
import type { PokemonNameType } from '../pokemons/PokemonNameType';

export default class GymPokemon {
    name: PokemonNameType;
    _maxHealth: number;
    level: number;
    shiny: boolean;
    shadow: GameConstants.ShadowStatus;
    requirements: Requirement[];

    constructor(
        name: PokemonNameType,
        maxHealth: number,
        level: number,
        requirements: Requirement | Requirement[] = [],
        shiny?: boolean,
        shadow = GameConstants.ShadowStatus.None,
        public modifier = (base: number) => base,
    ) {
        this.name = name;
        this._maxHealth = maxHealth;
        this.level = level;
        if (requirements instanceof Requirement) {
            this.requirements = [requirements];
        } else {
            this.requirements = requirements;
        }
        this.shiny = shiny;
        this.shadow = shadow;
    }

    get maxHealth() {
        return Math.round(this.modifier(this._maxHealth));
    }
}
