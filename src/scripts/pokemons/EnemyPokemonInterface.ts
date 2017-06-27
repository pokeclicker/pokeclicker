interface enemyPokemonInterface extends pokemonInterface {
    health: number;
    maxHealth: number;
    level: number;
    catchRate: number;
    exp: number;
    money: number;

    isAlive(): boolean;
    damage(damage: number): void;
}
