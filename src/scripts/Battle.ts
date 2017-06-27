/**
 * Handles all logic related to battling
 */
class Battle {
    static enemyPokemon: battlePokemon;
    static counter: number = 0;

    /**
     * Probably not needed right now, but might be if we add more logic to a gameTick.
     */
    public static tick() {
        this.counter = 0;
        this.pokemonAttack();
    }

    /**
     * Attacks with Pokémon and checks if the enemy is defeated.
     */
    public static pokemonAttack() {
        this.enemyPokemon.damage(Player.calculatePokemonAttack(this.enemyPokemon.type1, this.enemyPokemon.type2));
        if (!this.enemyPokemon.isAlive()) {
            this.defeatPokemon();
        }
    }

    /**
     * Attacks with clicks and checks if the enemy is defeated.
     */
    public static clickAttack() {
        this.enemyPokemon.damage(Player.calculateClickAttack());
        if (!this.enemyPokemon.isAlive()) {
            this.defeatPokemon();
        }
    }

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        Player.gainMoney(this.enemyPokemon.money);
        Player.gainExp(this.enemyPokemon.exp);

        let alreadyCaught: boolean = Player.alreadyCaughtPokemon(this.enemyPokemon.name);
        if (Player.whichBallToUse(alreadyCaught) !== GameConstants.Pokeball.None) {
            this.throwPokeball()
        }

        this.generateNewEnemy();
    }

    /**
     * Generate a new enemy based on the current route and region.
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        this.enemyPokemon = pokemonFactory.generateWildPokemon(Player.route, Player.region);
    }

    public static throwPokeball() {
        // TODO remove a Pokéball from the inventory
        let chance: number = Math.floor(Math.random() * 100 + 1);
        if (chance <= this.enemyPokemon.catchRate) {
            this.catchPokemon();
        }
    }

    public static catchPokemon() {
        // TODO actually capture a Pokémon
    }
}