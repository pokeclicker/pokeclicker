class ContestHelper {
    public static calculatePokemonContestAppeal(type1: ContestType = ContestType.None, type2: ContestType = ContestType.None, type3: ContestType = ContestType.None, pokemons?: PartyPokemon[], includeBreeding = false): number {
        let appeal = 0;
        const pks = pokemons ? pokemons : App.game.party.caughtPokemon;
        for (const pokemon of pks) {
            appeal += this.calculateOnePokemonContestAppeal(pokemon, type1, type2, type3, includeBreeding);
        }

        return Math.round(appeal);
    }

    public static calculateOnePokemonContestAppeal(pokemon: PartyPokemon, type1: ContestType = ContestType.None, type2: ContestType = ContestType.None, type3: ContestType = ContestType.None, includeBreeding = false): number {
        let appeal = 0;
        const pAppeal = pokemon.contestAppeal;
        const dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);

        // Check if the Pokemon is currently breeding (no appeal)
        if (includeBreeding || !pokemon.breeding) {
            appeal = pAppeal * ContestTypeHelper.getAppealModifier(dataPokemon.contestType1, dataPokemon.contestType2, dataPokemon.contestType3, type1, type2, type3);
        }

        return appeal;
    }
}
