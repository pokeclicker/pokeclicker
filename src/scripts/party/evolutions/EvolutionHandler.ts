class EvolutionHandler {
    static isSatisfied(data: EvoData): boolean {
        return data.restrictions.every(req => req.isCompleted());
    }

    static evolve(data: EvoData, notification = false) {
        // compare to false because it could be undefined
        if (beforeEvolve[data.trigger]?.(data) === false) {
            return false;
        }

        const evolvedPokemon = data.evolvedPokemon;

        // This Pokemon is from a region we haven't reached yet
        if (PokemonHelper.calcNativeRegion(evolvedPokemon) > player.highestRegion()) {
            return false;
        }
        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_STONE);

        const newPokemon = !App.game.party.alreadyCaughtPokemonByName(evolvedPokemon);
        if (newPokemon || shiny || notification) {
            // Notify the player if they haven't already caught the evolution, or notifications are forced
            Notifier.notify({
                message: `Your ${PokemonHelper.displayName(data.basePokemon)()} evolved into ${shiny ? 'a shiny' : GameHelper.anOrA(evolvedPokemon)} ${PokemonHelper.displayName(evolvedPokemon)()}!`,
                pokemonImage: PokemonHelper.getImage(PokemonHelper.getPokemonByName(evolvedPokemon).id, shiny, undefined, GameConstants.ShadowStatus.None),
                type: NotificationConstants.NotificationOption.success,
                sound: NotificationConstants.NotificationSound.General.new_catch,
                setting: NotificationConstants.NotificationSetting.General.new_catch,
            });
        }

        // Add shiny to logbook
        if (shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemonByName(evolvedPokemon, true)
                    ? createLogContent.evolvedShinyDupe({ basePokemon: data.basePokemon, evolvedPokemon})
                    : createLogContent.evolvedShiny({ basePokemon: data.basePokemon, evolvedPokemon })
            );
        }

        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(evolvedPokemon).id, shiny, true);

        const evolvedPartyPokemon = App.game.party.getPokemonByName(evolvedPokemon);
        if (newPokemon && App.game.challenges.list.realEvolutions.active()) {
            const basePartyPokemon = App.game.party.getPokemon(PokemonHelper.getPokemonByName(data.basePokemon).id);
            // Calculate and transfer the flat attack bonus rather than bonus percent.
            // Include all damage sources except held item and the Shadow debuff. Purified bonus is included.
            const bonusAttack = (basePartyPokemon.baseAttack * (1 + basePartyPokemon.attackBonusPercent / 100) + basePartyPokemon.attackBonusAmount)
                * Math.max(1, basePartyPokemon.shadowAttackBonus()) - basePartyPokemon.baseAttack;
            evolvedPartyPokemon.exp = basePartyPokemon.exp;
            evolvedPartyPokemon.level = basePartyPokemon.level;
            evolvedPartyPokemon.effortPoints = basePartyPokemon.effortPoints;
            evolvedPartyPokemon.pokerus = basePartyPokemon.pokerus;
            evolvedPartyPokemon.shiny = evolvedPartyPokemon.shiny || basePartyPokemon.shiny;
            evolvedPartyPokemon.attackBonusAmount = bonusAttack;
            evolvedPartyPokemon.vitaminsUsed = basePartyPokemon.vitaminsUsed;
            evolvedPartyPokemon.nickname = basePartyPokemon.nickname;
            evolvedPartyPokemon.category = basePartyPokemon.category;
            if (basePartyPokemon.heldItem()?.canUse(evolvedPartyPokemon)) {
                evolvedPartyPokemon.heldItem(basePartyPokemon.heldItem());
            }
            App.game.party.removePokemonByName(data.basePokemon);
        }

        // EVs
        if (!newPokemon) {
            evolvedPartyPokemon.effortPoints += App.game.party.calculateEffortPoints(evolvedPartyPokemon, shiny, GameConstants.ShadowStatus.None, GameConstants.STONE_EP_YIELD);
        }
        return shiny;
    }
}
