/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="Pokeball.ts" />

class Pokeballs implements Feature {
    name = 'Pokeballs';
    saveKey = 'pokeballs';

    defaults = {
        alreadyCaughtSelection: GameConstants.Pokeball.None,
        alreadyCaughtContagiousSelection: GameConstants.Pokeball.None,
        alreadyCaughtShinySelection: GameConstants.Pokeball.Pokeball,
        notCaughtSelection: GameConstants.Pokeball.Pokeball,
        notCaughtShinySelection: GameConstants.Pokeball.Pokeball,
    };

    public pokeballs: Pokeball[];

    public selectedSelection: KnockoutObservable<KnockoutObservable<GameConstants.Pokeball>>;
    public selectedTitle: KnockoutObservable<string>;

    constructor() {
        this.pokeballs = [
            new Pokeball(GameConstants.Pokeball.Pokeball, () => 0, 1250, 'A standard Poké Ball', undefined, 25),
            new Pokeball(GameConstants.Pokeball.Greatball, () => 5, 1000, '+5% chance to catch'),
            new Pokeball(GameConstants.Pokeball.Ultraball, () => 10, 750, '+10% chance to catch'),
            new Pokeball(GameConstants.Pokeball.Masterball, () => 100, 500, '100% chance to catch'),
            new Pokeball(GameConstants.Pokeball.Fastball, () => 0, 500, 'Reduced catch time', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            new Pokeball(GameConstants.Pokeball.Quickball, () => {
                if (App.game.gameState == GameConstants.GameState.fighting && player.route()) {
                    const kills = App.game.statistics.routeKills[GameConstants.Region[player.region]]?.[player.route()]?.() || 0;
                    // between 15 (0 kills) → 0 (4012 kills)
                    return Math.min(15, Math.max(0, Math.pow(16, 1 - Math.pow(Math.max(0, kills - 10), 0.6) / 145) - 1));
                }
                if (App.game.gameState == GameConstants.GameState.dungeon) {
                    return Math.min(15,Math.pow(DungeonRunner.timeLeftPercentage(),2) / 500);
                }
                return 0;
            }, 1000, 'Increased catch rate on routes with less Pokémon defeated', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            new Pokeball(GameConstants.Pokeball.Timerball, () => {
                if (App.game.gameState == GameConstants.GameState.fighting && player.route()) {
                    const kills = App.game.statistics.routeKills[GameConstants.Region[player.region]]?.[player.route()]?.() || 0;
                    // between 0 (0 kills) → 15 (9920 kills)
                    return Math.min(15, Math.max(0, Math.pow(16, Math.pow(kills, 0.6) / 250) - 1));
                }
                if (App.game.gameState == GameConstants.GameState.dungeon) {
                    const maxBonus = 15;
                    const timeLeftPercent = DungeonRunner.timeLeftPercentage();
                    const timeLeftPercentWhenMax = 15;
                    return (timeLeftPercentWhenMax < timeLeftPercent) ? (200 / timeLeftPercent - 2) : maxBonus;
                }
                return 0;
            }, 1000, 'Increased catch rate on routes with more Pokémon defeated', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            new Pokeball(GameConstants.Pokeball.Duskball, () => {
                const now = new Date();
                // If player in a dungeon or it's night time
                if (App.game.gameState == GameConstants.GameState.dungeon || [DayCyclePart.Dawn, DayCyclePart.Night].includes(DayCycle.currentDayCyclePart())) {
                    return 15;
                }
                return 0;
            }, 1000, 'Increased catch rate at night time or in dungeons', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),

            new Pokeball(GameConstants.Pokeball.Luxuryball, () => 0, 1250, 'A Luxury Poké Ball, awards a random currency for catches', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),

            new Pokeball(GameConstants.Pokeball.Diveball, () => {

                // If area is a water environment,
                if (MapHelper.getCurrentEnvironment() == 'Water') {
                    return 15;
                }
                return 0;
            }, 1250, 'Increased catch rate in water environments', new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)),

            new Pokeball(GameConstants.Pokeball.Lureball, () => {
                if (App.game.gameState == GameConstants.GameState.fighting && player.route()) {
                    const hasLandPokemon = Routes.getRoute(player.region,player.route()).pokemon.land.length > 0;
                    const isWaterPokemon = Routes.getRoute(player.region,player.route()).pokemon.water.includes(Battle.enemyPokemon().name);

                    // If route has Land Pokémon and the current pokémon is a Water Pokémon
                    if (hasLandPokemon && isWaterPokemon) {
                        return 15;
                    }
                }
                return 0;
            }, 1250, 'Increased catch rate on fished Pokémon', new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)),

            new Pokeball(GameConstants.Pokeball.Nestball, () => {
                const highestRegionRoutes = Routes.getRoutesByRegion(player.highestRegion());
                const maxRoute = MapHelper.normalizeRoute(highestRegionRoutes[highestRegionRoutes.length - 1].number, player.highestRegion());
                const currentRoute = MapHelper.normalizeRoute(player.route(),player.region);

                // Increased rate for earlier routes, scales with regional progression
                return Math.min(15,Math.max(1,player.highestRegion()) * Math.max(1,(maxRoute / currentRoute)));
            }, 1250, 'Increased catch rate on earlier routes', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),

            new Pokeball(GameConstants.Pokeball.Repeatball, () => {
                const amountCaught = App.game.statistics.pokemonCaptured[Battle.enemyPokemon().id]();

                return Math.min(15,Math.pow(amountCaught,2) / 5000);
            }, 1250, 'Increased catch rate and EV gain rate with more catches', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),

            new Pokeball(GameConstants.Pokeball.Beastball, () => {
                return 10;
            }, 1000, 'Can only be used on Ultra Beasts', new TemporaryBattleRequirement('Anabel')),
        ];
        this.selectedTitle = ko.observable('');
        this.selectedSelection = ko.observable();
    }

    initialize(): void {
        let subscription: KnockoutSubscription;
        this.selectedSelection.subscribe((selection) => {
            if (subscription) {
                subscription.dispose();
            }
            subscription = selection.subscribe(value => {
                // switch to Ultraball if Masterball is selected
                if (value == GameConstants.Pokeball.Masterball && App.game.challenges.list.disableMasterballs.active()) {
                    selection(GameConstants.Pokeball.Ultraball);
                    Notifier.notify({
                        title: 'Challenge Mode',
                        message: 'Master Balls are disabled!',
                        type: NotificationConstants.NotificationOption.danger,
                    });
                } else if (!this.pokeballs[value]?.unlocked()) {
                    selection(GameConstants.Pokeball.None);
                }
            });
        });
    }

    /**
     * Checks the players preferences to see what pokéball needs to be used on the next throw.
     * Checks from the players pref to the most basic ball to see if the player has any.
     * @param id the pokemon we are trying to catch.
     * @param isShiny if the Pokémon is shiny.
     * @returns {GameConstants.Pokeball} pokéball to use.
     */
    public calculatePokeballToUse(id: number, isShiny: boolean, isShadow: boolean, origEncounterType: EncounterType): GameConstants.Pokeball {
        const alreadyCaught = App.game.party.alreadyCaughtPokemon(id);
        const alreadyCaughtShiny = App.game.party.alreadyCaughtPokemon(id, true);
        const alreadyCaughtShadow = App.game.party.alreadyCaughtPokemon(id, false, true);
        const pokemon = PokemonHelper.getPokemonById(id);
        const isUltraBeast = GameConstants.UltraBeastType[pokemon.name] != undefined;
        const encounterType = isUltraBeast ? EncounterType.ultraBeast : origEncounterType;

        const pref = App.game.pokeballFilters.findMatch({
            caught: alreadyCaught,
            caughtShiny: alreadyCaughtShiny,
            caughtShadow: alreadyCaughtShadow,
            shadow: isShadow,
            shiny: isShiny,
            pokerus: App.game.party.getPokemon(id)?.pokerus,
            pokemonType: [pokemon.type1, pokemon.type2],
            encounterType,
            category: App.game.party.getPokemon(id)?.category,
        })?.ball() ?? GameConstants.Pokeball.None;

        let use: GameConstants.Pokeball = GameConstants.Pokeball.None;

        if (pref == GameConstants.Pokeball.Beastball) {
            if (isUltraBeast && this.pokeballs[GameConstants.Pokeball.Beastball].quantity() > 0) {
                return GameConstants.Pokeball.Beastball;
            } else {
                return GameConstants.Pokeball.None;
            }
        } else if (isUltraBeast) {
            return GameConstants.Pokeball.None;
        }

        if (this.pokeballs[pref]?.quantity()) {
            return pref;
        } else if (pref <= GameConstants.Pokeball.Masterball) {
            // Check which Pokeballs we have in stock that are of equal or lesser than selection (upto Masterball)
            for (let i: number = pref; i >= 0; i--) {
                if (this.pokeballs[i].quantity() > 0) {
                    use = i;
                    break;
                }
            }
            return use;
        } else {
            // Use a normal Pokeball or None if we don't have Pokeballs in stock
            return this.pokeballs[GameConstants.Pokeball.Pokeball].quantity() ? GameConstants.Pokeball.Pokeball : GameConstants.Pokeball.None;
        }
    }

    calculateCatchTime(ball: GameConstants.Pokeball): number {
        return this.pokeballs[ball].catchTime;
    }

    gainPokeballs(ball: GameConstants.Pokeball, amount: number, purchase = true): void {
        GameHelper.incrementObservable(this.pokeballs[ball].quantity, amount);
        GameHelper.incrementObservable(App.game.statistics.pokeballsObtained[ball],amount);
        if (purchase === true) {
            GameHelper.incrementObservable(App.game.statistics.pokeballsPurchased[ball],amount);
        }
    }

    usePokeball(ball: GameConstants.Pokeball): void {
        GameHelper.incrementObservable(this.pokeballs[ball].quantity, -1);
        GameHelper.incrementObservable(App.game.statistics.pokeballsUsed[ball]);
    }

    getCatchBonus(ball: GameConstants.Pokeball): number {
        return this.pokeballs[ball].catchBonus();
    }

    getBallQuantity(ball: GameConstants.Pokeball): number {
        const pokeball = this.pokeballs[ball];
        return pokeball ? pokeball.quantity() : 0;
    }

    getEPBonus(ball: GameConstants.Pokeball): number {
        const pokeballType = this.pokeballs[ball].type;
        return pokeballType == GameConstants.Pokeball.Repeatball ? GameConstants.REPEATBALL_EP_MODIFIER : 1;
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        if (json.pokeballs != null) {
            json.pokeballs.map((amt: number, type: number) => this.pokeballs[type].quantity(amt));
        }
    }

    toJSON(): Record<string, any> {
        return {
            'pokeballs': this.pokeballs.map(p => p.quantity()),
        };
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}
