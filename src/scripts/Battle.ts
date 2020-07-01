///<reference path="pokemons/PokemonFactory.ts"/>

/**
 * Handles all logic related to battling
 */
class Battle {
    static enemyPokemon: KnockoutObservable<BattlePokemon> = ko.observable(null);

    static counter = 0;
    static catching: KnockoutObservable<boolean> = ko.observable(false);
    static catchRateActual: KnockoutObservable<number> = ko.observable(null);
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
        if (!this.enemyPokemon()?.isAlive()) {
            return;
        }
        this.enemyPokemon().damage(App.game.party.calculatePokemonAttack(this.enemyPokemon().type1, this.enemyPokemon().type2));
        if (!this.enemyPokemon().isAlive()) {
            this.defeatPokemon();
        }
    }

    /**
     * Attacks with clicks and checks if the enemy is defeated.
     */
    public static clickAttack() {
        if (!this.enemyPokemon()?.isAlive()) {
            return;
        }
        App.game.oakItems.use(OakItems.OakItem.Poison_Barb);
        GameHelper.incrementObservable(player.statistics.clicks);
        this.enemyPokemon().damage(App.game.party.calculateClickAttack());
        if (!this.enemyPokemon().isAlive()) {
            this.defeatPokemon();
        }
    }

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        GameHelper.incrementObservable(player.statistics.pokemonDefeated);
        App.game.wallet.gainMoney(this.enemyPokemon().money);
        App.game.party.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        this.gainShardsAfterBattle();

        GameHelper.incrementObservable(player.statistics.routeKills[player.route()]);

        App.game.breeding.progressEggsBattle(player.route(), player.region);
        const isShiny: boolean = this.enemyPokemon().shiny;
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(this.enemyPokemon().id, isShiny);

        if (pokeBall !== GameConstants.Pokeball.None) {
            this.prepareCatch(pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch();
                    this.generateNewEnemy();
                },
                App.game.pokeballs.calculateCatchTime(pokeBall)
            )
            ;

        } else {
            this.generateNewEnemy();
        }
        this.gainItem();
        player.lowerItemMultipliers();
        player.defeatedAmount[this.enemyPokemon().id](player.defeatedAmount[this.enemyPokemon().id]() + 1);
    }

    protected static gainShardsAfterBattle() {
        const pokemon: BattlePokemon = this.enemyPokemon();
        App.game.shards.gainShards(pokemon.shardReward, pokemon.type1);
        App.game.shards.gainShards(pokemon.shardReward, pokemon.type2);
    }

    /**
     * Generate a new enemy based on the current route and region.
     * Reset the counter.
     */
    public static generateNewEnemy() {
        Battle.counter = 0;
        Battle.enemyPokemon(PokemonFactory.generateWildPokemon(player.route(), player.region));
        if (Battle.enemyPokemon().shiny) {
            App.game.logbook.newLog(LogBookTypes.SHINY, `You encountered a Shiny ${Battle.enemyPokemon().name} on route ${player.route()}.`);
        } else if (!App.game.party.alreadyCaughtPokemon(Battle.enemyPokemon().id)) {
            App.game.logbook.newLog(LogBookTypes.NEW, `You encountered a wild ${Battle.enemyPokemon().name} on route ${player.route()}.`);
        }
    }

    protected static calculateActualCatchRate(pokeBall: GameConstants.Pokeball) {
        const pokeballBonus = App.game.pokeballs.getCatchBonus(pokeBall);
        const oakBonus = App.game.oakItems.calculateBonus(OakItems.OakItem.Magic_Ball);
        const totalChance = GameConstants.clipNumber(this.enemyPokemon().catchRate + pokeballBonus + oakBonus, 0, 100);
        return totalChance;
    }

    protected static prepareCatch(pokeBall: GameConstants.Pokeball) {
        this.pokeball = ko.observable(pokeBall);
        this.catching(true);
        this.catchRateActual(this.calculateActualCatchRate(pokeBall));
        App.game.pokeballs.usePokeball(pokeBall);
    }

    protected static attemptCatch() {
        if (this.enemyPokemon() == null) {
            this.catching(false);
            return;
        }
        const random: number = Math.floor(Math.random() * 100);
        if (random <= this.catchRateActual()) { // Caught
            this.catchPokemon();
        } else if (Battle.enemyPokemon().shiny) { // Failed to catch, Shiny
            App.game.logbook.newLog(LogBookTypes.ESCAPED, `The Shiny ${this.enemyPokemon().name} escaped!`);
        } else if (!App.game.party.alreadyCaughtPokemon(this.enemyPokemon().id)) { // Failed to catch, Uncaught
            App.game.logbook.newLog(LogBookTypes.ESCAPED, `The wild ${this.enemyPokemon().name} escaped!`);
        }
        this.catching(false);
        this.catchRateActual(null);
    }

    public static catchPokemon() {
        App.game.wallet.gainDungeonTokens(PokemonFactory.routeDungeonTokens(player.route(), player.region));
        App.game.oakItems.use(OakItems.OakItem.Magic_Ball);
        App.game.party.gainPokemonById(this.enemyPokemon().id, this.enemyPokemon().shiny);
    }

    static gainItem() {
        const p = player.route() / 1600 + 0.009375;

        if (Math.random() < p) {
            App.game.farming.gainRandomBerry();
        }
    }

}
