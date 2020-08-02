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
        const evolvedPokemon = this.getEvolvedPokemon();

        // This Pokemon is from a region we haven't reached yet
        if (PokemonHelper.calcNativeRegion(evolvedPokemon) > player.highestRegion()) {
            return false;
        }

        // Notify the player if they haven't already caught the evolution, or notifications are forced
        if (!App.game.party.alreadyCaughtPokemonByName(evolvedPokemon) || notification) {
            Notifier.notify({ message: `Your ${this.basePokemon} evolved into a ${evolvedPokemon}`, type: GameConstants.NotificationOption.success });
        }

        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(evolvedPokemon).id, shiny, true);
        return shiny;
    }

}
