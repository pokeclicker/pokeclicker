class WandererPokemon {
    public farmPoint: number;
    public catching: KnockoutObservable<boolean>;
    public pokeball: KnockoutObservable<GameConstants.Pokeball>;
    public frightened: boolean;

    constructor(
        public name: PokemonNameType,
        public berry: BerryType,
        public catchRate: number,
        public shiny = false,
        public distractTime = 0
    ) {
        this.catching = ko.observable(false);
        this.pokeball = ko.observable(GameConstants.Pokeball.None);
    }

    // If distracted for long enough, flees
    public tick(): boolean {
        if (!this.distractTime || this.catching()) {
            return false;
        }
        this.distractTime += GameConstants.WANDER_TICK;
        if (this.distractTime >= 5 * GameConstants.MINUTE) {
            return true;
        }
        return false;
    }

    // Happens when plot.dies() is used
    public distract() {
        this.distractTime += 1;
    }

    public static fromJSON(wanderer: Partial<WandererPokemon>): WandererPokemon {
        if (wanderer) {
            return new WandererPokemon(wanderer.name, wanderer.berry, wanderer.catchRate, wanderer.shiny, wanderer.distractTime);
        }
        return undefined;
    }

    public toJSON(): Record<any, any> {
        const json = { name: this.name, berry: this.berry, catchRate: this.catchRate, shiny: this.shiny, ticks: this.distractTime };
        return json;
    }
}
