interface enemyPokemonInterface {
    name: string;
    type1: PokemonTypes;
    type2: PokemonTypes;
    health: number;
    maxHealth: number;
    catchRate: number;
    exp: number;
    money: number;
    shiny: boolean;

    isAlive(): boolean;
    defeat(): any;
    damage(damage:number): void;
}
