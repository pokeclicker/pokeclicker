class PartyPokemon implements Saveable {
    saveKey: string;

    defaults = {
        evolved: false,
        attackBonus: 0,
        exp: 0,
        breeding: false
    };

    id: number;
    name: string;

    evolved: boolean;
    _baseAttack: KnockoutObservable<number>;
    attackBonus: number;
    _exp: KnockoutObservable<number>;
    levelObservable: KnockoutComputed<number>;
    evolver: KnockoutSubscription[];
    evolutions: Evolution[];
    _breeding: KnockoutObservable<boolean>;
    attack: KnockoutComputed<number>;


    constructor(id: number, name: string, evolutions: Evolution[], baseAttack: number, attackBonus: number, exp: number, breeding: boolean = false) {
        this.id = id;
        this.name = name;
        this.attackBonus = attackBonus;
        this._exp = ko.observable(exp);
        this._baseAttack = ko.observable(baseAttack);
        this._breeding = ko.observable(breeding);

        this.levelObservable = ko.computed(() => {
            return this.calculateLevel();
        });

        this.attack = ko.computed(() => {
            return this.calculateAttack();
        });

        this.evolver = [];
    }

    public calculateAttack(): number {
        let attackBonusMultiplier = 1 + (this.attackBonus / 100);
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

    public checkForEvolution() {
        if (this.evolved || this.breeding) {
            return;
        }

        for (let evolution of this.evolutions) {
            if (evolution.isSatisfied()) {
                evolution.evolve()
            }
        }
    }

    public useStone(type: GameConstants.StoneType) : boolean{
        for (let evolution of this.evolutions) {
            if (evolution instanceof StoneEvolution && evolution.stone == type) {
                return evolution.evolve()
            }
        }
        return false;
    }

    // Knockout getters/setter
    get exp() {
        return this._exp()
    }

    set exp(exp: number) {
        this._exp(exp);
    }

    get breeding() {
        return this._breeding()
    }

    set breeding(bool: boolean) {
        this._breeding(bool);
    }

    get baseAttack() {
        return this._baseAttack();
    }

    set baseAttack(attack: number) {
        this._baseAttack(attack);
    }
}
