abstract class Evolution {
    basePokemon: string;
    evolvedPokemon: string;
    type: EvolutionType;

    constructor(basePokemon: string, evolvedPokemon: string, type: EvolutionType) {
        this.basePokemon = basePokemon;
        this.evolvedPokemon = evolvedPokemon;
        this.type = type;
    }

    isSatisfied(): boolean {
        return false;
    }

    evolve(): boolean {
        console.log("evolving", this.basePokemon);
        let shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(this.evolvedPokemon).id, shiny);
        return shiny;
    }

}
