class PartyPokemon implements Saveable {
    saveKey: string;

    defaults = {
        evolved: false,
        attackBonus: 0,
        exp: 0,
        breeding: false,
    };

    id: number;
    name: string;

    baseAttack: number;
    attackBonus: number;
    exp: number;
    _level: KnockoutObservable<number>;
    evolutions: Evolution[];
    _breeding: KnockoutObservable<boolean>;
    _attack: KnockoutObservable<number>;

    constructor(id: number, name: string, evolutions: Evolution[], baseAttack: number, attackBonus: number, exp: number, breeding = false) {
        this.id = id;
        this.name = name;
        this.attackBonus = attackBonus;
        this.exp = exp;
        this.baseAttack = baseAttack;
        this._breeding = ko.observable(breeding);

        this._level = ko.observable(1);
        this._attack = ko.observable(this.calculateAttack());

        this.evolutions = evolutions;

    }

    public calculateAttack(): number {
        const attackBonusMultiplier = 1 + (this.attackBonus / 100);
        const levelMultiplier = this.level / 100;
        return Math.max(1, Math.floor(this.baseAttack * attackBonusMultiplier * levelMultiplier));
    }


    calculateLevelFromExp() {
        const levelType = PokemonHelper.getPokemonByName(this.name).levelType;
        for (let i = this.level - 1; i < levelRequirements[levelType].length; i++) {
            if (levelRequirements[levelType][i] > this.exp) {
                return i;
            }
        }
        return this.level;
    }

    public gainExp(exp: number) {
        this.exp += exp;
        const oldLevel = this.level;
        const newLevel = this.calculateLevelFromExp();
        if (oldLevel !== newLevel) {
            this.level = newLevel;
            this.attack = this.calculateAttack();
            this.checkForLevelEvolution();
        }
    }

    public checkForLevelEvolution() {
        if (this.breeding || this.evolutions == null || this.evolutions.length == 0) {
            return;
        }

        for (const evolution of this.evolutions) {
            if (evolution instanceof LevelEvolution && evolution.isSatisfied()) {
                evolution.evolve();
            }
        }
    }

    public useStone(stoneType: GameConstants.StoneType): boolean {
        const possibleEvolutions = [];
        for (const evolution of this.evolutions) {
            if (evolution instanceof StoneEvolution && evolution.stone == stoneType) {
                possibleEvolutions.push(evolution);
            }
        }
        if (possibleEvolutions.length !== 0) {
            if (this.name == 'Eevee' && stoneType == GameConstants.StoneType.Time_stone) {
                const hour = new Date().getHours();
                const evo = (hour >= 6 && hour < 18) /* Day time */ ? possibleEvolutions.find(e => e.evolvedPokemon == 'Espeon') : possibleEvolutions.find(e => e.evolvedPokemon == 'Umbreon');
                if (evo) {
                    return evo.evolve();
                }
            }
            return GameConstants.randomElement(possibleEvolutions).evolve();
        }
        return false;
    }

    public fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        if (json['id'] == null) {
            return;
        }

        this.attackBonus = json['attackBonus'] ?? this.defaults.attackBonus;
        this.exp = json['exp'] ?? this.defaults.exp;
        this.level = this.calculateLevelFromExp();
        this.attack = this.calculateAttack();
        this.breeding = json['breeding'] ?? this.defaults.breeding;

        if (this.evolutions != null) {
            for (const evolution of this.evolutions) {
                if (evolution instanceof LevelEvolution) {
                    evolution.triggered = json['levelEvolutionTriggered'];
                }
            }
        }

    }

    public toJSON() {
        let levelEvolutionTriggered = false;
        if (this.evolutions != null) {
            for (const evolution of this.evolutions) {
                if (evolution instanceof LevelEvolution && evolution.triggered) {
                    levelEvolutionTriggered = true;
                }
            }
        }
        return {
            id: this.id,
            attackBonus: this.attackBonus,
            exp: this.exp,
            breeding: this.breeding,
            levelEvolutionTriggered: levelEvolutionTriggered,
        };
    }

    // Knockout getters/setter
    get level() {
        return this._level();
    }

    set level(level: number) {
        this._level(level);
    }

    get attack() {
        return this._attack();
    }

    set attack(attack: number) {
        this._attack(attack);
    }


    get breeding() {
        return this._breeding();
    }

    set breeding(bool: boolean) {
        this._breeding(bool);
    }
}
