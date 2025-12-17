import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import Direction from '../enums/Direction';
import { ContestColor, Region, SECOND } from '../GameConstants';
import GameHelper from '../GameHelper';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
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
    public static calculatePokemonContestAppeal(conRank: ContestRank, conType: ContestType, types: ContestType[], pokemons?: TmpPartyPokemonType[], includeBreeding = false): number {
        let appeal = 0;
        const pks = pokemons ? pokemons : ContestHelper.getPartyPokemonByContestTypeRank(conType, conRank);
        for (const pokemon of pks) {
            appeal += ContestHelper.calculateOnePokemonContestAppeal(pokemon, types, includeBreeding) * 10;
        }

        return Math.round(appeal / 10);
    }

    public static calculateOnePokemonContestAppeal(pokemon: TmpPartyPokemonType, types: ContestType[], includeBreeding = false): number {
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

    public static reduceSheenPerSecond(conRank: ContestRank, conType: ContestType, timerValue: number, pokemons?: TmpPartyPokemonType[]) {
        const isWholeNumber = (timerValue / SECOND) === Math.floor(timerValue / SECOND);
        if (!isWholeNumber) {
            return;
        }
        const pks = pokemons ? pokemons : ContestHelper.getPartyPokemonByContestTypeRank(conType, conRank);
        let ranOutOfSheenPokemon = 0;

        for (const pokemon of pks) {
            if (pokemon.contestExp > 0 && !pokemon.breeding) {
                pokemon.contestExp -= conRank;
                pokemon.contestExp = Math.max(0, pokemon.contestExp);

                // Reset contest types when sheen/exp has run out
                if (pokemon.contestExp <= 0) {
                    // Special contest pokemon are exempt
                    pokemon.currentContestTypes = !ContestHelper.isSpecialContestPokemon(pokemon.name) ? [] : pokemonMap[pokemon.name].contestTypes;
                    ranOutOfSheenPokemon += 1;
                }
                if (!ContestHelper.somePartyPokemonHasSheen()) {
                    Notifier.notify({
                        title: 'Pokémon Contest',
                        message: 'All of your Pokemon ran out of Sheen! Berry rewards are limited to 1 per combo!',
                        type: NotificationConstants.NotificationOption.danger,
                        // TODO: setting to turn off contest notifications
                    });
                    return;
                }
            }
        }

        if (ranOutOfSheenPokemon > 0) {
            Notifier.notify({
                title: 'Pokémon Contest',
                message: `${ranOutOfSheenPokemon} of your Pokemon ran out of Sheen!`,
                type: NotificationConstants.NotificationOption.warning,
                // TODO: setting to turn off contest notifications
            });
        }

        return;
    }

    public static isSpecialContestPokemon(pk: PokemonNameType) {
        const shopPokemon = ['Tangela (Pom-pom)', 'Goldeen (Diva)', 'Weepinbell (Fancy)', 'Onix (Rocker)', 'Dugtrio (Punk)', 'Gengar (Punk)', 'Sudowoodo (Golden)'];
        const contestPikachu = ['Pikachu (Rock Star)', 'Pikachu (Belle)', 'Pikachu (Pop Star)', 'Pikachu (Ph. D.)', 'Pikachu (Libre)'];
        const contestPokemon = shopPokemon.concat(contestPikachu);
        return contestPokemon.includes(pk);
    }

    // Contest eligibility
    public static somePartyPokemonHasSheen(): boolean {
        return App.game.party.caughtPokemon.some((p) => p.contestSheen() > 0);
    }

    public static getPartyPokemonByContestType(type: ContestType): TmpPartyPokemonType[] {
        return App.game.party.caughtPokemon.filter((p) => {
            const pk = p.currentContestTypes;
            return pk.some(c => c === type);
        });
    }

    public static getPartyPokemonByContestTypeRank(type: ContestType, rank: ContestRank): readonly TmpPartyPokemonType[] {
        switch (rank) {
            // Practice
            case ContestRank.Practice:
            // Hoenn
            case ContestRank.Normal:
            case ContestRank.Super:
            case ContestRank.Hyper:
            case ContestRank.Master:
            // Sinnoh
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                return App.game.party.caughtPokemon.filter((p) => ContestTypeHelper.getAppealModifier(p.currentContestTypes, [type]) > 0);
            // Kalos (in Hoenn)
            case ContestRank.Spectacular:
                return ContestHelper.getPartyPokemonByContestType(type);
            // Galar (in Sinnoh)
            case ContestRank['Brilliant Shining']:
                // not coded yet, may have a different requirement
                return ContestHelper.getPartyPokemonByContestType(type);
        }
    }

    // Rank Mechanics
    // eslint-disable-next-line @typescript-eslint/member-ordering
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

    // Pokeblocks
    public static getPokemonContestTypes(p: any) {
        return App.game.party.getPokemon(p) ? App.game.party.getPokemon(p).currentContestTypes : pokemonMap[p];
    }

    public static increaseAppeal(initialAppeal: number, amount: number, sheenDebuff = false, ignoreRankDebuff = false) {
        let resultingAppeal = initialAppeal * 100;
        let amountLeft = amount;
        const rankBracket = 10 - Object.values(ContestHelper.rankAppeal).reverse().findIndex(i => i <= Math.min(initialAppeal, ContestHelper.rankAppeal[ContestRank['Brilliant Shining']]));

        for (let i = rankBracket; i <= ContestRank['Brilliant Shining']; i++) {
            if (amountLeft > 0) {
                // Rank debuff
                let debuff = Math.max(10 - i, 1);
                if (ignoreRankDebuff) {
                    debuff = 10;
                }
                if (sheenDebuff) {
                    debuff = 1;
                }

                let addition = amountLeft * debuff * 10;

                // "Fill" per rank
                if (i < ContestRank['Brilliant Shining']) {
                    addition = Math.min((ContestHelper.rankAppeal[i + 1] - ContestHelper.rankAppeal[i]) * 100, addition);
                }

                resultingAppeal = resultingAppeal + addition;
                amountLeft = Math.ceil(amountLeft - addition / debuff);
            }
        }
        return resultingAppeal / 100;
    }

    // Sheen
    // eslint-disable-next-line @typescript-eslint/member-ordering
    public static maxSheen: PureComputed<number> = ko.pureComputed(() => {
        let capMultiplier = 0;
        GameHelper.enumNumbers(ContestRank).filter(r => r > ContestRank.Practice).forEach(r => GameHelper.enumNumbers(ContestType).forEach(ct => {
            capMultiplier += Math.min(1, App.game.statistics.contestHighestRound[r][ct]());
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

    public static getPartyPokemonContestRibbon(p: TmpPartyPokemonType, t: ContestType, r: ContestRank) {
        // No pokemon ribbon if contest hasn't been beaten
        if (!App.game.statistics.contestHighestRound[r][t]()) {
            return false;
        }
        const typeAppeal = p.contestSaveData[t][1]();
        if (typeAppeal * ContestTypeHelper.getAppealModifier([t], [t]) >= ContestHelper.rankAppeal[r]) {
            return true;
        }
        // Return if failed for type-specific ribbons
        if (r >= ContestRank.Spectacular) {
            return false;
        }
        // For lower ranks compute intersecting appeals
        const adjData = Object.entries(p.contestSaveData).filter(([d]) => p.contestSaveData[d] != p.contestSaveData[t]);
        const adjAppeal = Math.max(...Object.values(adjData).flatMap(d => d[1][1]()));
        const adjTypes = [...adjData.flatMap(d => Number(d[0]))];
        if (adjAppeal * ContestTypeHelper.getAppealModifier(adjTypes, [t]) >= ContestHelper.rankAppeal[r]) {
            return true;
        }
        return false;
    }
}
