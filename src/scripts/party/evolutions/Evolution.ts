abstract class Evolution {
    basePokemon: string;
    evolvedPokemon: string;
    triggered: boolean;
    type: EvolutionType;

    constructor(basePokemon: string, evolvedPokemon: string, type: EvolutionType) {
        this.basePokemon = basePokemon;
        this.evolvedPokemon = evolvedPokemon;
        this.type = type;
        this.triggered = false;
    }

    isSatisfied(): boolean {
        return false;
    }

    evolve(): boolean {
        if (this.triggered){
            return;
        }
        this.triggered = true;
        let shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(this.evolvedPokemon).id, shiny);
        return shiny;
    }

}
