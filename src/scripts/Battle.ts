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
    static lastPokemonAttack = Date.now();
    static lastClickAttack = Date.now();

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
        // TODO: figure out a better way of handling this
        // Limit pokemon attack speed, Only allow 1 attack per 900ms
        const now = Date.now();
        if (this.lastPokemonAttack > now - 900) {
            return;
        }
        this.lastPokemonAttack = now;
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
        // TODO: figure out a better way of handling this
        // Limit click attack speed, Only allow 1 attack per 20ms (50 per second)
        const now = Date.now();
        if (this.lastClickAttack > now - 20) {
            return;
        }
        this.lastClickAttack = now;
        if (!this.enemyPokemon()?.isAlive()) {
            return;
        }
        App.game.oakItems.use(OakItems.OakItem.Poison_Barb);
        GameHelper.incrementObservable(App.game.statistics.clickAttacks);
        this.enemyPokemon().damage(App.game.party.calculateClickAttack());
        if (!this.enemyPokemon().isAlive()) {
            this.defeatPokemon();
        }
    }

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        const enemyPokemon = this.enemyPokemon();
        GameHelper.incrementObservable(App.game.statistics.pokemonDefeated[enemyPokemon.id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonDefeated);
        App.game.wallet.gainMoney(enemyPokemon.money);
        App.game.party.gainExp(enemyPokemon.exp, enemyPokemon.level, false);
        this.gainShardsAfterBattle();

        GameHelper.incrementObservable(App.game.statistics.routeKills[player.route()]);

        App.game.breeding.progressEggsBattle(player.route(), player.region);
        const isShiny: boolean = enemyPokemon.shiny;
        if (isShiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonDefeated[enemyPokemon.id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonDefeated);
        }
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny);

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
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateWildPokemon(player.route(), player.region));
        const enemyPokemon = this.enemyPokemon();
        GameHelper.incrementObservable(App.game.statistics.pokemonEncountered[enemyPokemon.id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonEncountered);
        if (enemyPokemon.shiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonEncountered[enemyPokemon.id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonEncountered);
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
        const route = player.route() || player.town()?.dungeon()?.itemRoute || 1;
        App.game.wallet.gainDungeonTokens(PokemonFactory.routeDungeonTokens(route, player.region));
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
