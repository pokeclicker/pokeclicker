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

    evolve(notification = false): boolean {
        // This Pokemon is from a region we haven't reached yet
        if (PokemonHelper.calcNativeRegion(this.evolvedPokemon) > player.highestRegion()) {
            return false;
        }

        // Notify the player if they haven't already caught the evolution, or notifications are enabled
        if (!App.game.party.alreadyCaughtPokemonByName(this.evolvedPokemon) || notification) {
            Notifier.notify({ message: `Your ${this.basePokemon} evolved into a ${this.evolvedPokemon}`, type: GameConstants.NotificationOption.success });
        }

        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(this.evolvedPokemon).id, shiny, true);
        return shiny;
    }

}
