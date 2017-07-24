///<reference path="pokemons/PokemonFactory.ts"/>

/**
 * Handles all logic related to battling
 */
class Battle {
    static enemyPokemon: KnockoutObservable<BattlePokemon> = ko.observable(null);
    static counter: number = 0;
    static catching: KnockoutObservable<boolean> = ko.observable(false);
    static pokeball: KnockoutObservable<GameConstants.Pokeball>;

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
        OakItemRunner.use("Poison Barb");
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
        player.gainShards(this.enemyPokemon());
        player.addRouteKill();
        let alreadyCaught: boolean = player.alreadyCaughtPokemon(this.enemyPokemon().name);
        let pokeBall: GameConstants.Pokeball = player.calculatePokeballToUse(alreadyCaught, this.enemyPokemon().shiny);

        if (pokeBall !== GameConstants.Pokeball.None) {
            Battle.pokeball = ko.observable(pokeBall);
            Battle.catching(true);
            setTimeout(
                () => {
                    this.throwPokeball(pokeBall);
                    this.generateNewEnemy();
                },
                player.calculateCatchTime(pokeBall)
            )
            ;

        } else {
            this.generateNewEnemy();
        }
        player.lowerItemMultipliers();
    }

    /**
     * Generate a new enemy based on the current route and region.
     * Reset the counter.
     */
    public static generateNewEnemy() {
        Battle.counter = 0;
        Battle.enemyPokemon(PokemonFactory.generateWildPokemon(player.route(), player.region));
    }

    public static throwPokeball(pokeBall: GameConstants.Pokeball) {
        player.usePokeball(pokeBall);
        let pokeballBonus = GameConstants.getCatchBonus(pokeBall);
        let oakBonus = OakItemRunner.isActive("Magic Ball") ? OakItemRunner.calculateBonus("Magic Ball") : 0;
        let chance: number = Math.floor(Math.random() * 100) - pokeballBonus - oakBonus;
        if (chance <= this.enemyPokemon().catchRate) {
            this.catchPokemon();

        }
        this.catching(false);
    }

    public static catchPokemon() {
        player.capturePokemon(this.enemyPokemon().name, this.enemyPokemon().shiny);
    }
}