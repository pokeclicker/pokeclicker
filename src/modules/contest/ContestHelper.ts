import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import Direction from '../enums/Direction';
import { ContestColor, Region, SECOND } from '../GameConstants';
import GameHelper from '../GameHelper';
import LevelType from '../party/LevelType';
import { pokemonMap } from '../pokemons/PokemonList';
import { PokemonNameType } from '../pokemons/PokemonNameType';
import ContestWonRequirement from '../requirements/ContestWonRequirement';
import DevelopmentRequirement from '../requirements/DevelopmentRequirement';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import NullRequirement from '../requirements/NullRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';
import { TmpPartyPokemonType } from '../TemporaryScriptTypes';
import ContestTypeHelper from '../types/ContestTypeHelper';
import ContestRibbonSVGs from './ContestRibbonSVGs';
import { PureComputed } from 'knockout';

export default class ContestHelper {
    // Pokemon
    // Audience appeal
    public static calculatePokemonContestAppeal(conRank: ContestRank, conType: ContestType, pokemons?: TmpPartyPokemonType[], includeBreeding = false): number {
        let appeal = 0;
        const pks = pokemons;
        const isSpectacularRank = conRank >= ContestRank.Spectacular;
        for (const pokemon of pks) {
            appeal += ContestHelper.calculateOnePokemonContestAppeal(pokemon, conType, isSpectacularRank, includeBreeding);
        }

        return Math.round(appeal);
    }

    public static calculateOnePokemonContestAppeal(pokemon: TmpPartyPokemonType, contestEntered: ContestType, pureTypeOnly = false, includeBreeding = false) {
        const stats = Object.entries(pokemon.contestStats).map(([type, appeal]) => {
            return {
                contestType: ContestType[type] as ContestType,
                appeal: appeal() as number,
            };
        });

        const appealSum = stats.reduce((accumulator, contestStat) => {
            const effectiveness = ContestTypeHelper.getAppealModifier([contestStat.contestType], [contestEntered]);
            if (effectiveness > 0 && (includeBreeding || !pokemon.breeding)) {
                if (pureTypeOnly && contestStat.contestType != contestEntered) {
                    return;
                }
                let scarfBonus = 1;
                const scarves = ['Red_Scarf', 'Blue_Scarf', 'Pink_Scarf', 'Green_Scarf', 'Yellow_Scarf'];
                if (scarves.includes(pokemon.heldItem().name) && scarves.indexOf(pokemon.heldItem().name) == contestStat.contestType) {
                    scarfBonus = 1.2;
                }
                return accumulator + Math.round(contestStat.appeal * scarfBonus * (1 + pokemon.contestSheen()) * effectiveness);
            } else {
                return;
            }
        }, 0);

        return appealSum;
    }

    public calculateContestSheenBonus (p: TmpPartyPokemonType) {
        // Based off of LevelType equations (Experience Type on Bulbapedia)
        // Formulas are multiplied by 10, except for Medium Slow which was by 8
        // Erratic and Fluctuating limits are scaled from 100 to 10. Erratic's values of 7, 8, and 9 were taken from extending the neighboring curves instead of the third formula
        // Medium Slow's constant term of -140 was removed
        const sheenValues = [
            [0, 20, 157, 524, 1229, 2375, 3110, 4905, 7782, 11008, 15000],
            [0, 8, 64, 216, 512, 1000, 1728, 2744, 4096, 5832, 8000],
            [0, 10, 80, 270, 640, 1250, 2160, 3430, 5120, 7290, 10000],
            [0, 690, 1197, 1579, 1894, 2200, 2554, 3013, 3635, 4478, 5600],
            [0, 13, 100, 338, 800, 1563, 2700, 4288, 6400, 9113, 12500],
            [0, 5, 26, 92, 435, 850, 1512, 2401, 3686, 5249, 7200],
        ];
        const levelType = pokemonMap[p.name].levelType;

        const maxSheenValues = sheenValues.map(s => s[10]);
        const maxSheenBonusFromLevelType = GameHelper.enumNumbers(LevelType).sort((a, b) => maxSheenValues[a] - maxSheenValues[b]).indexOf(levelType) + 1;

        const sheenLevels = sheenValues[levelType];
        let sheenLevelBonus = 0;
        // if (hasArtistRibbon) {
        //     sheenLevelBonus = 10;
        // } else { for loop below
        for (let i = 0; i < sheenLevels.length - 1; i++) {
            if (Math.floor(sheenLevels[i]) >= p.contestSheen()) {
                sheenLevelBonus = i;
            }
        }

        let totalSheenBonus = 100;
        totalSheenBonus += maxSheenBonusFromLevelType * sheenLevelBonus;
        if (ContestHelper.isSpecialContestPokemon(p.name)) {
            totalSheenBonus += 50;
        }

        return totalSheenBonus / 100;
    }

    public static reducePokeblockFullnessPerSecond(conRank: ContestRank, conType: ContestType, timerValue: number, pokemons?: TmpPartyPokemonType[]) {
        const isWholeNumber = (timerValue / SECOND) === Math.floor(timerValue / SECOND);
        if (!isWholeNumber) {
            return;
        }
        const pks = pokemons;

        for (const pokemon of pks) {
            if (pokemon.pokeblockFullness() > 0 && !pokemon.breeding) {
                const reductionValue = pokemon.pokeblockFullness() - Math.floor(1 + 0.75 * (conRank + ContestTypeHelper.getAppealModifier(pokemonMap[pokemon.name].contestTypes, [conType])));
                pokemon.pokeblockFullness(Math.max(0, reductionValue));
            }
        }

        return;
    }

    public static isSpecialContestPokemon(pk: PokemonNameType) {
        const shopPokemon = ['Tangela (Pom-pom)', 'Goldeen (Diva)', 'Weepinbell (Fancy)', 'Onix (Rocker)', 'Dugtrio (Punk)', 'Gengar (Punk)', 'Sudowoodo (Golden)'];
        const contestPikachu = ['Pikachu (Rock Star)', 'Pikachu (Belle)', 'Pikachu (Pop Star)', 'Pikachu (Ph. D.)', 'Pikachu (Libre)'];
        const contestPokemon = shopPokemon.concat(contestPikachu);
        return contestPokemon.includes(pk);
    }

    // Rank Mechanics
    // eslint-disable-next-line @typescript-eslint/member-ordering
    public static rankAppeal: Record<ContestRank, number> = {
        [ContestRank.Practice]: 0,
        [ContestRank.Normal]: 800,
        [ContestRank.Super]: 2300,
        [ContestRank.Hyper]: 3800,
        [ContestRank.Master]: 6000,
        [ContestRank['Super Normal']]: 6800,
        [ContestRank['Super Great']]: 8300,
        [ContestRank['Super Ultra']]: 9800,
        [ContestRank['Super Master']]: 12000,
        [ContestRank.Spectacular]: 14200,
        [ContestRank['Brilliant Shining']]: 16400,
    };

    public static isDanceHall(rank: ContestRank) {
        return rank === ContestRank.Practice || (rank >= ContestRank['Super Normal'] && rank <= ContestRank['Super Master']) || rank === ContestRank['Brilliant Shining'];
    }

    public static contestRankTimer(rank: ContestRank): number {
        switch (rank) {
            case ContestRank.Normal:
                return 1.5;
            case ContestRank.Super:
                return 2;
            case ContestRank.Hyper:
                return 2.5;
            case ContestRank.Master:
                return 3;
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

    public static getBaseAudienceHP(rank: ContestRank) {
        return ContestHelper.rankAppeal[rank] * 80 * rank * rank * ContestHelper.contestRankTimer(rank);
    }

    // Pokeblocks
    public static getPokemonContestTypes(p: any) {
        return pokemonMap[p].contestTypes;
    }

    // Pokeblock Fullness
    // eslint-disable-next-line @typescript-eslint/member-ordering
    public static maxPokeblockFullness: PureComputed<number> = ko.pureComputed(() => {
        let capMultiplier = 0;
        GameHelper.enumNumbers(ContestRank).filter(r => r > ContestRank.Practice).forEach(r => GameHelper.enumNumbers(ContestType).forEach(ct => {
            capMultiplier += Math.min(1, Number(App.game.statistics.contestsWon[r][ct]()));
        }));
        return 80 + 35 * capMultiplier;
    });

    // Requirements
    public static contestIsUnlocked(rank: ContestRank, type: ContestType) {
        return ContestHelper.getContestHallRequirements(rank, type).every(r => r.isCompleted());
    }

    public static getContestHallRequirements(rank: ContestRank, type?: ContestType): (Requirement | OneFromManyRequirement)[] {
        if (new DevelopmentRequirement().isCompleted() && rank < ContestRank['Brilliant Shining']) {
            return [new DevelopmentRequirement()];
        }
        if (rank <= ContestRank.Normal) {
            return [new MaxRegionRequirement(Region.hoenn)];
        }
        if (rank === ContestRank['Super Normal']) {
            return [new MaxRegionRequirement(Region.sinnoh)];
        }
        if (rank === ContestRank.Spectacular) {
            if (type === ContestType.Balanced) {
                return GameHelper.enumNumbers(ContestType).filter(ct => ct != ContestType.Balanced).map(ct => new ContestWonRequirement(1, rank, ct));
            }
            return [new MaxRegionRequirement(Region.kalos)];
        }
        if (rank === ContestRank['Brilliant Shining']) {
            return [
                new NullRequirement(),
                new MaxRegionRequirement(Region.galar),
            ];
        }
        return [new ContestWonRequirement(1, rank - 1, type)];
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
    // Contest modals
    public static scaleTextHorizontal() {
        let els = document.getElementsByClassName('scaled-text') as HTMLCollectionOf<HTMLElement>;
        for (let el of Array.from(els)) {
            let xScale = el.clientWidth / el.scrollWidth;
            if (xScale < 1) { 
                el.style.transform = 'scaleX(' + xScale + ')';
            } else {
                el.style.transform = 'scaleX(1)';
            }
        }
    }

    public static cycleThroughRanks(ranks: ContestRank[], selectedRank: ContestRank, cycleForwards = true) {
        if (!ranks.includes(selectedRank)) {
            throw new Error('The rank being used is not included in the given array');
        }

        let index = ranks.indexOf(selectedRank);
        if (cycleForwards) {
            index = (index + 1) % ranks.length;
        } else {
            index -= 1;
            if (index < 0) {
                index += ranks.length;
            }
        }
        return ranks[index];
    }

    public static getActiveContestColors(type: ContestType, typeArray: ContestType[]) {
        if (typeArray.includes(type)) {
            return ContestColor[type];
        }
    }

    public static contestButtonTooltip(rank: ContestRank, type: ContestType): string {
        let tooltipString = '';
        tooltipString += `${ContestRank[rank]} ${ContestType[type]}:`;
        tooltipString += '<i>Tooltip info will be added later</i>';
        // tooltipString += `<div><strong>Audience Appeal: ${ContestHelper.calculatePokemonContestAppeal(rank, type, [type]).toLocaleString('en-US')}</strong></div>`;
        // if (rank == ContestRank.Spectacular) {
        //     tooltipString += '<div>Eligible Types:</div>';
        //     tooltipString += `<div>${ContestType[type]}</div>`;
        // }
        return tooltipString;
    }

    public static getRankInfo(rank: ContestRank) {
        switch (rank) {
            case ContestRank.Normal:
            case ContestRank.Super:
            case ContestRank.Hyper:
            case ContestRank.Master:
                return 'Hoenn';
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                return 'Sinnoh';
            case ContestRank.Spectacular:
                return 'Spectacular';
            case ContestRank['Brilliant Shining']:
                return 'BrilliantShining';
        }
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
                if (rank > ContestRank.Spectacular) {
                    RibbonType = 'Twinkling Star';
                }
                return `${RibbonRank} ${RibbonType} Ribbon`;
            }
            return badgeCase ? `${RibbonType} Ribbon` : `${RibbonRank} ${RibbonType} Ribbon`;
        } else {
            return 'Unavailable';
        }
    }
}
