/// <reference path="../../declarations/enums/ContestType.d.ts"/>
/// <reference path="../../declarations/enums/ContestRank.d.ts"/>
/// <reference path="../../declarations/enums/Direction.d.ts"/>
/// <reference path="../../declarations/types/ContestTypeHelper.d.ts" />
/// <reference path="../../declarations/GameHelper.d.ts"/>
/// <reference path="../../declarations/GameConstants.d.ts"/>
/// <reference path="../../declarations/requirements/DevelopmentRequirement.d.ts"/>
/// <reference path="../../declarations/requirements/ContestWonRequirement.d.ts"/>
/// <reference path="../../declarations/requirements/InContestTypeRequirement.d.ts"/>
/// <reference path="../../declarations/requirements/InContestRankRequirement.d.ts"/>
/// <reference path="../../declarations/requirements/MaxRegionRequirement.d.ts"/>
/// <reference path="./ContestBattle.ts" />
/// <reference path="./ContestRibbonSVGs.ts" />
/// <reference path="./ContestRunner.ts" />
/// <reference path="../farming/FarmController.ts" />
/// <reference path="../contest/ContestTrainer.ts"/>
///<reference path="../../declarations/items/ItemNameType.d.ts"/>
///<reference path="../../declarations/pokemons/mapProvider.d.ts"/>

interface contestBerryReward {
    berry: BerryType,
    amount: KnockoutObservable<number>,
    weight?: number,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
}

interface contestItemReward {
    item: ItemNameType,
    amount: KnockoutObservable<number>,
    amountLimit?: number,
    chance?: number,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
}

interface contestMove {
    moveType: ContestType,
    pp: KnockoutObservable<number>,
}

class ContestHelper {
    // Pokemon
    // Audience appeal
    public static calculatePokemonContestAppeal(conRank: ContestRank, conType: ContestType, types: ContestType[], pokemons?: PartyPokemon[], includeBreeding = false): number {
        let appeal = 0;
        const pks = pokemons ? pokemons : ContestHelper.getPartyPokemonByContestTypeRank(conType, conRank);
        for (const pokemon of pks) {
            appeal += ContestHelper.calculateOnePokemonContestAppeal(pokemon, types, includeBreeding) * 10;
        }

        return Math.round(appeal / 10);
    }

    public static calculateOnePokemonContestAppeal(pokemon: PartyPokemon, types: ContestType[], includeBreeding = false): number {
        let appeal = 0;
        const pAppeal = pokemon.contestAppeal * 10;
        const pType = pokemon.currentContestTypes;

        // Check if the Pokemon is currently breeding (no appeal)
        if (includeBreeding || !pokemon.breeding) {
            appeal = pAppeal * ContestTypeHelper.getAppealModifier(pType, types);
        }

        appeal *= Math.max(1, pokemon.contestSheen() / 100);

        return appeal / 10;
    }

    // Contest eligibility
    public static getPartyPokemonByMaxSheen(): PartyPokemon[] {
        return App.game.party.caughtPokemon.filter((p) => {
            return p.contestSheen() >= 100;
        });
    }

    public static getPartyPokemonByContestType(type: ContestType): PartyPokemon[] {
        return App.game.party.caughtPokemon.filter((p) => {
            const pk = p.currentContestTypes;
            return pk.some(c => c === type);
        });
    }

    public static getPartyPokemonByContestTypeRank(type: ContestType, rank: ContestRank): readonly PartyPokemon[] {
        switch (rank) {
            // Practice
            case ContestRank.Practice:
            // Hoenn
            case ContestRank.Normal:
            case ContestRank.Super:
            case ContestRank.Hyper:
            case ContestRank.Master:
                return App.game.party.caughtPokemon;
            // Sinnoh
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                // todo: filter by sheen > 0
                return App.game.party.caughtPokemon;
            // Kalos (in Hoenn)
            case ContestRank.Spectacular:
                return ContestHelper.getPartyPokemonByContestType(type);
            // Galar (in Sinnoh)
            case ContestRank['Brilliant Shining']:
                // todo: sheen requirement
                return ContestHelper.getPartyPokemonByMaxSheen();
        }
    }

    // Rank Mechanics
    public static isDanceHall(rank: ContestRank) {
        return rank === ContestRank.Practice || (rank >= ContestRank['Super Normal'] && rank <= ContestRank['Super Master']) || rank === ContestRank['Brilliant Shining'];
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

    public static contestRankTimer(rank: ContestRank): number {
        switch (rank) {
            case ContestRank.Normal:
                return 1;
            case ContestRank.Super:
                return 1.2;
            case ContestRank.Hyper:
                return 1.5;
            case ContestRank.Master:
                return 1.8;
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                return 6;
            case ContestRank.Spectacular:
            case ContestRank['Brilliant Shining']:
                return 9;
        }
    }

    // Pokeblocks
    public static getPokemonContestTypes(p: any) {
        return App.game.party.getPokemon(p) ? App.game.party.getPokemon(p).currentContestTypes : pokemonMap[p].contestTypes;
    }

    public static increaseAppeal(appeal: number, amount: number, sheenCap = false) {
        let sum = appeal * 100;

        let blocksLeft = amount;

        const rankBracket = 10 - Object.values(ContestHelper.rankAppeal).reverse().findIndex(i => i <= Math.min(appeal, ContestHelper.rankAppeal[ContestRank['Brilliant Shining']]));

        for (let i = rankBracket; i <= ContestRank['Brilliant Shining']; i++) {
            if (blocksLeft > 0) {
                const multiplier = Math.max(10 - i, 1) * 10;
                let addition = blocksLeft * multiplier;
                if (i < ContestRank['Brilliant Shining'] && !sheenCap) {
                    addition = Math.min((ContestHelper.rankAppeal[i + 1] - ContestHelper.rankAppeal[i]) * 100, blocksLeft * multiplier);
                }
                sum = sum + addition;
                blocksLeft = Math.ceil(blocksLeft - addition / multiplier);
            }
        }

        return sum / 100;
    }

    public static maxSheen: KnockoutComputed<number> = ko.pureComputed(() => {
        let capMultiplier = 0;
        GameHelper.enumNumbers(ContestRank).forEach(r => GameHelper.enumNumbers(ContestType).forEach(ct => capMultiplier += Math.min(1, App.game.statistics.contestHighestRound[r][ct]())));
        return 80 + 35 * capMultiplier;
    });

    // Requirements
    public static contestIsUnlocked(rank: ContestRank, type: ContestType) {
        if (new DevelopmentRequirement().isCompleted()) {
            return true;
        }
        if (rank > ContestRank.Normal) {
            return App.game.statistics.contestHighestRound[rank - 1][type]() ||
            // For Spectacular Balanced
            GameHelper.enumNumbers(ContestType).filter(type => type != ContestType.Balanced).every(type => App.game.statistics.contestHighestRound[rank][type]());
        }
        return true;
    }

    public static getContestHallRequirements(rank: ContestRank): (Requirement | OneFromManyRequirement)[] {
        if (new DevelopmentRequirement().isCompleted()) {
            return [new DevelopmentRequirement()];
        }
        if (rank <= ContestRank.Normal) {
            return [new MaxRegionRequirement(GameConstants.Region.hoenn)];
        }
        if (rank === ContestRank['Super Normal']) {
            return [
                new ContestWonRequirement(1, rank - 1),
                new MaxRegionRequirement(GameConstants.Region.sinnoh),
            ];
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

    // Rewards
    public static berryRewards: Partial<Record<ContestRank, contestBerryReward[]>> = {
        [ContestRank.Normal] : [
            { berry: BerryType.Cheri, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Cool) },
            { berry: BerryType.Chesto, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Beautiful) },
            { berry: BerryType.Pecha, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Cute) },
            { berry: BerryType.Rawst, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Smart) },
            { berry: BerryType.Aspear, amount: ko.observable(1), weight: 1, requirement: new InContestTypeRequirement(ContestType.Tough) },
            { berry: BerryType.Leppa, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Leppa) },
            { berry: BerryType.Oran, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Oran) },
            { berry: BerryType.Persim, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Persim) },
            { berry: BerryType.Lum, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Lum) },
            { berry: BerryType.Sitrus, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(BerryType.Sitrus) },
        ],
        [ContestRank.Super] : [
            { berry: BerryType.Figy, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Figy)]) },
            { berry: BerryType.Wiki, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Wiki)]) },
            { berry: BerryType.Mago, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Mago)]) },
            { berry: BerryType.Aguav, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Aguav)]) },
            { berry: BerryType.Iapapa, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Iapapa)]) },
            { berry: BerryType.Razz, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Razz)]) },
            { berry: BerryType.Bluk, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Bluk)]) },
            { berry: BerryType.Nanab, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Nanab)]) },
            { berry: BerryType.Wepear, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Wepear)]) },
            { berry: BerryType.Pinap, amount: ko.observable(1), weight: 0.9, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Pinap)]) },
        ],
        [ContestRank.Hyper] : [
            { berry: BerryType.Pomeg, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Pomeg)]) },
            { berry: BerryType.Kelpsy, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Kelpsy)]) },
            { berry: BerryType.Qualot, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Qualot)]) },
            { berry: BerryType.Hondew, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Hondew)]) },
            { berry: BerryType.Grepa, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Grepa)]) },
            { berry: BerryType.Tamato, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Tamato)]) },
            { berry: BerryType.Cornn, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Cornn)]) },
            { berry: BerryType.Magost, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Magost)]) },
            { berry: BerryType.Rabuta, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Rabuta)]) },
            { berry: BerryType.Nomel, amount: ko.observable(1), weight: 0.8, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Nomel)]) },
        ],
        [ContestRank.Master] : [
            { berry: BerryType.Spelon, amount: ko.observable(1), weight: 0.7, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Spelon)]) },
            { berry: BerryType.Pamtre, amount: ko.observable(1), weight: 0.7, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Pamtre)]) },
            { berry: BerryType.Watmel, amount: ko.observable(1), weight: 0.7, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Watmel)]) },
            { berry: BerryType.Durin, amount: ko.observable(1), weight: 0.7, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Durin)]) },
            { berry: BerryType.Belue, amount: ko.observable(1), weight: 0.7, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Belue)]) },
        ],
        [ContestRank.Spectacular] : [...GameHelper.enumNumbers(BerryType).filter(b => Number(b) >= BerryType.Occa && Number(b) <= BerryType.Roseli).map((b) => Object({ berry: b, amount: ko.observable(1), weight: 0.2, requirement: new BerryUnlockedRequirement(b) }) as contestBerryReward)],
        [ContestRank['Brilliant Shining']]: [
            { berry: BerryType.Enigma, amount: ko.observable(1), weight: 0.1, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cool), new BerryUnlockedRequirement(BerryType.Enigma)]) },
            { berry: BerryType.Micle, amount: ko.observable(1), weight: 0.1, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Beautiful), new BerryUnlockedRequirement(BerryType.Micle)]) },
            { berry: BerryType.Custap, amount: ko.observable(1), weight: 0.1, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Cute), new BerryUnlockedRequirement(BerryType.Custap)]) },
            { berry: BerryType.Jaboca, amount: ko.observable(1), weight: 0.1, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Smart), new BerryUnlockedRequirement(BerryType.Jaboca)]) },
            { berry: BerryType.Rowap, amount: ko.observable(1), weight: 0.1, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Tough), new BerryUnlockedRequirement(BerryType.Rowap)]) },
            { berry: BerryType.Kee, amount: ko.observable(1), weight: 0.1, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Balanced), new BerryUnlockedRequirement(BerryType.Kee)]) },
            { berry: BerryType.Maranga, amount: ko.observable(1), weight: 0.1, requirement: new MultiRequirement([new InContestTypeRequirement(ContestType.Balanced), new BerryUnlockedRequirement(BerryType.Maranga)]) },
        ],
    }

    public static getContestBerryReward(rank: ContestRank, trainerReward = false): contestBerryReward {
        let rewards: contestBerryReward[] = [];
        for (let i = ContestRank.Practice; i <= rank; i++) {
            rewards = rewards.concat(ContestHelper.berryRewards[i]?.filter(b => b.requirement?.isCompleted() ?? true) ?? { berry: BerryType.None, amount: ko.observable(0), weight: 0 });
        }
        if (trainerReward) {
            rewards = ContestHelper.berryRewards[rank]?.filter(b => b.requirement?.isCompleted() ?? true) ?? [{ berry: BerryType.None, amount: ko.observable(0), weight: 0 }];
        }
        return Rand.fromWeightedArray(rewards, rewards.map((br) => br.weight ?? 0.1));
    }

    public static itemRewards(): contestItemReward[] {
        return [
            { item: 'Heart_scale', amount: ko.observable(1), chance: 600, requirement: new InContestRankRequirement(ContestRank.Spectacular) },
            { item: 'Star_piece', amount: ko.observable(1), chance: 600, requirement: new InContestRankRequirement(ContestRank.Spectacular) },
        ];
    }

    public static getTrainerItemRewardList(): contestItemReward[] {
        return Object.values(ContestTrainerList.ContestOpponents).flatMap(tr => tr).filter(tr => tr.options?.itemReward).flatMap(i => i.options?.itemReward as contestItemReward[]);
    }

    // Emojis
    public static getContestEmoji(type?: ContestType) {
        switch (type) {
            case ContestType.Cool:
                return '🧡';
            case ContestType.Beautiful:
                return '💙';
            case ContestType.Cute:
                return '🩷';
            case ContestType.Smart:
                return '💚';
            case ContestType.Tough:
                return '💛';
            case ContestType.Balanced:
                return '💜';
            default:
                return '🤍';
        }
    }

    public static getArrowEmoji(direction: Direction) {
        switch (direction) {
            case Direction.Up:
                return '⬆️';
            case Direction.Down:
                return '⬇️';
            case Direction.Left:
                return '⬅️';
            case Direction.Right:
                return '➡️';
        }
    }

    // HTML
    // Contest modal
    public static getActiveContestColors(type: ContestType, typeArray: ContestType[]) {
        if (typeArray.includes(type)) {
            return GameConstants.ContestColor[type];
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

    // Ribbons
    public static getRibbonImage(rank: ContestRank, type: ContestType) {
        if (rank > ContestRank.Practice) {
            const RibbonRank = ContestRank[rank];
            const RibbonType = ContestType[type];
            return RibbonType === 'Balanced' ?
                `<image href="assets/images/ribbons/${RibbonRank} Star Ribbon.svg">` :
                `<image href="assets/images/ribbons/${RibbonRank} Rank Ribbon.svg"></image> ${ContestRibbonSVGs.getContestRibbon[rank]}`;
        } else {
            return '<image href="assets/images/ribbons/Super Normal Rank Ribbon.svg">';
        }
    }

    public static getAvailableRibbons() {
        const ranksWithRibbons = GameHelper.enumNumbers(ContestRank).filter(rank => rank > ContestRank.Practice);
        const ribbonRecord = GameHelper.objectFromEnumStrings(ContestRank, () => [] as ContestType[]);
        ranksWithRibbons.forEach(r => {
            if (r <= ContestRank.Spectacular) {
                GameHelper.enumNumbers(ContestType).filter(ct => ct < ContestType.Balanced).forEach(ct => Object.values(ribbonRecord)[r].push(ct));
            }
            if (r >= ContestRank.Spectacular) {
                Object.values(ribbonRecord)[r].push(ContestType.Balanced);
            }
        });
        return ribbonRecord;
    }

    // Text
    public static congratulatoryWord: Record<ContestRank, string> = {
        [ContestRank.Practice]: 'practical',
        [ContestRank.Normal]: 'neat',
        [ContestRank.Super]: 'superb',
        [ContestRank.Hyper]: 'hyper-tastic',
        [ContestRank.Master]: 'immaculate',
        [ContestRank['Super Normal']]: 'nice and formal',
        [ContestRank['Super Great']]: 'top-rate',
        [ContestRank['Super Ultra']]: 'ultra stellar',
        [ContestRank['Super Master']]: 'super masterful',
        [ContestRank.Spectacular]: 'inspirationally illustrious',
        [ContestRank['Brilliant Shining']]: 'career-defining',
    };

    public static getRibbonImageDescription(rank: ContestRank, type: ContestType, badgeCase = true) {
        const RibbonRank = ContestRank[rank];
        let RibbonType = ContestType[type];
        if (rank > ContestRank.Practice) {
            if (rank >= ContestRank.Spectacular) {
                switch (type) {
                    case ContestType.Smart:
                        RibbonType = 'Clever';
                    case ContestType.Cool:
                    case ContestType.Cute:
                    case ContestType.Tough:
                        RibbonType = `${RibbonType}ness`;
                        break;
                    case ContestType.Beautiful:
                        RibbonType = 'Beauty';
                        break;
                    case ContestType.Balanced:
                        RibbonType = 'Star';
                        break;
                }
                return `${RibbonRank} ${RibbonType} Ribbon`;
            }
            return badgeCase ? `${RibbonType} Ribbon` : `${RibbonRank} ${RibbonType} Ribbon`;
        } else {
            return 'Unaivalable';
        }
    }
}
