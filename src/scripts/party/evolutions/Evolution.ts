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
        const evolvedPokemon = this.getEvolvedPokemon();
        if (PokemonHelper.calcNativeRegion(evolvedPokemon) > player.highestRegion()) {
            return false;
        }

        if (notification) {
            Notifier.notify(`Your ${this.basePokemon} evolved into a ${evolvedPokemon}`, GameConstants.NotificationOption.success);
        }

        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(evolvedPokemon).id, shiny, true);
        return shiny;
    }

}
