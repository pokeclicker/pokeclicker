/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Saveable.d.ts" />
/// <reference path="../../declarations/breeding/EggType.d.ts" />

class Egg implements Saveable {
    saveKey = 'egg';

    defaults = {};

    steps: KnockoutObservable<number>;
    pokemonType1: PokemonType;
    pokemonType2: PokemonType;
    progress: KnockoutComputed<number>;
    progressText: KnockoutComputed<string>;
    stepsRemaining: KnockoutComputed<number>;
    partyPokemon: KnockoutObservable<PartyPokemon>;

    constructor(
        public type = EggType.None,
        public totalSteps = 0,
        public pokemon: number = 0, // MissingNo.
        steps = 0,
        public shinyChance = GameConstants.SHINY_CHANCE_BREEDING,
        public notified = false
    ) {
        this.steps = ko.observable(steps);
        this.partyPokemon = ko.observable();
        this.init();
    }

    private init(initial = false) {
        this.progress = ko.pureComputed(function () {
            return this.steps() / this.totalSteps * 100;
        }, this);

        this.progressText = ko.pureComputed(function () {
            return `${this.steps().toLocaleString('en-US')} / ${this.totalSteps.toLocaleString('en-US')}`;
        }, this);

        this.stepsRemaining = ko.pureComputed(function () {
            return this.totalSteps - this.steps();
        }, this);

        if (this.pokemon) {
            const dataPokemon: DataPokemon = PokemonHelper.getPokemonById(this.pokemon);
            this.pokemonType1 = dataPokemon.type1;
            this.pokemonType2 = dataPokemon.type2 === PokemonType.None ? dataPokemon.type1 : dataPokemon.type2;
        } else {
            this.pokemonType1 = PokemonType.Normal;
            this.pokemonType2 = PokemonType.Normal;
        }

        this.setPartyPokemon();
    }

    setPartyPokemon() {
        if (!this.partyPokemon() && App.game?.party) {
            this.partyPokemon(this.type !== EggType.None ? App.game.party.getPokemon(PokemonHelper.getPokemonById(this.pokemon).id) : null);
        }
    }

    isNone() {
        return this.type === EggType.None;
    }

    updateShinyChance(steps: number, multiplier) {
        const stepsChance = GameConstants.SHINY_CHANCE_BREEDING / multiplier.getBonus('shiny');
        const newChance = ((this.shinyChance * this.steps()) + (stepsChance * steps)) / (this.steps() + steps);

        this.shinyChance = newChance;
    }

    addSteps(amount: number, multiplier: Multiplier, helper = false) {
        if (this.isNone() || this.notified) {
            return;
        }
        if (!+amount) {
            amount = 1;
        }
        this.updateShinyChance(amount, multiplier);
        this.steps(this.steps() + amount);
        if (this.canHatch() && !helper) {
            if (this.type == EggType.Pokemon) {
                Notifier.notify({
                    message: `${PokemonHelper.displayName(PokemonHelper.getPokemonById(this.pokemon).name)()} is ready to hatch!`,
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.Hatchery.ready_to_hatch,
                    setting: NotificationConstants.NotificationSetting.Hatchery.ready_to_hatch,
                });
            } else {
                Notifier.notify({
                    message: 'An egg is ready to hatch!',
                    type: NotificationConstants.NotificationOption.success,
                    sound: NotificationConstants.NotificationSound.Hatchery.ready_to_hatch,
                    setting: NotificationConstants.NotificationSetting.Hatchery.ready_to_hatch,
                });
            }
            this.notified = true;
        }
    }

    canHatch(): boolean {
        return !this.isNone() && this.steps() >= this.totalSteps;
    }

    hatch(efficiency = 100, helper = false): boolean {
        if (!this.canHatch()) {
            return false;
        }
        const shiny = PokemonFactory.generateShiny(this.shinyChance, true);

        const partyPokemon = this.partyPokemon();
        // If the party pokemon exist, increase it's damage output

        const pokemonID = PokemonHelper.getPokemonById(this.pokemon).id;
        const gender = PokemonFactory.generateGenderById(pokemonID);
        if (partyPokemon) {
            // Increase attack
            partyPokemon.attackBonusPercent += Math.max(1, Math.round(GameConstants.BREEDING_ATTACK_BONUS * (efficiency / 100)));
            partyPokemon.attackBonusAmount += Math.max(0, Math.round(partyPokemon.proteinsUsed() * (efficiency / 100)));

            // If breeding (not store egg), reset level, reset evolution check
            if (partyPokemon.breeding) {
                if (partyPokemon.evolutions !== undefined) {
                    partyPokemon.evolutions.forEach(evo => evo.trigger === EvoTrigger.LEVEL ? (evo as LevelEvoData).triggered(false) : undefined);
                }
                partyPokemon.exp = 0;
                partyPokemon.level = 1;
                partyPokemon.breeding = false;
                partyPokemon.level = partyPokemon.calculateLevelFromExp();
                partyPokemon.checkForLevelEvolution();
                if (partyPokemon.pokerus == GameConstants.Pokerus.Infected) {
                    partyPokemon.pokerus = GameConstants.Pokerus.Contagious;
                }
                if (partyPokemon.evs() >= 50 && partyPokemon.pokerus == GameConstants.Pokerus.Contagious) {
                    partyPokemon.pokerus = GameConstants.Pokerus.Resistant;
                }
            }
        }

        if (shiny) {
            Notifier.notify({
                message: `✨ You hatched a shiny ${PokemonHelper.displayName(PokemonHelper.getPokemonById(this.pokemon).name)()}! ✨`,
                type: NotificationConstants.NotificationOption.warning,
                sound: NotificationConstants.NotificationSound.General.shiny_long,
                setting: NotificationConstants.NotificationSetting.Hatchery.hatched_shiny,
            });
            const pokemon = PokemonHelper.getPokemonById(this.pokemon).name;
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemon(pokemonID, true)
                    ? createLogContent.hatchedShinyDupe({ pokemon })
                    : createLogContent.hatchedShiny({ pokemon })
            );
        } else {
            Notifier.notify({
                message: `You hatched ${GameHelper.anOrA(PokemonHelper.getPokemonById(this.pokemon).name)} ${PokemonHelper.displayName(PokemonHelper.getPokemonById(this.pokemon).name)()}!`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Hatchery.hatched,
            });
        }
        App.game.party.gainPokemonById(pokemonID, shiny, undefined, gender);

        // Capture base form if not already caught. This helps players get Gen2 Pokemon that are base form of Gen1
        const pokemonName = PokemonHelper.getPokemonById(this.pokemon).name;
        const baseFormName = App.game.breeding.calculateBaseForm(pokemonName);
        const baseForm = PokemonHelper.getPokemonByName(baseFormName);
        if (pokemonName != baseFormName && !App.game.party.alreadyCaughtPokemon(baseForm.id)) {
            Notifier.notify({
                message: `You also found ${GameHelper.anOrA(baseFormName)} ${baseFormName} nearby!`,
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
            });
            App.game.party.gainPokemonById(baseForm.id, PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_BREEDING));
        }

        // Update statistics
        PokemonHelper.incrementPokemonStatistics(pokemonID, GameConstants.STATISTIC_HATCHED, shiny, gender);
        App.game.oakItems.use(OakItemType.Blaze_Cassette);
        return true;
    }

    toJSON(): Record<string, any> {
        return {
            totalSteps: this.totalSteps,
            steps: this.steps(),
            shinyChance: this.shinyChance,
            pokemon: this.pokemon,
            type: this.type,
            notified: this.notified,
        };

    }

    fromJSON(json: Record<string, any>): void {
        this.totalSteps = json.totalSteps;
        this.steps = ko.observable(json.steps);
        this.shinyChance = json.shinyChance;
        this.pokemon = json.pokemon;
        this.type = json.type;
        this.notified = json.notified;
        this.init(true);
    }
}
