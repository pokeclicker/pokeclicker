/**
 * Created by dennis on 05-07-17.
 */
class GymBattle {

    static gym: Gym;
    static enemyPokemon: KnockoutObservable<BattlePokemon> = ko.observable(null);
    static counter: number = 0;
    static index: KnockoutObservable<number> = ko.observable(0);
    static timeLeft: KnockoutObservable<number> = ko.observable(GameConstants.GYM_TIME);

    /**
     * Probably not needed right now, but might be if we add more logic to a gameTick.
     */
    public static tick() {
        if (this.timeLeft() < 0) {
            player.gymLost();
        }
        this.timeLeft(this.timeLeft() - GameConstants.TICK_TIME);
        this.counter = 0;
        this.pokemonAttack();
    }

    /**
     * Attacks with Pokémon and checks if the enemy is defeated.
     */
    public static pokemonAttack() {
        if (!this.enemyPokemon().isAlive()) {
            return;
        }
        this.enemyPokemon().damage(player.calculatePokemonAttack(this.enemyPokemon().type1, this.enemyPokemon().type2));
        if (!this.enemyPokemon().isAlive()) {
            this.defeatPokemon();
        }
    }

    /**
     * Attacks with clicks and checks if the enemy is defeated.
     */
    public static clickAttack() {
        if (!this.enemyPokemon().isAlive()) {
            return;
        }
        this.enemyPokemon().damage(player.calculateClickAttack());
        if (!this.enemyPokemon().isAlive()) {
            this.defeatPokemon();
        }
    }

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        player.gainMoney(this.enemyPokemon().money);
        player.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        this.index(this.index() + 1);

        if (this.index() >= this.gym.pokemons.length) {
            player.gymWon(this.gym)
        } else {
            this.generateNewEnemy();
        }
    }

    /**
     * Generate a new enemy based on the current route and region.
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        this.enemyPokemon(pokemonFactory.generateTrainerPokemon(this.gym.town, this.index()));
    }
}