///<reference path="../Battle.ts"/>
class GymBattle extends Battle {

    static gym: Gym;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);

    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon() {
        App.game.wallet.gainMoney(this.enemyPokemon().money);
        App.game.party.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        App.game.breeding.progressEggs(Math.floor(Math.sqrt(this.gym.badgeReward * 3 + 1)));
        this.gainShardsAfterBattle();
        this.index(this.index() + 1);

        if (this.index() >= this.gym.pokemons.length) {
            GymRunner.gymWon(this.gym);
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
        this.enemyPokemon(PokemonFactory.generateTrainerPokemon(this.gym.pokemons[this.index()], this.index()));
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.computed(function () {
        return GymBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.computed(function () {
        return GymBattle.totalPokemons() - GymBattle.index();
    })
}
