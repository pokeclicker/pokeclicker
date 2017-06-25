interface enemyPokemonInterface {
    name: string;
    type1: PokemonTypes;
    type2: PokemonTypes;
    health: number;
    maxHealth: number;
    catchRate: number;
    exp: number;
    money: number;

    isAlive(): boolean;
    defeat(): any;
    damage(): void;
}
