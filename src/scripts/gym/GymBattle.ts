/**
 * Created by dennis on 05-07-17.
 */
class GymBattle extends Battle {

    static gym: Gym;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);

    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon() {
        player.gainMoney(this.enemyPokemon().money);
        player.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        player.gainShards(this.enemyPokemon().type1, 5);
        if (this.enemyPokemon().type2 != -1) {
            player.gainShards(this.enemyPokemon().type2, 5);
        }
        this.index(this.index() + 1);

        if (this.index() >= this.gym.pokemons.length) {
            GymRunner.gymWon(this.gym)
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
        this.enemyPokemon(PokemonFactory.generateTrainerPokemon(this.gym.town, this.index()));
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.computed(function () {
        return GymBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.computed(function () {
        return GymBattle.totalPokemons() - GymBattle.index();
    })
}