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

    gainPokemonById(id: number, shiny = false, suppressNotification = false, gender = -1) {
        // If no gender defined, calculate it
        if (gender === -1) {
            gender = PokemonFactory.generateGenderById(id);
        }
        this.gainPokemon(PokemonFactory.generatePartyPokemon(id, shiny, gender), suppressNotification);
    }

    gainPokemon(pokemon: PartyPokemon, suppressNotification = false) {
        PokemonHelper.incrementPokemonStatistics(pokemon.id, GameConstants.PokemonStatiticsType.Captured, pokemon.shiny, pokemon.gender);
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

        const maxLevel = App.game.badgeCase.maxLevel();
        for (const pokemon of this.caughtPokemon) {
            if (pokemon.level < maxLevel) {
                pokemon.gainExp(expTotal);
            }
        }
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */

    public calculatePokemonAttack(type1: PokemonType = PokemonType.None, type2: PokemonType = PokemonType.None, ignoreRegionMultiplier = false, region: GameConstants.Region = player.region, includeBreeding = false, useBaseAttack = false, overrideWeather?: WeatherType, ignoreLevel = false, includeFlute = true): number {
        let attack = 0;
        for (const pokemon of this.caughtPokemon) {
            if (region == GameConstants.Region.alola && player.region == GameConstants.Region.alola && player.subregion == GameConstants.AlolaSubRegions.MagikarpJump &&
                Math.floor(pokemon.id) != 129) {
                // Only magikarps can attack in magikarp jump
                continue;
            }
            attack += this.calculateOnePokemonAttack(pokemon, type1, type2, region, ignoreRegionMultiplier, includeBreeding, useBaseAttack, overrideWeather, ignoreLevel, includeFlute);
        }

        const bonus = this.multiplier.getBonus('pokemonAttack');

        return Math.round(attack * bonus);
    }

    public calculateOnePokemonAttack(pokemon: PartyPokemon, type1: PokemonType = PokemonType.None, type2: PokemonType = PokemonType.None, region: GameConstants.Region = player.region, ignoreRegionMultiplier = false, includeBreeding = false, useBaseAttack = false, overrideWeather: WeatherType, ignoreLevel = false, includeFlute = true): number {
        let multiplier = 1, attack = 0;
        const pAttack = useBaseAttack ? pokemon.baseAttack : (ignoreLevel ? pokemon.calculateAttack(ignoreLevel) : pokemon.attack);
        const nativeRegion = PokemonHelper.calcNativeRegion(pokemon.name);

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
                const dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);
                attack = pAttack * TypeHelper.getAttackModifier(dataPokemon.type1, dataPokemon.type2, type1, type2) * multiplier;
            }
        }

        // Weather boost
        const weather = Weather.weatherConditions[overrideWeather ?? Weather.currentWeather()];
        const dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);
        weather.multipliers?.forEach(value => {
            if (value.type == dataPokemon.type1) {
                attack *= value.multiplier;
            }
            if (value.type == dataPokemon.type2) {
                attack *= value.multiplier;
            }
        });

        // Should we take flute boost into account
        if (includeFlute) {
            const dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);
            FluteEffectRunner.activeGemTypes().forEach(value => {
                if (value == dataPokemon.type1) {
                    attack *= GameConstants.FLUTE_TYPE_ATTACK_MULTIPLIER;
                }
                if (value == dataPokemon.type2) {
                    attack *= GameConstants.FLUTE_TYPE_ATTACK_MULTIPLIER;
                }
            });
        }

        return attack;
    }

    public getRegionAttackMultiplier(highestRegion = player.highestRegion()): number {
        // between 0.2 -> 1 based on highest region
        return Math.min(1, Math.max(0.2, 0.1 + (highestRegion / 10)));
    }

    public calculateEffortPoints(pokemon: PartyPokemon, shiny: boolean, number = GameConstants.BASE_EP_YIELD, ignore = false): number {
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

    alreadyCaughtPokemon(id: number, shiny = false) {
        const pokemon = this.getPokemon(id);
        if (pokemon) {
            return (!shiny || pokemon.shiny);
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
