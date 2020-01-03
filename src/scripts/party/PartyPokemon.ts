class PartyPokemon implements Saveable {
    saveKey: string;

    defaults: {
        evolved: false,
        attackBonus: 0,
        exp: 0,
        breeding: false
    };

    id: number;
    name: string;

    evolved: boolean;
    baseAttack: number;
    attackBonus: number;
    exp: number;
    levelObservable: KnockoutComputed<number>;
    evolver: KnockoutSubscription[];
    breeding: KnockoutObservable<boolean>;
    attack: KnockoutComputed<number>;


    constructor(id: number, name: string, evolved: boolean, baseAttack: number, attackBonus: number, exp: number, breeding: boolean = false) {
        this.id = id;
        this.name = name;
        this.evolved = evolved;
        this.attackBonus = attackBonus;
        this.exp = exp;
        this.levelObservable = ko.computed(() => {
            return this.calculateLevel();
        });
        this.baseAttack = baseAttack;
        this.attack = ko.computed(() => {
            return this.calculateAttack();
        });

        this.breeding = ko.observable(breeding);
        this.evolver = [];
        this.checkForEvolution();
    }

    public calculateAttack(): number {
        let attackBonusMultiplier = 1 + ( this.attackBonus / 100 );
        let levelMultiplier = this.levelObservable() / 100;
        return Math.max(1, Math.floor(this.baseAttack * attackBonusMultiplier * levelMultiplier));
    }


    public calculateLevel(): number {
        let level;
        switch (PokemonHelper.getPokemonByName(this.name).levelType) {

            case GameConstants.LevelType.slow:
                level = Math.pow(this.exp * 4 / 5, 1 / 3);
                break;
            case GameConstants.LevelType.mediumslow:
                let y;
                for (let x = 1; x <= 100; x++) {
                    y = 6 / 5 * Math.pow(x, 3) - 15 * Math.pow(x, 2) + 100 * x - 140;
                    if (this.exp >= y) {
                        level = x
                    } else {
                        break;
                    }
                }
                break;
            case GameConstants.LevelType.mediumfast:
                level = Math.pow(this.exp, 1 / 3);
                break;
            case GameConstants.LevelType.fast:
                level = Math.pow(this.exp * 5 / 4, 1 / 3);
                break;
            default:
                level = Math.pow(30 * this.exp, 0.475) / (6 * Math.sqrt(5));
                break;
        }
        return Math.max(1, Math.min(100, Math.floor(level)));
    }

    public fromJSON(json: object): void {
        if (json == null) {
            return;
        }

        if (json["id"] == null) {
            return
        }

        this.evolved = json["evolved"] ?? this.defaults.evolved;
        this.attackBonus = json["attackBonus"] ?? this.defaults.attackBonus;
        this.exp = json["exp"] ?? this.defaults.exp;
        this.breeding = json["breeding"] ?? this.defaults.breeding;
    }

    public toJSON() {
        return {
            id: this.id,
            evolved: this.evolved,
            attackBonus: this.attackBonus,
            exp: this.exp,
            breeding: this.breeding
        };
    }

    public checkForEvolution(reset = false) {
        // reset if pokemon has just hatched
        if (!!reset) {
            this.evolved = false;
        }

        const pokemonData = pokemonMapId[this.id];

        // pokemon doesn't have an evolution, is already evolved, or currently breeding
        if (!pokemonData.evoLevel || this.evolved || this.breeding()) {
            return;
        }

        pokemonData.evoLevel.forEach((evo, index) => {
            if (evo.constructor === Number) {
                if (this.evolver[index]) {
                    this.evolver[index].dispose();
                }

                // Check if player has already caught all of the possible evolutions
                const obtainedAllEvolutions = reset ? !PokemonHelper.getPokemonByName(this.name).evolutionByIndex(index, true, true).some(p => !App.game.party.alreadyCaughtPokemon(this.id)) : false;

                if (obtainedAllEvolutions) {
                    this.evolved = true;
                    return;
                }

                // Get evolutions for current region, else calculate a evolution for any region for when we reach that region
                const evolution = PokemonHelper.getPokemonByName(this.name).evolutionByIndex(index, true) || PokemonHelper.getPokemonByName(this.name).evolutionByIndex(index, false);
                const evoRegion = PokemonHelper.calcNativeRegion(evolution);
                this.evolver[index] = this.levelObservable.subscribe(() => {
                    if (this.levelObservable() >= evo && player.highestRegion() >= evoRegion) {
                        Notifier.notify("Your " + this.name + " has evolved into a " + evolution, GameConstants.NotificationOption.success);
                        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(evolution).id, false);
                        player.caughtAmount[this.id](player._caughtAmount[this.id]() + 1);
                        this.evolved = true;
                        this.evolver[index].dispose();
                    }
                });
            }
        });
    }
}
