import PokemonTypes = GameConstants.PokemonType;

class BattlePokemon implements enemyPokemonInterface {
    name: string;
    id: number;
    type1: GameConstants.PokemonType;
    type2: GameConstants.PokemonType;
    health: KnockoutObservable<number>;
    maxHealth: KnockoutObservable<number>;
    healthPercentage: KnockoutObservable<number>;
    level: number;
    catchRate: number;
    exp: number;
    money: number;
    shiny: boolean;
        /**
     * In case you want to manually create a Pokémon instead of generating it from the route number
     * @param name Pokémon name
     * @param id Pokémon
     * @param type1 First type of the Pokémon
     * @param type2 Second type of the Pokémon
     * @param maxHealth max health that the Pokémon can have
     * @param level level is 2 times the current route
     * @param catchRate base chance of catching this Pokémon
     * @param exp base exp reward for defeating this Pokémon
     * @param money exp base exp reward for defeating this Pokémon
     * @param shiny
     */
    constructor(name: string, id: number, type1: GameConstants.PokemonType, type2: GameConstants.PokemonType, maxHealth: number, level: number, catchRate: number, exp: number, money: number, shiny: boolean) {
        this.name = name;
        this.id = id;
        this.type1 = type1;
        this.type2 = type2;
        this.health = ko.observable(maxHealth);
        this.maxHealth = ko.observable(maxHealth);
        this.healthPercentage = ko.observable(100);
        this.level = level;
        this.catchRate = catchRate;
        this.exp = exp;
        this.money = money;
        this.shiny = shiny;
    }

    public isAlive(): boolean {
        return this.health() > 0;
    }

    /**
     * Lost health without
     * @param damage
     */
    public damage(damage: number): void {
        this.health(Math.max(0, this.health() - damage));
        this.healthPercentage(Math.floor(this.health()/this.maxHealth()*100));
    }


}


