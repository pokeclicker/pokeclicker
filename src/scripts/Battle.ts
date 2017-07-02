///<reference path="pokemons/PokemonFactory.ts"/>

/**
 * Handles all logic related to battling
 */
class Battle {
    static enemyPokemon: KnockoutObservable<BattlePokemon> = ko.observable(null);
    static counter: number = 0;
    static catching: KnockoutObservable<boolean> = ko.observable(false);

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
        if (!this.enemyPokemon().isAlive()) {
            return;
        }
        this.enemyPokemon().damage(Player.calculatePokemonAttack(this.enemyPokemon().type1, this.enemyPokemon().type2));
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
        this.enemyPokemon().damage(Player.calculateClickAttack());
        if (!this.enemyPokemon().isAlive()) {
            this.defeatPokemon();
        }
    }

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
            this.throwPokeball(pokeBall);
            console.log("asdasd");
            Battle.catching(true);
            setTimeout(this.generateNewEnemy,
                Player.calculateCatchTime()
            )
            ;

        } else {
            this.generateNewEnemy();
        }

    }

    /**
     * Generate a new enemy based on the current route and region.
     * Reset the counter.
     */
    public static generateNewEnemy() {
        Battle.catching(false);
        Battle.counter = 0;
        Battle.enemyPokemon(pokemonFactory.generateWildPokemon(Player.route(), Player.region));
    }

    public static throwPokeball(pokeBall: GameConstants.Pokeball) {
        Player.usePokeball(pokeBall);
        let chance: number = Math.floor(Math.random() * 100 + 1);
        if (chance <= this.enemyPokemon().catchRate) {
            this.catchPokemon(this.enemyPokemon().name());
        }
    }

    public static catchPokemon(pokemonName: string) {
        Player.capturePokemon(pokemonName);
    }
}