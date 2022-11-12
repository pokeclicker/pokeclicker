class MegaStone {
    saveKey = 'megastone';
    defaults: Record<string, any>;

    private attackRequired: number;

    constructor(public pokemonId: number, pokemonBaseAttack: number, private pokemonAttack: KnockoutObservable<number>) {
        this.attackRequired = pokemonBaseAttack * 40;
    }

    public getImage() {
        return `assets/images/megaStone/${this.pokemonId}.png`;
    }

    public getTooltipText() {
        if (this.canEvolve()) {
            return 'Use a keystone to evolve.';
        } else {
            return `Needs at least ${this.attackRequired.toLocaleString('en-US')} attack to mega evolve.`;
        }
    }

    public canEvolve() : boolean {
        return this.pokemonAttack() >= this.attackRequired;
    }
}
