/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />
///<reference path="../../declarations/enums/CaughtStatus.d.ts"/>

class Party implements Feature {
    name = 'Pokemon Party';
    saveKey = 'party';

    _caughtPokemon: KnockoutObservableArray<PartyPokemon>;

    defaults = {
        caughtPokemon: [],
    };

    hasMaxLevelPokemon: KnockoutComputed<boolean>;

    _caughtPokemonLookup: KnockoutComputed<Map<number, PartyPokemon>>;


    constructor(private multiplier: Multiplier) {
        this._caughtPokemon = ko.observableArray([]);

        this.hasMaxLevelPokemon = ko.pureComputed(() => {
            for (let i = 0; i < this.caughtPokemon.length; i++) {
                if (this.caughtPokemon[i].level === 100) {
                    return true;
                }
            }
            return false;
        }).extend({rateLimit: 1000});

        // This will be completely rebuilt each time a pokemon is caught.
        // Not ideal but still better than mutliple locations scanning through the list to find what they want
        this._caughtPokemonLookup = ko.pureComputed(() => {
            return this.caughtPokemon.reduce((map, p) => {
                map.set(p.id, p);
                return map;
            }, new Map());
        });

    }

    gainPokemonByName(name: PokemonNameType, shiny = false, suppressNotification = false, gender = -1, shadow = GameConstants.ShadowStatus.None) {
        const pokemon = pokemonMap[name];
        this.gainPokemonById(pokemon.id, shiny, suppressNotification, gender, shadow);
    }

    gainPokemonById(id: number, shiny = false, suppressNotification = false, gender = -1, shadow = GameConstants.ShadowStatus.None) {
        // If no gender defined, calculate it
        if (gender === -1) {
            gender = PokemonFactory.generateGenderById(id);
        }
        this.gainPokemon(PokemonFactory.generatePartyPokemon(id, shiny, gender, shadow), suppressNotification);
    }

    gainPokemon(pokemon: PartyPokemon, suppressNotification = false) {
        PokemonHelper.incrementPokemonStatistics(pokemon.id, GameConstants.PokemonStatisticsType.Captured, pokemon.shiny, pokemon.gender, pokemon.shadow);

        if (pokemon.shadow) {
            // Already caught (shadow)
            if (!this.alreadyCaughtPokemon(pokemon.id, false, true)) {
                App.game.logbook.newLog(LogBookTypes.CAUGHT, createLogContent.capturedShadow({ pokemon: pokemon.name }));

                // Notify if not already caught
                Notifier.notify({
                    message: `You have captured a shadow ${pokemon.displayName}!`,
                    type: NotificationConstants.NotificationOption.warning,
                    sound: NotificationConstants.NotificationSound.General.new_catch,
                    setting: NotificationConstants.NotificationSetting.General.new_catch,
                });

                // Already caught (non shadow) we need to update the party pokemon directly
                if (this.alreadyCaughtPokemon(pokemon.id, false, false)) {
                    this.getPokemon(pokemon.id).shadow = GameConstants.ShadowStatus.Shadow;
                    if (!pokemon.shiny && pokemon.shiny) { // Will almost never happen, so don't want to have a log message, that we need to keep track of
                        this.getPokemon(pokemon.id).shiny = true;
                    }
                    return;
                }
            }
        }

        if (pokemon.shiny) {
            // Add all shiny catches to the log book
            App.game.logbook.newLog(
                LogBookTypes.CAUGHT,
                this.alreadyCaughtPokemon(pokemon.id, true)
                    ? createLogContent.capturedShinyDupe({ pokemon: pokemon.name })
                    : createLogContent.capturedShiny({ pokemon: pokemon.name })
            );
            // Already caught (shiny)
            if (this.alreadyCaughtPokemon(pokemon.id, true)) {
                return;
            }
            // Notify if not already caught
            Notifier.notify({
                message: `✨ You have captured a shiny ${pokemon.displayName}! ✨`,
                pokemonImage: PokemonHelper.getImage(pokemon.id, pokemon.shiny, pokemon.gender),
                type: NotificationConstants.NotificationOption.warning,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
            });

            // Already caught (non shiny) we need to update the party pokemon directly
            if (this.alreadyCaughtPokemon(pokemon.id, false)) {
                this.getPokemon(pokemon.id).shiny = true;
                return;
            }
        }

        // Already caught (non shiny)
        if (this.alreadyCaughtPokemon(pokemon.id, false)) {
            return;
        }

        if (!suppressNotification) {
            Notifier.notify({
                message: `You have captured ${GameHelper.anOrA(pokemon.name)} ${pokemon.displayName}!`,
                pokemonImage: PokemonHelper.getImage(pokemon.id, pokemon.shiny, pokemon.gender),
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
            });
        }

        App.game.logbook.newLog(
            LogBookTypes.CAUGHT,
            createLogContent.captured({ pokemon: pokemon.name })
        );
        this._caughtPokemon.push(pokemon);
    }

    public removePokemonByName(name: PokemonNameType) {
        this._caughtPokemon.remove(p => p.name == name);
    }

    public gainExp(exp = 0, level = 1, trainer = false) {
        const multBonus = this.multiplier.getBonus('exp', true);
        const trainerBonus = trainer ? 1.5 : 1;
        const expTotal = Math.floor(exp * level * trainerBonus * multBonus / 9);
        let expGained = 0;

        const maxLevel = App.game.badgeCase.maxLevel();
        for (const pokemon of this.caughtPokemon) {
            if (pokemon.level < maxLevel) {
                expGained += pokemon.gainExp(expTotal);
            }
        }
        App.game.purifyChamber.gainFlow(expGained);
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */

    public calculatePokemonAttack(type1: PokemonType = PokemonType.None, type2: PokemonType = PokemonType.None, ignoreRegionMultiplier = false, region: GameConstants.Region = player.region, subRegion: number = player.subregion, includeBreeding = false, useBaseAttack = false, overrideWeather?: WeatherType, ignoreLevel = false, includeFlute = true): number {
        let attack = 0;
        for (const pokemon of this.caughtPokemon) {
            attack += pokemon.calculateDamage(type1, type2, region, subRegion, ignoreRegionMultiplier, includeBreeding, useBaseAttack, overrideWeather, ignoreLevel, includeFlute);
        }

        const bonus = this.multiplier.getBonus('pokemonAttack');

        return Math.round(attack * bonus);
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

    alreadyCaughtPokemonByName(name: PokemonNameType, shiny = false) {
        return this.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(name).id, shiny);
    }

    alreadyCaughtPokemon(id: number, shiny = false, shadow = false) {
        const pokemon = this.getPokemon(id);

        if (pokemon) {
            const shinyOkay = (!shiny || pokemon.shiny);
            const shadowOkay = (!shadow || (pokemon.shadow > GameConstants.ShadowStatus.None));
            return shinyOkay && shadowOkay;
        }
        return false;
    }

    calculateClickAttack(useItem = false): number {
        // Base power
        // Shiny pokemon help with a 100% boost
        // Resistant pokemon give a 100% boost
        let caughtPokemon = this.caughtPokemon;
        if (player.region == GameConstants.Region.alola && player.subregion == GameConstants.AlolaSubRegions.MagikarpJump) {
            // Only magikarps can attack in magikarp jump subregion
            caughtPokemon = caughtPokemon.filter((p) => Math.floor(p.id) == 129);
        }
        const caught = caughtPokemon.length;
        const shiny = caughtPokemon.filter(p => p.shiny).length;
        const resistant = caughtPokemon.filter(p => p.pokerus >= GameConstants.Pokerus.Resistant).length;
        const clickAttack = Math.pow(caught + shiny + resistant + 1, 1.4) * (1 + AchievementHandler.achievementBonus());

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

}
