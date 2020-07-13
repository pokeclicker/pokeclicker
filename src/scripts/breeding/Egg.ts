class Egg implements Saveable {
    saveKey = 'egg';

    defaults = {};

    totalSteps: number;
    steps: KnockoutObservable<number>;
    shinySteps: number;
    pokemon: string;
    type: EggType;
    pokemonType1: PokemonType;
    pokemonType2: PokemonType;
    notified: boolean;
    progress: KnockoutComputed<number>;
    progressText: KnockoutComputed<string>;

    constructor(type = EggType.None, totalSteps = 0, pokemon = '', steps = 0, shinySteps = 0, notified = false) {
        this.totalSteps = totalSteps;
        this.steps = ko.observable(steps);
        this.shinySteps = shinySteps;
        this.pokemon = pokemon;
        this.type = type;
        this.notified = notified;

        this.init();
    }

    private init() {
        this.progress = ko.pureComputed(function () {
            return this.steps() / this.totalSteps * 100;
        }, this);

        this.progressText = ko.pureComputed(function () {
            return `${this.steps()} / ${this.totalSteps}`;
        }, this);

        if (this.pokemon) {
            const dataPokemon: DataPokemon = PokemonHelper.getPokemonByName(this.pokemon);
            this.pokemonType1 = dataPokemon.type1;
            this.pokemonType2 = dataPokemon.type2 === PokemonType.None ? dataPokemon.type1 : dataPokemon.type2;
        } else {
            this.pokemonType1 = PokemonType['Normal'];
            this.pokemonType2 = PokemonType['Normal'];
        }
    }

    isNone() {
        return this.type === EggType.None;
    }

    addSteps(amount: number) {
        if (this.isNone() || this.notified) {
            return;
        }
        if (!+amount) {
            amount = 1;
        }
        this.steps(this.steps() + amount);
        if (App.game.oakItems.isActive(OakItems.OakItem.Shiny_Charm)) {
            this.shinySteps += amount;
        }
        if (this.canHatch()) {
            if (this.type == EggType.Pokemon) {
                Notifier.notify({ message: `${this.pokemon} is ready to hatch!`, type: GameConstants.NotificationOption.success });
            } else {
                Notifier.notify({ message: 'An egg is ready to hatch!', type: GameConstants.NotificationOption.success });
            }
            this.notified = true;
        }
    }

    canHatch() {
        return !this.isNone() && this.steps() >= this.totalSteps;
    }

    hatch() {
        if (!this.canHatch()) {
            return;
        }
        const shinyChance = GameConstants.SHINY_CHANCE_BREEDING - (0.5 * GameConstants.SHINY_CHANCE_BREEDING * Math.min(1, this.shinySteps / this.steps()));
        const shiny = PokemonFactory.generateShiny(shinyChance);

        const partyPokemon = App.game.party.caughtPokemon.find(p => p.name == this.pokemon);
        if (partyPokemon?.breeding) {
            if (partyPokemon.evolutions !== undefined) {
                partyPokemon.evolutions.forEach(evo => evo instanceof LevelEvolution ? evo.triggered = false : undefined);
            }
            partyPokemon.exp = 0;
            partyPokemon.level = 1;
            partyPokemon.breeding = false;
            partyPokemon.level = partyPokemon.calculateLevelFromExp();
            partyPokemon.attackBonus += GameConstants.BREEDING_ATTACK_BONUS;
            partyPokemon.attack = partyPokemon.calculateAttack();
            partyPokemon.checkForLevelEvolution();
        }

        if (shiny) {
            Notifier.notify({ message: `✨ You hatched a shiny ${this.pokemon}! ✨`, type: GameConstants.NotificationOption.warning });
            App.game.logbook.newLog(LogBookTypes.SHINY, `You hatched a shiny ${this.pokemon}!`);
        } else {
            Notifier.notify({ message: `You hatched ${GameHelper.anOrA(this.pokemon)} ${this.pokemon}!`, type: GameConstants.NotificationOption.success });
        }

        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(this.pokemon).id, shiny);

        // Capture base form if not already caught. This helps players get Gen2 Pokemon that are base form of Gen1
        const baseForm = App.game.breeding.calculateBaseForm(this.pokemon);
        if (this.pokemon != baseForm && !App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(baseForm).id)) {
            Notifier.notify({ message: `You also found ${GameHelper.anOrA(baseForm)} ${baseForm} nearby!`, type: GameConstants.NotificationOption.success });
            App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(baseForm).id, shiny);
        }

        GameHelper.incrementObservable(App.game.statistics.hatchedEggs);
        App.game.oakItems.use(OakItems.OakItem.Blaze_Cassette);
    }

    toJSON(): Record<string, any> {
        return {
            totalSteps: this.totalSteps,
            steps: this.steps(),
            shinySteps: this.shinySteps,
            pokemon: this.pokemon,
            type: this.type,
            notified: this.notified,
        };

    }

    fromJSON(json: Record<string, any>): void {
        this.totalSteps = json['totalSteps'];
        this.steps = ko.observable(json['steps']);
        this.shinySteps = json['shinySteps'];
        this.pokemon = json['pokemon'];
        this.type = json['type'];
        this.notified = json['notified'];
        this.init();
    }
}
