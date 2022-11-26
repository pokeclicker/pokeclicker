class GymPokemon {
    name: PokemonNameType;
    maxHealth: number;
    level: number;
    requirements: Requirement[];

    constructor(name: PokemonNameType, maxHealth: number, level: number, requirements: Requirement | Requirement[] = []) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.level = level;
        if (requirements instanceof Requirement) {
            this.requirements = [requirements];
        } else {
            this.requirements = requirements;
        }
    }
}
