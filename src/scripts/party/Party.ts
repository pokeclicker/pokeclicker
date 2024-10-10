/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />
///<reference path="../../declarations/enums/CaughtStatus.d.ts"/>

class Party implements Feature {
    name = 'Pokemon Party';
    saveKey = 'party';

    private _caughtPokemon: KnockoutObservableArray<PartyPokemon>;

    defaults = {
        caughtPokemon: [],
    };

    hasMaxLevelPokemon: KnockoutComputed<boolean>;

    hasShadowPokemon: KnockoutComputed<boolean>;

    private _caughtPokemonLookup: KnockoutComputed<Map<number, PartyPokemon>>;

    calculateBaseClickAttack: KnockoutComputed<number>;

    constructor(private multiplier: Multiplier) {
        this._caughtPokemon = ko.observableArray([]);

        this.hasMaxLevelPokemon = ko.pureComputed(() => {
            return this.caughtPokemon.some(p => p.level === 100);
        }).extend({rateLimit: 1000});

        this.hasShadowPokemon = ko.computed(() => {
            return this.caughtPokemon.some(p => p.shadow === GameConstants.ShadowStatus.Shadow);
        }).extend({rateLimit: 1000});

        // This will be completely rebuilt each time a pokemon is caught.
        // Not ideal but still better than mutliple locations scanning through the list to find what they want
        this._caughtPokemonLookup = ko.computed(() => {
            return this.caughtPokemon.reduce((map, p) => {
                map.set(p.id, p);
                return map;
            }, new Map());
        });

        this.calculateBaseClickAttack = ko.computed(() => {
            // Base power
            // Shiny pokemon help with a 100% boost
            // Resistant pokemon give a 100% boost
            const partyClickBonus = this.activePartyPokemon.reduce((total, p) => total + p.clickAttackBonus(), 1);
            return Math.pow(partyClickBonus, 1.4);
        });

    }

    gainPokemonByName(name: PokemonNameType, shiny = false, suppressNotification = false, gender = undefined, shadow = GameConstants.ShadowStatus.None) {
        const pokemon = pokemonMap[name];
        this.gainPokemonById(pokemon.id, shiny, suppressNotification, gender, shadow);
    }

    gainPokemonById(id: number, shiny = false, suppressNotification = false, gender: GameConstants.BattlePokemonGender = PokemonFactory.generateGenderById(id), shadow = GameConstants.ShadowStatus.None) {
        this.gainPokemon(PokemonFactory.generatePartyPokemon(id, shiny, gender, shadow), suppressNotification);
    }

    gainPokemon(pokemon: PartyPokemon, suppressNotification = false) {
        PokemonHelper.incrementPokemonStatistics(pokemon.id, GameConstants.PokemonStatisticsType.Captured, pokemon.shiny, pokemon.gender, pokemon.shadow);

        const alreadyCaughtRegular = this.alreadyCaughtPokemon(pokemon.id);

        // Handle shadow
        if (pokemon.shadow) {
            const alreadyCaughtShadow = this.alreadyCaughtPokemon(pokemon.id, false, true);

            // Only set the shadow status if we have the regular in our party it doesn't already have the shadow status
            if (alreadyCaughtRegular && !alreadyCaughtShadow) {
                this.getPokemon(pokemon.id).shadow = GameConstants.ShadowStatus.Shadow;
            }

            // Only log and notify the first time we catch a shadow pokemon
            if (!alreadyCaughtShadow) {
                App.game.logbook.newLog(LogBookTypes.CAUGHT, createLogContent.capturedShadow({ pokemon: pokemon.name }));

                Notifier.notify({
                    message: `You have captured a shadow ${pokemon.displayName}!`,
                    type: NotificationConstants.NotificationOption.warning,
                    sound: NotificationConstants.NotificationSound.General.new_catch,
                    setting: NotificationConstants.NotificationSetting.General.new_catch,
                });
            }
        }

        // Handle shiny
        if (pokemon.shiny) {
            const alreadyCaughtShiny = this.alreadyCaughtPokemon(pokemon.id, true);

            // Only set the shiny status if we have the regular in our party it doesn't already have the shiny status
            if (alreadyCaughtRegular && !alreadyCaughtShiny) {
                this.getPokemon(pokemon.id).shiny = true;
            }

            // If we already have the shiny, log it
            // If we catch a new shiny, log it and notify
            if (alreadyCaughtShiny) {
                App.game.logbook.newLog(LogBookTypes.CAUGHT, createLogContent.capturedShinyDupe({ pokemon: pokemon.name }));
            } else {
                App.game.logbook.newLog(LogBookTypes.CAUGHT, createLogContent.capturedShiny({ pokemon: pokemon.name }));

                Notifier.notify({
                    message: `✨ You have captured a shiny ${pokemon.displayName}! ✨`,
                    pokemonImage: PokemonHelper.getImage(pokemon.id, pokemon.shiny, pokemon.gender),
                    type: NotificationConstants.NotificationOption.warning,
                    sound: NotificationConstants.NotificationSound.General.new_catch,
                    setting: NotificationConstants.NotificationSetting.General.new_catch,
                });
            }
        }

        // Handle the regular
        if (!alreadyCaughtRegular) {
            // We don't have this pokemon in our party yet, so add it
            this._caughtPokemon.push(pokemon);

            // Handle logging and notifying
            App.game.logbook.newLog(LogBookTypes.CAUGHT, createLogContent.captured({ pokemon: pokemon.name }));

            if (!suppressNotification) {
                Notifier.notify({
                    message: `You have captured ${GameHelper.anOrA(pokemon.name)} ${pokemon.displayName}!`,
                    pokemonImage: PokemonHelper.getImage(pokemon.id, pokemon.shiny, pokemon.gender),
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.General.new_catch,
                    setting: NotificationConstants.NotificationSetting.General.new_catch,
                });
            }
        }
    }

    public removePokemonByName(name: PokemonNameType) {
        this._caughtPokemon.remove(p => p.name == name);
    }

    public gainExp(exp = 0, level = 1, trainer = false) {
        const multBonus = this.multiplier.getBonus('exp', true);
        const trainerBonus = trainer ? 1.5 : 1;
        const expTotal = Math.floor(exp * level * trainerBonus * multBonus / 9);
        let shadowExpGained = 0;

        for (const pokemon of this.caughtPokemon) {
            const exp = pokemon.gainExp(expTotal);
            if (pokemon.shadow >= GameConstants.ShadowStatus.Shadow) {
                shadowExpGained += exp;
            }
        }
        App.game.purifyChamber.gainFlow(shadowExpGained);
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */

    public calculatePokemonAttack(
        type1: PokemonType = PokemonType.None,
        type2: PokemonType = PokemonType.None,
        ignoreRegionMultiplier = false,
        region: GameConstants.Region = player.region,
        includeBreeding = false,
        useBaseAttack = false,
        overrideWeather?: WeatherType,
        ignoreLevel = false,
        includeTempBonuses = true,
        subregion: GameConstants.SubRegions = player.subregion
    ): number {
        let attack = 0;
        const pokemon = this.partyPokemonActiveInSubRegion(region, subregion);

        for (const p of pokemon) {
            attack += this.calculateOnePokemonAttack(p, type1, type2, region, ignoreRegionMultiplier, includeBreeding, useBaseAttack, overrideWeather, ignoreLevel, includeTempBonuses);
        }

        const bonus = this.multiplier.getBonus('pokemonAttack');
        return Math.round(attack * bonus);
    }

    public calculateOnePokemonAttack(
        pokemon: PartyPokemon,
        type1: PokemonType = PokemonType.None,
        type2: PokemonType = PokemonType.None,
        region: GameConstants.Region = player.region,
        ignoreRegionMultiplier = false,
        includeBreeding = false,
        useBaseAttack = false,
        overrideWeather: WeatherType,
        ignoreLevel = false,
        includeTempBonuses = true
    ): number {
        let multiplier = 1, attack = 0;
        const pAttack = useBaseAttack ? pokemon.baseAttack : (ignoreLevel ? pokemon.calculateAttack(ignoreLevel) : pokemon.attack);
        const nativeRegion = PokemonHelper.calcNativeRegion(pokemon.name);
        const dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);

        // Check if the pokemon is in their native region
        if (!ignoreRegionMultiplier && nativeRegion != region && nativeRegion != GameConstants.Region.none) {
            // Check if the challenge mode is active
            if (App.game.challenges.list.regionalAttackDebuff.active()) {
                // Pokemon only retain a % of their total damage in other regions based on highest region.
                multiplier = this.getRegionAttackMultiplier();
            }
        }

        // Check if the Pokemon is currently breeding (no attack)
        if (includeBreeding || !pokemon.breeding) {
            if (type1 == PokemonType.None) {
                attack = pAttack * multiplier;
            } else {
                attack = pAttack * TypeHelper.getAttackModifier(dataPokemon.type1, dataPokemon.type2, type1, type2) * multiplier;
            }
        }

        // Weather boost
        const weather = Weather.weatherConditions[overrideWeather ?? Weather.currentWeather()];
        weather.multipliers?.forEach(value => {
            if (value.type == dataPokemon.type1) {
                attack *= value.multiplier;
            }
            if (value.type == dataPokemon.type2) {
                attack *= value.multiplier;
            }
        });

        // Should we take flute boost into account
        if (includeTempBonuses) {
            FluteEffectRunner.activeGemTypes().forEach(value => {
                if (value == dataPokemon.type1) {
                    attack *= GameConstants.FLUTE_TYPE_ATTACK_MULTIPLIER;
                }
                if (value == dataPokemon.type2) {
                    attack *= GameConstants.FLUTE_TYPE_ATTACK_MULTIPLIER;
                }
            });
            attack *= App.game.zMoves.getMultiplier(dataPokemon.type1, dataPokemon.type2);
        }

        return attack;
    }

    public getRegionAttackMultiplier(highestRegion = player.highestRegion()): number {
        // between 0.2 -> 1 based on highest region
        return Math.min(1, Math.max(0.2, 0.1 + (highestRegion / 10)));
    }

    public calculateEffortPoints(pokemon: PartyPokemon, shiny: boolean, shadow: GameConstants.ShadowStatus, number = GameConstants.BASE_EP_YIELD, ignore = false): number {
        if (pokemon.pokerus < GameConstants.Pokerus.Contagious) {
            return 0;
        }

        if (ignore) {
            return 0;
        }

        let EPNum = number * App.game.multiplier.getBonus('ev');

        if (pokemon.heldItem() && pokemon.heldItem() instanceof EVsGainedBonusHeldItem) {
            EPNum *= (pokemon.heldItem() as EVsGainedBonusHeldItem).gainedBonus;
        }

        if (shiny) {
            EPNum *= GameConstants.SHINY_EP_MODIFIER;
        }

        if (shadow == GameConstants.ShadowStatus.Shadow) {
            EPNum *= GameConstants.SHADOW_EP_MODIFIER;
        }

        return Math.floor(EPNum);
    }

    public pokemonAttackObservable: KnockoutComputed<number> = ko.pureComputed(() => {
        return App.game.party.calculatePokemonAttack();
    }).extend({rateLimit: 1000});

    public getPokemon(id: number): PartyPokemon | undefined {
        return this._caughtPokemonLookup().get(id);
    }

    public getPokemonByName(name: PokemonNameType): PartyPokemon | undefined {
        return this._caughtPokemonLookup().get(pokemonMap[name].id);
    }

    public partyPokemonActiveInSubRegion(region: GameConstants.Region, subregion: GameConstants.SubRegions): Array<PartyPokemon> {
        let caughtPokemon = this.caughtPokemon as Array<PartyPokemon>;
        if (region == GameConstants.Region.alola && subregion == GameConstants.AlolaSubRegions.MagikarpJump) {
            // Only magikarps can attack in magikarp jump subregion
            caughtPokemon = caughtPokemon.filter((p) => Math.floor(p.id) == 129);
        }
        return caughtPokemon;
    }

    alreadyCaughtPokemonByName(name: PokemonNameType, shiny = false) {
        return this.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(name).id, shiny);
    }

    alreadyCaughtPokemon(id: number, shiny = false, shadow = false, purified = false) {
        const pokemon = this.getPokemon(id);

        if (pokemon) {
            const shinyOkay = (!shiny || pokemon.shiny);
            const shadowOkay = (!shadow || (pokemon.shadow > GameConstants.ShadowStatus.None));
            const purifiedOkay = (!purified || (pokemon.shadow == GameConstants.ShadowStatus.Purified));
            return shinyOkay && shadowOkay && purifiedOkay;
        }
        return false;
    }

    calculateClickAttack(useItem = false): number {
        const clickAttack =  this.calculateBaseClickAttack();
        const bonus = this.multiplier.getBonus('clickAttack', useItem);
        return Math.floor(clickAttack * bonus);
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        const caughtPokemonSave = json.caughtPokemon;
        for (let i = 0; i < caughtPokemonSave.length; i++) {
            const partyPokemon = PokemonFactory.generatePartyPokemon(caughtPokemonSave[i].id);
            partyPokemon.fromJSON(caughtPokemonSave[i]);
            this._caughtPokemon.push(partyPokemon);
        }
    }

    initialize(): void {
    }

    toJSON(): Record<string, any> {
        return {
            caughtPokemon: this._caughtPokemon().map(x => x.toJSON()),
        };
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

    get caughtPokemon(): ReadonlyArray<PartyPokemon> {
        return this._caughtPokemon();
    }

    get activePartyPokemon(): ReadonlyArray<PartyPokemon> {
        return this.partyPokemonActiveInSubRegion(player.region, player.subregion);
    }

}
