class Egg implements Saveable {
    saveKey = 'egg';

    defaults = {};

    totalSteps: number;
    steps: KnockoutObservable<number>;
    shinySteps: number;
    pokemon: string;
    type: GameConstants.EggType;
    pokemonType1: PokemonType;
    pokemonType2: PokemonType;
    notified: boolean;
    progress: KnockoutComputed<number>;
    progressText: KnockoutComputed<string>;

    constructor(totalSteps: number, pokemon: string, type: GameConstants.EggType, steps = 0, shinySteps = 0, notified = false) {
        this.totalSteps = totalSteps;
        this.steps = ko.observable(steps);
        this.shinySteps = shinySteps;
        this.pokemon = pokemon;
        this.type = type;
        this.notified = notified;

        this.init();
    }

    private init() {
        this.progress = ko.computed(function () {
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

    toJSON(): object {
        return {
            totalSteps: this.totalSteps,
            steps: this.steps(),
            shinySteps: this.shinySteps,
            pokemon: this.pokemon,
            type: this.type,
            notified: this.notified,
        };

    }

    fromJSON(json: object): void {
        this.totalSteps = json['totalSteps'];
        this.steps = ko.observable(json['steps']);
        this.shinySteps = json['shinySteps'];
        this.pokemon = json['pokemon'];
        this.type = json['type'];
        this.notified = json['boolean'];
        this.init();
    }


}
