abstract class Evolution {
    basePokemon: string;
    type: EvolutionType;

    constructor(basePokemon: string, type: EvolutionType) {
        this.basePokemon = basePokemon;
        this.type = type;
    }

    isSatisfied(): boolean {
        return false;
    }

    abstract getEvolvedPokemon(): string

    evolve(notification = false): boolean {
        // This Pokemon is from a region we haven't reached yet
        if (PokemonHelper.calcNativeRegion(this.getEvolvedPokemon()) > player.highestRegion()) {
            return false;
        }

        if (notification) {
            Notifier.notify(`Your ${this.basePokemon} evolved into a ${this.getEvolvedPokemon()}`, GameConstants.NotificationOption.success);
        }

        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(this.getEvolvedPokemon()).id, shiny, true);
        return shiny;
    }

}
