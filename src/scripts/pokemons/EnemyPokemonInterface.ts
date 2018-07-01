interface enemyPokemonInterface extends pokemonInterface {
    health: number | KnockoutObservable<number>;
    maxHealth: number | KnockoutObservable<number>;
    level: number;
    catchRate: number;
    exp: number;
    money: number;

    isAlive(): boolean;

    damage(damage: number): void;
}
