///<reference path="../Battle.ts"/>
class GymBattle extends Battle {

    static gym: Gym;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);

    public static pokemonAttack() {
        if (GymRunner.running()) {
            super.pokemonAttack();
        }
    }

    public static clickAttack() {
        if (GymRunner.running()) {
            super.clickAttack();
        }
    }
    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon() {
        this.enemyPokemon().defeat(true);
        const enemyPokemon = this.enemyPokemon() as BattlePokemon;
        console.log(enemyPokemon);
        const isShiny: boolean = enemyPokemon.shiny;
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny);
        const monotypeIsActivated = App.game.challenges.list.monoType.active();
        const teamRocketIsActivated = App.game.challenges.list.teamRocket.active() || true;
        const isAllowedToCatch : boolean =
        (
            (monotypeIsActivated && PokemonType[enemyPokemon.type1] === App.game.challenges.list.monoType.data()[0]) ||
            (monotypeIsActivated && PokemonType[enemyPokemon.type2] === App.game.challenges.list.monoType.data()[0])
        );
        // Make gym "route" regionless
        App.game.breeding.progressEggsBattle(this.gym.badgeReward * 3 + 1, GameConstants.Region.none);
        this.index(this.index() + 1);
        if (pokeBall !== GameConstants.Pokeball.None && teamRocketIsActivated && !monotypeIsActivated) {
            this.prepareCatch(enemyPokemon, pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch(enemyPokemon);
                    if (this.index() >= this.gym.pokemons.length) {
                        GymRunner.gymWon(this.gym);
                    } else {
                        this.generateNewEnemy();
                    }
                },
                App.game.pokeballs.calculateCatchTime(pokeBall)
            )
            ;

        } else {
            if (this.index() >= this.gym.pokemons.length) {
                GymRunner.gymWon(this.gym);
            } else {
                this.generateNewEnemy();
            }
        }

        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateGymPokemon(this.gym, this.index()));
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.totalPokemons() - GymBattle.index();
    })
    protected static prepareCatch(enemyPokemon: BattlePokemon, pokeBall: GameConstants.Pokeball) {
        this.pokeball(pokeBall);
        this.catching(true);
        this.catchRateActual(this.calculateActualCatchRate(enemyPokemon, pokeBall));
        App.game.pokeballs.usePokeball(pokeBall);
    }

    protected static attemptCatch(enemyPokemon: BattlePokemon) {
        if (enemyPokemon == null) {
            this.catching(false);
            return;
        }
        if (Rand.chance(this.catchRateActual() / 100)) { // Caught
            this.catchPokemon(enemyPokemon);
        } else if (enemyPokemon.shiny) { // Failed to catch, Shiny
            App.game.logbook.newLog(LogBookTypes.ESCAPED, `The Shiny ${enemyPokemon.name} escaped!`);
        } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id)) { // Failed to catch, Uncaught
            App.game.logbook.newLog(LogBookTypes.ESCAPED, `The wild ${enemyPokemon.name} escaped!`);
        }
        this.catching(false);
        this.catchRateActual(null);
    }

    public static catchPokemon(enemyPokemon: BattlePokemon) {
        const catchRoute = Battle.route || player.town()?.dungeon?.difficultyRoute || 1;
        App.game.wallet.gainDungeonTokens(PokemonFactory.routeDungeonTokens(catchRoute, player.region));
        App.game.oakItems.use(OakItemType.Magic_Ball);
        App.game.party.gainPokemonById(enemyPokemon.id, enemyPokemon.shiny);
    }
}
