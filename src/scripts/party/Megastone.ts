class MegaStone implements Saveable {
    saveKey = 'megastone';
    defaults: Record<string, any>;

    public hasEvolved : boolean;

    constructor(public pokemonId: number) {
    }

    public getImage() {
        return `assets/images/megaStone/${this.pokemonId}.png`;
    }

    public getTooltipText() {
        return 'Still need to do stuff to mega evolve';
    }

    toJSON(): Record<string, any> {
        return {
            hasEvolved: this.hasEvolved,
        };
    }
    fromJSON(json: Record<string, any>): void {
        this.hasEvolved = json?.hasEvolved ?? false;
    }
}
