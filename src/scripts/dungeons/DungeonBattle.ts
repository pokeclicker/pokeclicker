class DungeonBattle extends Battle {


    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        player.gainMoney(this.enemyPokemon().money);
        player.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        player.addRouteKill();
        let alreadyCaught: boolean = player.alreadyCaughtPokemon(this.enemyPokemon().name);
        let pokeBall: GameConstants.Pokeball = player.calculatePokeballToUse(alreadyCaught);

        if (pokeBall !== GameConstants.Pokeball.None) {
            Battle.catching(true);
            setTimeout(
                () => {
                    this.throwPokeball(pokeBall);
                },
                player.calculateCatchTime()
            )
            ;

        }

    }

}