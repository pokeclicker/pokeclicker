class PartyPokemon implements Saveable {
    saveKey: string;

    defaults = {
        evolved: false,
        attackBonusPercent: 0,
        attackBonusAmount: 0,
        proteinsUsed: 0,
        exp: 0,
        breeding: false,
        shiny: false,
    };

    _breeding: KnockoutObservable<boolean>;
    _shiny: KnockoutObservable<boolean>;
    _level: KnockoutObservable<number>;
    _attack: KnockoutObservable<number>;
    proteinsUsed: KnockoutObservable<number>;

    constructor(
        public id: number,
        public name: string,
        public evolutions: Evolution[],
        public baseAttack: number,
        public attackBonusPercent: number = 0,
        public attackBonusAmount: number = 0,
        proteinsUsed,
        public exp: number = 0,
        breeding = false,
        shiny = false
    ) {
        this.proteinsUsed = ko.observable(proteinsUsed);
        this._breeding = ko.observable(breeding);
        this._shiny = ko.observable(shiny);
        this._level = ko.observable(1);
        this._attack = ko.observable(this.calculateAttack());
    }

    public calculateAttack(): number {
        const attackBonusMultiplier = 1 + (this.attackBonusPercent / 100);
        const levelMultiplier = this.level / 100;
        return Math.max(1, Math.floor((this.baseAttack * attackBonusMultiplier + this.attackBonusAmount) * levelMultiplier));
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
            if (evolution instanceof StoneEvolution && evolution.stone == stoneType && evolution.isSatisfied()) {
                possibleEvolutions.push(evolution);
            }
        }
        if (possibleEvolutions.length !== 0) {
            return GameConstants.randomElement(possibleEvolutions).evolve();
        }
        return false;
    }

    public useProtein() {
        if (this.proteinsUsed() >= player.highestRegion() * 10) {
            Notifier.notify({
                message: 'This Pokemon cannot increase it\'s power any higher!',
                type: NotificationConstants.NotificationOption.warning,
            });
            return;
        }
        if (ItemHandler.useItem('Protein')) {
            GameHelper.incrementObservable(this.proteinsUsed);
        }
    }

    public fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        if (json['id'] == null) {
            return;
        }

        this.attackBonusPercent = json['attackBonusPercent'] ?? this.defaults.attackBonusPercent;
        this.attackBonusAmount = json['attackBonusAmount'] ?? this.defaults.attackBonusAmount;
        this.proteinsUsed = ko.observable(json['proteinsUsed'] ?? this.defaults.proteinsUsed);
        this.exp = json['exp'] ?? this.defaults.exp;
        this.breeding = json['breeding'] ?? this.defaults.breeding;
        this.shiny = json['shiny'] ?? this.defaults.shiny;
        this.level = this.calculateLevelFromExp();
        this.attack = this.calculateAttack();

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
            attackBonusPercent: this.attackBonusPercent,
            attackBonusAmount: this.attackBonusAmount,
            proteinsUsed: this.proteinsUsed(),
            exp: this.exp,
            breeding: this.breeding,
            shiny: this.shiny,
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

    get shiny() {
        return this._shiny();
    }

    set shiny(bool: boolean) {
        this._shiny(bool);
    }
}
