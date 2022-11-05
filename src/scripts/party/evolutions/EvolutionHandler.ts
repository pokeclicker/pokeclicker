class EvolutionHandler {
    static isSatisfied(data: EvoData): boolean {
        return data.restrictions.every(fn => fn());
    }

    static evolve(data: EvoData, notification = false) {
        if (beforeEvolve[data.trigger] && !beforeEvolve[data.trigger](data)) {
            return false;
        }

        const evolvedPokemon = data.evolvedPokemon;

        // This Pokemon is from a region we haven't reached yet
        if (PokemonHelper.calcNativeRegion(evolvedPokemon) > player.highestRegion()) {
            return false;
        }
        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);

        // Notify the player if they haven't already caught the evolution, it's shiny, or notifications are forced
        if (!App.game.party.alreadyCaughtPokemonByName(evolvedPokemon) || shiny || notification) {
            Notifier.notify({
                message: `Your ${data.basePokemon} evolved into ${shiny ? 'a shiny' : GameHelper.anOrA(evolvedPokemon)} ${evolvedPokemon}!`,
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
            });
        }

        // Add shiny to logbook
        if (shiny) {
            App.game.logbook.newLog(LogBookTypes.SHINY, `Your ${data.basePokemon} evolved into a shiny ${evolvedPokemon}! ${App.game.party.alreadyCaughtPokemonByName(evolvedPokemon, true) ? '(duplicate)' : ''}`);
        }

        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(evolvedPokemon).id, shiny, true);

        // EVs
        const evolvedPartyPokemon = App.game.party.getPokemonByName(evolvedPokemon);
        evolvedPartyPokemon.effortPoints += App.game.party.calculateEffortPoints(evolvedPartyPokemon, shiny, GameConstants.STONE_EP_YIELD);
        return shiny;
    }
}
