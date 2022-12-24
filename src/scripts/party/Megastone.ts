class MegaStone {
    saveKey = 'megastone';
    defaults: Record<string, any>;

    private attackRequired: number;

    constructor(public pokemonId: number, pokemonBaseAttack: number, private pokemonAttack: KnockoutObservable<number>) {
        this.attackRequired = pokemonBaseAttack * 500;
    }

    public getImage() {
        return `assets/images/megaStone/${this.pokemonId}.png`;
    }

    public getTooltipText() {
        if (this.canEvolve()) {
            return 'Use a Key Stone to Mega Evolve.';
        } else {
            return `Needs at least ${this.attackRequired.toLocaleString('en-US')} attack to Mega Evolve.`;
        }
    }

    public canEvolve() : boolean {
        return this.pokemonAttack() >= this.attackRequired;
    }
}
