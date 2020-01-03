abstract class Evolution {
    basePokemon: string;
    evolvedPokemon: string;

    type: EvolutionType;

    constructor(basePokemon: string, evolvedPokemon: string, type: EvolutionType) {
        this.basePokemon = basePokemon;
        this.evolvedPokemon = evolvedPokemon;
        this.type = type;
    }

    isSatisfied() : boolean {
        return false;
    }
}
