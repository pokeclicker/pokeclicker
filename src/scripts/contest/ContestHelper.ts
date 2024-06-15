/// <reference path="../../declarations/enums/ContestType.d.ts"/>
class ContestHelper {
    public static calculatePokemonContestAppeal(type1: ContestType = ContestType.None, type2: ContestType = ContestType.None, type3: ContestType = ContestType.None, pokemons?: PartyPokemon[], includeBreeding = false): number {
        let appeal = 0;
        const pks = pokemons ? pokemons : App.game.party.caughtPokemon;
        for (const pokemon of pks) {
            appeal += ContestHelper.calculateOnePokemonContestAppeal(pokemon, type1, type2, type3, includeBreeding);
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

    public static getPartyPokemonByContestType(type: ContestType): PartyPokemon[] {
        return App.game.party.caughtPokemon.filter((p) => {
            const pk = PokemonHelper.getPokemonById(p.id);
            return [pk.contestType1, pk.contestType2, pk.contestType3].some(c => c === type || c === ContestType.Balanced);
        });
    }

    public static rankAppeal: Record<ContestRank, number> = {
        [ContestRank.Practice]: 0,
        [ContestRank.Normal]: 80,
        [ContestRank.Super]: 230,
        [ContestRank.Hyper]: 380,
        [ContestRank.Master]: 600,
        [ContestRank['Super Normal']]: 680,
        [ContestRank['Super Great']]: 830,
        [ContestRank['Super Ultra']]: 980,
        [ContestRank['Super Master']]: 1200,
        [ContestRank.Spectacular]: 1420,
        [ContestRank['Brilliant Shining']]: 1640,
    };

    public static encoreWord(rank: ContestRank) {
        switch (rank) {
            case ContestRank.Practice:
                return 'Congratulations!';
            case ContestRank.Normal:
                return 'Nice!';
            case ContestRank.Super:
                return 'Super!';
            case ContestRank.Hyper:
                return 'Amazing!';
            case ContestRank.Master:
                return 'Masterful!';
            case ContestRank['Super Normal']:
                return 'Super nice!';
            case ContestRank['Super Great']:
                return 'Super great!';
            case ContestRank['Super Ultra']:
                return 'Super incredible!';
            case ContestRank['Super Master']:
                return 'Superbly masterful!';
            case ContestRank.Spectacular:
                return 'Spectacularly stunning!';
            case ContestRank['Brilliant Shining']:
                return 'Absolutely dazzling! You\'re a brilliant shining star!';
        }
    }
}
