class DungeonBattle extends Battle {


    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        Player.gainMoney(this.enemyPokemon().money);
        Player.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        Player.addRouteKill();
        let alreadyCaught: boolean = Player.alreadyCaughtPokemon(this.enemyPokemon().name());
        let pokeBall: GameConstants.Pokeball = Player.calculatePokeballToUse(alreadyCaught);

        if (pokeBall !== GameConstants.Pokeball.None) {
            Battle.catching(true);
            setTimeout(
                () => {
                    this.throwPokeball(pokeBall);
                },
                Player.calculateCatchTime()
            )
            ;

        }

    }

}