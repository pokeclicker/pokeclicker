/// <reference path="../../declarations/enums/ContestType.d.ts"/>
class ContestHelper {
    public static calculatePokemonContestAppeal(conRank: ContestRank = ContestRank.Normal, conType: ContestType = ContestType.None, type1: ContestType = ContestType.None, type2: ContestType = ContestType.None, type3: ContestType = ContestType.None, pokemons?: PartyPokemon[], includeBreeding = false): number {
        let appeal = 0;
        const pks = pokemons ? pokemons : ContestHelper.getPartyPokemonByContestTypeRank(conType, conRank);
        for (const pokemon of pks) {
            appeal += ContestHelper.calculateOnePokemonContestAppeal(pokemon, type1, type2, type3, includeBreeding);
        }

        return Math.round(appeal);
    }

    public static calculateOnePokemonContestAppeal(pokemon: PartyPokemon, type1: ContestType = ContestType.None, type2: ContestType = ContestType.None, type3: ContestType = ContestType.None, includeBreeding = false): number {
        let appeal = 0;
        const pAppeal = pokemon.contestAppeal;
        const pType1 = pokemon.currentContestType[0] ?? ContestType.None;
        const pType2 = pokemon.currentContestType[1] ?? ContestType.None;
        const pType3 = pokemon.currentContestType[2] ?? ContestType.None;

        // Check if the Pokemon is currently breeding (no appeal)
        if (includeBreeding || !pokemon.breeding) {
            appeal = pAppeal * ContestTypeHelper.getAppealModifier(pType1, pType2, pType3, type1, type2, type3);
        }

        return appeal;
    }

    public static getPartyPokemonByContestType(type: ContestType): PartyPokemon[] {
        return App.game.party.caughtPokemon.filter((p) => {
            const pk = p.currentContestType;
            return pk.some(c => c === type || c === ContestType.Balanced);
        });
    }

    public static getPartyPokemonByContestTypeRank(type: ContestType, rank: ContestRank): readonly PartyPokemon[] {
        switch (rank) {
            // Hoenn
            case ContestRank.Normal:
            case ContestRank.Super:
            case ContestRank.Hyper:
            case ContestRank.Master:
                return App.game.party.caughtPokemon;
            // Sinnoh - TODO
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                return App.game.party.caughtPokemon;
            // Kalos (in Hoenn)
            case ContestRank.Spectacular:
                if (type != ContestType.Balanced) {
                    return ContestHelper.getPartyPokemonByContestType(type);
                } else {
                    return App.game.party.caughtPokemon;
                }
            // Galar (in Sinnoh) - TODO
            case ContestRank['Brilliant Shining']:
                return App.game.party.caughtPokemon;
        }
    }

    public static contestButtonTooltip(rank: ContestRank, type: ContestType): string {
        let tooltipString = '';
        tooltipString += `<div><strong>Audience Appeal: ${ContestHelper.calculatePokemonContestAppeal(rank, type, type).toLocaleString('en-US')}</strong></div>`;
        if (rank == ContestRank.Spectacular) {
            tooltipString += '<div>Eligible Types:</div>';
            if (type != ContestType.Balanced) {
                tooltipString += `<div>${ContestType[type]}</div>`;
                tooltipString += `<div>${ContestType[5]}</div>`;
            } else {
                tooltipString += '<div>All</div>';
            }
        }
        return tooltipString;
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
