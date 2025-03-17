/// <reference path="../../declarations/enums/ContestType.d.ts"/>
class ContestHelper {
    public static calculatePokemonContestAppeal(conRank: ContestRank, conType: ContestType, types: ContestType[], pokemons?: PartyPokemon[], includeBreeding = false): number {
        let appeal = 0;
        const pks = pokemons ? pokemons : ContestHelper.getPartyPokemonByContestTypeRank(conType, conRank);
        for (const pokemon of pks) {
            appeal += ContestHelper.calculateOnePokemonContestAppeal(pokemon, types, includeBreeding);
        }

        return Math.round(appeal);
    }

    public static calculateOnePokemonContestAppeal(pokemon: PartyPokemon, types: ContestType[], includeBreeding = false): number {
        let appeal = 0;
        const pAppeal = pokemon.contestAppeal;
        const pType = pokemon.currentContestTypes;

        // Check if the Pokemon is currently breeding (no appeal)
        if (includeBreeding || !pokemon.breeding) {
            appeal = pAppeal * ContestTypeHelper.getAppealModifier(pType, types);
        }

        return appeal;
    }

    public static getPartyPokemonByContestType(type: ContestType): PartyPokemon[] {
        return App.game.party.caughtPokemon.filter((p) => {
            const pk = p.currentContestTypes;
            return pk.some(c => c === type);
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
                return ContestHelper.getPartyPokemonByContestType(type);
            // Galar (in Sinnoh) - TODO
            case ContestRank['Brilliant Shining']:
                return App.game.party.caughtPokemon;
        }
    }

    public static contestButtonTooltip(rank: ContestRank, type: ContestType): string {
        let tooltipString = '';
        tooltipString += `<div><strong>Audience Appeal: ${ContestHelper.calculatePokemonContestAppeal(rank, type, [type]).toLocaleString('en-US')}</strong></div>`;
        if (rank == ContestRank.Spectacular) {
            tooltipString += '<div>Eligible Types:</div>';
            tooltipString += `<div>${ContestType[type]}</div>`;
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

    public static encoreWord: Record<ContestRank, string> = {
        [ContestRank.Practice]: 'Congratulations!',
        [ContestRank.Normal]: 'Nice!',
        [ContestRank.Super]: 'Super!',
        [ContestRank.Hyper]: 'Hyper!',
        [ContestRank.Master]: 'Masterful!',
        [ContestRank['Super Normal']]: 'Super nice!',
        [ContestRank['Super Great']]: 'Super great!',
        [ContestRank['Super Ultra']]: 'Super ultra!',
        [ContestRank['Super Master']]: 'Superbly masterful!',
        [ContestRank.Spectacular]: 'Spectacular!',
        [ContestRank['Brilliant Shining']]: 'You\'re a brilliant shining star!',
    };

    public static getBackgroundContestColors(type: ContestType, typeArray: ContestType[]) {
        if (typeArray.includes(type)) {
            return GameConstants.ContestColor[type];
        }
    }

    public static getRibbonImage(rank: ContestRank, type: ContestType) {
        const RibbonRank = ContestRank[rank];
        const RibbonType = ContestType[type];
        return RibbonType === 'Balanced' ?
            `<image href="assets/images/ribbons/${RibbonRank} Star Ribbon.svg">` :
            `<image href="assets/images/ribbons/${RibbonRank} Rank Ribbon.svg"></image> ${ContestRibbonSVGs.getContestRibbon[rank]}`;
    }

    public static getPokemonContestTypes(p: any) {
        return App.game.party.getPokemon(p) ? App.game.party.getPokemon(p).currentContestTypes : pokemonMap[p].contestTypes;
    }

    public static contestIsUnlocked(rank: ContestRank, type: ContestType) {
        if (rank > ContestRank.Normal && type != ContestType.Balanced) {
            if (rank === ContestRank.Spectacular && new DevelopmentRequirement().isCompleted()) {
                return App.game.statistics.contestRoundsWon[rank - 5][type]();
            }
            return App.game.statistics.contestRoundsWon[rank - 1][type]();
        }
        return true;
    }

    public static getContestHallRequirements(rank: ContestRank): (Requirement | OneFromManyRequirement)[] {
        if (new DevelopmentRequirement().isCompleted()) {
            return [];
        }
        if (rank <= ContestRank.Normal) {
            return [];
        }
        if (rank === ContestRank.Spectacular) {
            return [
                new ContestWonRequirement(1, ContestRank['Super Master'], ContestType.Cool),
                new ContestWonRequirement(1, ContestRank['Super Master'], ContestType.Beautiful),
                new ContestWonRequirement(1, ContestRank['Super Master'], ContestType.Cute),
                new ContestWonRequirement(1, ContestRank['Super Master'], ContestType.Smart),
                new ContestWonRequirement(1, ContestRank['Super Master'], ContestType.Tough),
                new MaxRegionRequirement(GameConstants.Region.kalos),
            ];
        }
        if (rank === ContestRank['Brilliant Shining']) {
            return [
                new ContestWonRequirement(1, ContestRank.Spectacular, ContestType.Cool),
                new ContestWonRequirement(1, ContestRank.Spectacular, ContestType.Beautiful),
                new ContestWonRequirement(1, ContestRank.Spectacular, ContestType.Cute),
                new ContestWonRequirement(1, ContestRank.Spectacular, ContestType.Smart),
                new ContestWonRequirement(1, ContestRank.Spectacular, ContestType.Tough),
                new ContestWonRequirement(1, ContestRank.Spectacular, ContestType.Balanced),
                new MaxRegionRequirement(GameConstants.Region.galar),
            ];
        }
        return [new ContestWonRequirement(1, rank - 1)];
    }
}
