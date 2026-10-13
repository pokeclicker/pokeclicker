import * as GameConstants from '../GameConstants';
import GameHelper from '../GameHelper';
import * as PokemonHelper from '../pokemons/PokemonHelper';
import { pokemonMap } from '../pokemons/PokemonList';
import PokemonType from '../enums/PokemonType';
import { createLogContent } from '../logbook/helpers';
import { LogBookTypes } from '../logbook/LogBookTypes';
import { MultiplierDecreaser } from '../items/types';
import Routes from '../routes/Routes';
import OakItemType from '../enums/OakItemType';
import Rand from '../utilities/Rand';
import Amount from '../wallet/Amount';
import WeatherType from '../weather/WeatherType';
import type BattlePokemon from './BattlePokemon';
import type { Observable as KnockoutObservable, ObservableArray as KnockoutObservableArray } from 'knockout';


type EnemyPokemonGenerator = (pokemonIndex: number) => BattlePokemon;

/**
 * Handles all logic related to battling
 */
export default class Battle {
    private static enemyPokemonByBattle = new WeakMap<typeof Battle, KnockoutObservableArray<BattlePokemon | null>>();

    static counter = 0;
    static catching: KnockoutObservable<boolean> = ko.observable(false);
    static catchRateActual: KnockoutObservable<number | null> = ko.observable(0);
    static pokeball: KnockoutObservable<GameConstants.Pokeball> = ko.observable(GameConstants.Pokeball.Pokeball);
    static lastPokemonAttack = Date.now();
    static lastClickAttack = Date.now();
    static route;

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
        this.attackActivePokemon((pokemon) => App.game.party.calculatePokemonAttack(pokemon.type1, pokemon.type2));
    }

    /**
     * Attacks with clicks and checks if the enemy is defeated.
     */
    public static clickAttack(targetPokemon = this.firstEnemyPokemon()) {
        // click attacks disabled and we already beat the starter
        if (App.game.challenges.list.disableClickAttack.active() && player.regionStarters[GameConstants.Region.kanto]() != GameConstants.Starter.None) {
            return;
        }
        // TODO: figure out a better way of handling this
        // Limit click attack speed, Only allow 1 attack per 50ms (20 per second)
        const now = Date.now();
        if (this.lastClickAttack > now - 50) {
            return;
        }
        this.lastClickAttack = now;
        if (!targetPokemon?.isAlive() || !this.allEnemyPokemon().includes(targetPokemon)) {
            return;
        }
        GameHelper.incrementObservable(App.game.statistics.clickAttacks);
        targetPokemon.damage(App.game.party.calculateClickAttack(true));
        if (!targetPokemon.isAlive()) {
            this.defeatPokemon(targetPokemon);
        }
    }

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon(enemyPokemon = this.firstEnemyPokemon()) {
        if (!enemyPokemon) {
            return;
        }
        Battle.route = player.route;
        const region = player.region;
        const catchRoute = player.route; // Has to be set, the Battle.route is "zeroed" on region change
        enemyPokemon.defeat();

        GameHelper.incrementObservable(App.game.statistics.routeKills[player.region][Battle.route]);

        App.game.breeding.progressEggsBattle(Battle.route, player.region);
        const isShiny: boolean = enemyPokemon.shiny;
        const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);

        if (pokeBall !== GameConstants.Pokeball.None) {
            this.prepareCatch(enemyPokemon, pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch(enemyPokemon, catchRoute, region);
                    if (Battle.route != 0) {
                        this.generateNewEnemy();
                    }
                },
                App.game.pokeballs.calculateCatchTime(pokeBall),
            )
            ;

        } else {
            this.generateNewEnemy();
        }
        this.gainItem();
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Generate a new enemy based on the current route and region.
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        const enemyPokemon = PokemonFactory.generateWildPokemon(player.route, player.region, player.subregionObject());
        this.enemyPokemon([enemyPokemon]);
        PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
        // Shiny
        if (enemyPokemon.shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                    ? createLogContent.encounterShinyDupe({
                        location: Routes.getRoute(player.region, player.route).routeName,
                        pokemon: enemyPokemon.name,
                    })
                    : createLogContent.encounterShiny({
                        location: Routes.getRoute(player.region, player.route).routeName,
                        pokemon: enemyPokemon.name,
                    }),
            );
        } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id) && enemyPokemon.health()) {
            App.game.logbook.newLog(
                LogBookTypes.NEW,
                createLogContent.encounterWild({
                    location: Routes.getRoute(player.region, player.route).routeName,
                    pokemon: enemyPokemon.name,
                }),
            );
        }
    }

    protected static get enemyPokemon(): KnockoutObservableArray<BattlePokemon | null> {
        const battle = this as typeof Battle;
        let enemyPokemon = Battle.enemyPokemonByBattle.get(battle);
        if (!enemyPokemon) {
            enemyPokemon = ko.observableArray([]);
            Battle.enemyPokemonByBattle.set(battle, enemyPokemon);
        }
        return enemyPokemon;
    }

    public static firstEnemyPokemon(): BattlePokemon | null {
        return this.enemyPokemon().find((pokemon): pokemon is BattlePokemon => !!pokemon) ?? null;
    }

    protected static allEnemyPokemon(): BattlePokemon[] {
        return this.enemyPokemon().filter((pokemon): pokemon is BattlePokemon => !!pokemon);
    }

    protected static activeEnemyPokemon(): BattlePokemon[] {
        return this.allEnemyPokemon().filter((pokemon) => pokemon.isAlive());
    }

    protected static visibleEnemyPokemon(
        preservePositions: boolean,
        shouldShow: (pokemon: BattlePokemon) => boolean = (pokemon) => pokemon.isAlive(),
    ): Array<BattlePokemon | null> {
        if (!preservePositions) {
            return this.activeEnemyPokemon();
        }
        return this.enemyPokemon().map((pokemon) => pokemon && shouldShow(pokemon) ? pokemon : null);
    }

    protected static hasEnemyPokemon(enemyPokemon: BattlePokemon): boolean {
        return this.allEnemyPokemon().includes(enemyPokemon);
    }

    public static setEnemyPokemon(enemyPokemon: BattlePokemon): void {
        this.enemyPokemon([enemyPokemon]);
    }

    public static clearEnemyPokemon(): void {
        this.enemyPokemon([]);
    }

    protected static startEnemyPokemon(totalPokemons: number, generatePokemon: EnemyPokemonGenerator, maxActivePokemon = 1): void {
        const activeCount = Math.min(maxActivePokemon, totalPokemons);
        this.enemyPokemon(
            Array.from({ length: activeCount }, (_, pokemonIndex) => generatePokemon(pokemonIndex)),
        );
    }

    protected static continueEnemyPokemon(defeatedPokemon: BattlePokemon, defeatedCount: number, totalPokemons: number, generatePokemon: EnemyPokemonGenerator): void {
        const defeatedPosition = this.enemyPokemon().findIndex((pokemon) => pokemon === defeatedPokemon);
        if (defeatedPosition < 0) {
            return;
        }
        const nextPokemonIndex = defeatedCount + this.activeEnemyPokemon().length;
        const replacement = nextPokemonIndex < totalPokemons
            ? generatePokemon(nextPokemonIndex)
            : null;
        this.enemyPokemon.splice(defeatedPosition, 1, replacement);
    }

    protected static attackActivePokemon(calculateDamage: (pokemon: BattlePokemon) => number): void {
        const enemyPokemon = this.activeEnemyPokemon();
        if (!enemyPokemon.length) {
            return;
        }
        const damageMultiplier = enemyPokemon.length > 1 ? GameConstants.DOUBLE_BATTLE_DAMAGE_MULTIPLIER : GameConstants.SINGLE_BATTLE_DAMAGE_MULTIPLIER;
        enemyPokemon.forEach((pokemon) => {
            pokemon.damage(this.applyDamageMultiplier(calculateDamage(pokemon), damageMultiplier));
            if (!pokemon.isAlive()) {
                this.defeatPokemon(pokemon);
            }
        });
    }

    private static applyDamageMultiplier(damage: number, damageMultiplier: number): number {
        if (damage <= 0) {
            return 0;
        }
        return Math.max(1, Math.floor(damage * damageMultiplier));
    }

    protected static calculateActualCatchRate(enemyPokemon: BattlePokemon, pokeBall: GameConstants.Pokeball) {
        const pokeballBonus = App.game.pokeballs.getCatchBonus(pokeBall);
        const oakBonus = App.game.oakItems.calculateBonus(OakItemType.Magic_Ball);
        const totalChance = GameConstants.clipNumber(enemyPokemon.catchRate + pokeballBonus + oakBonus, 0, 100);
        return totalChance;
    }

    protected static prepareCatch(enemyPokemon: BattlePokemon, pokeBall: GameConstants.Pokeball) {
        this.pokeball(pokeBall);
        this.catching(true);
        this.catchRateActual(this.calculateActualCatchRate(enemyPokemon, pokeBall));
        App.game.pokeballs.usePokeball(pokeBall);
    }

    protected static attemptCatch(enemyPokemon: BattlePokemon, route: number, region: GameConstants.Region) {
        if (enemyPokemon == null) {
            this.catching(false);
            return;
        }
        this.resolveCatchAttempt(enemyPokemon, route, region, this.catchRateActual(), this.pokeball());
        this.catching(false);
        this.catchRateActual(null);
    }

    protected static resolveCatchAttempt(enemyPokemon: BattlePokemon, route: number, region: GameConstants.Region, catchRateActual: number, pokeball: GameConstants.Pokeball) {
        if (Rand.chance(catchRateActual / 100)) { // Caught
            this.catchPokemon(enemyPokemon, route, region, pokeball);
        } else if (enemyPokemon.shiny) { // Failed to catch, Shiny
            App.game.logbook.newLog(
                LogBookTypes.ESCAPED,
                App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                    ? createLogContent.escapedShinyDupe({ pokemon: enemyPokemon.name })
                    : createLogContent.escapedShiny({ pokemon: enemyPokemon.name }),
            );
        } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id)) { // Failed to catch, Uncaught
            App.game.logbook.newLog(
                LogBookTypes.ESCAPED,
                createLogContent.escapedWild({ pokemon: enemyPokemon.name }),
            );
        }
    }

    public static catchPokemon(enemyPokemon: BattlePokemon, route: number, region: GameConstants.Region, pokeball = this.pokeball()) {
        this.gainTokens(route, region);
        App.game.oakItems.use(OakItemType.Magic_Ball);
        App.game.party.gainPokemonById(enemyPokemon.id, enemyPokemon.shiny, undefined, enemyPokemon.gender, enemyPokemon.shadow);
        const partyPokemon = App.game.party.getPokemon(enemyPokemon.id);
        const epBonus = App.game.pokeballs.getEPBonus(pokeball);
        partyPokemon.effortPoints += App.game.party.calculateEffortPoints(partyPokemon, enemyPokemon.shiny, enemyPokemon.shadow, enemyPokemon.ep * epBonus);
    }

    public static gainTokens(route: number, region: GameConstants.Region, pokeball = this.pokeball()): Amount {
        let currencyKinds = [GameConstants.Currency.dungeonToken];
        if (pokeball === GameConstants.Pokeball.Luxuryball) {
            //currencyKinds = [
            //  GameConstants.Currency.dungeonToken,
            //  GameConstants.Currency.money,
            //  GameConstants.Currency.questPoint,
            //  GameConstants.Currency.diamond,
            //  GameConstants.Currency.farmPoint,
            //  GameConstants.Currency.battlePoint,
            //  GameConstants.Currency.contestToken,
            //];
            currencyKinds = [
                GameConstants.Currency.dungeonToken,
                GameConstants.Currency.money,
                GameConstants.Currency.questPoint,
                GameConstants.Currency.diamond,
                GameConstants.Currency.farmPoint,
                GameConstants.Currency.battlePoint,
            ];
        }
        const currencyUnits = PokemonFactory.routeDungeonTokens(route, region)
                                / GameConstants.LuxuryBallCurrencyRate[GameConstants.Currency.dungeonToken];
        const chosenCurrency = currencyKinds[Math.floor(Math.random() * currencyKinds.length)];
        return App.game.wallet.addAmount(new Amount(Math.ceil(currencyUnits * GameConstants.LuxuryBallCurrencyRate[chosenCurrency]), chosenCurrency), false);
    }

    static gainItem() {
        const p = MapHelper.normalizeRoute(Battle.route, player.region) / 1600 + 0.009375;

        if (Rand.chance(p)) {
            App.game.farming.gainRandomBerry();
        }
    }

    public static pokemonAttackTooltip(battle: typeof Battle = Battle): string {
        const enemyPokemon = battle.activeEnemyPokemon().length
            ? battle.activeEnemyPokemon()
            : battle.allEnemyPokemon();
        if (!enemyPokemon.length) {
            return '';
        }
        const damageMultiplier = enemyPokemon.length > 1 ? GameConstants.DOUBLE_BATTLE_DAMAGE_MULTIPLIER : GameConstants.SINGLE_BATTLE_DAMAGE_MULTIPLIER;
        return enemyPokemon.map((pokemon) => {
            const pokemonAttack = this.calculateTooltipPokemonAttack(battle, pokemon);
            const appliedDamage = Battle.applyDamageMultiplier(pokemonAttack, damageMultiplier);
            return `${appliedDamage.toLocaleString('en-US')} against ${pokemonMap[pokemon.name].type.map((t) => PokemonType[t]).join('&nbsp;/&nbsp;')}`;
        }).join('<br>');
    }

    private static calculateTooltipPokemonAttack(battle: typeof Battle, pokemon: BattlePokemon): number {
        if (battle.name === 'BattleFrontierBattle') {
            return App.game.party.calculatePokemonAttack(pokemon.type1, pokemon.type2, true, GameConstants.Region.none, false, false, WeatherType.Clear);
        }
        return App.game.party.calculatePokemonAttack(pokemon.type1, pokemon.type2);
    }

}
