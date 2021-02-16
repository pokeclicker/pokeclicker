interface EnemyPokemonInterface extends PokemonInterface {
    health: number | KnockoutObservable<number>;
    maxHealth: number | KnockoutObservable<number>;
    level: number;
    catchRate: number;
    exp: number;
    reward: Amount,

    isAlive(): boolean;
    damage(damage: number): void;
}
