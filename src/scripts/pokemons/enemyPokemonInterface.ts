interface enemyPokemonInterface extends pokemonInterface{
    health: number;
    maxHealth: number;
    catchRate: number;
    exp: number;
    money: number;

    isAlive(): boolean;
    defeat(): any;
    damage(damage:number): void;
}
