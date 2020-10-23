class GymPokemon {
    name: keyof typeof pokemonNameIndex;
    maxHealth: number;
    level: number;

    constructor(name: keyof typeof pokemonNameIndex, maxHealth: number, level: number) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.level = level;
    }
}
