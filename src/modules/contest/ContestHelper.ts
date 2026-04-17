import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import Direction from '../enums/Direction';
import { Region } from '../GameConstants';
import GameHelper from '../GameHelper';
import ContestWonRequirement from '../requirements/ContestWonRequirement';
import DevelopmentRequirement from '../requirements/DevelopmentRequirement';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import Requirement from '../requirements/Requirement';
import ContestRibbonSVGs from './ContestRibbonSVGs';

export default class ContestHelper {
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
                // return 6;
            case ContestRank.Spectacular:
            case ContestRank['Brilliant Shining']:
                // return 9;
                return 3;
        }
    }

    public static getBaseAudienceHP(rank: ContestRank) {
        return ContestHelper.rankAppeal[rank] * 80 * rank * rank * ContestHelper.contestRankTimer(rank);
    }

    // Requirements
    public static contestIsUnlocked(rank: ContestRank, type: ContestType) {
        return ContestHelper.getContestHallRequirements(rank, type).every(r => r.isCompleted());
    }

    public static getContestHallRequirements(rank: ContestRank, type?: ContestType): (Requirement | OneFromManyRequirement)[] {
        if (new DevelopmentRequirement().isCompleted()) {
            return [new DevelopmentRequirement()];
        }
        if (rank <= ContestRank.Normal) {
            return [new DevelopmentRequirement(new MaxRegionRequirement(Region.hoenn))];
        }
        return [new DevelopmentRequirement(new ContestWonRequirement(1, rank - 1, type))];
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

    // Info modal
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
                // return 'Sinnoh';
            case ContestRank.Spectacular:
                // return 'Spectacular';
            case ContestRank['Brilliant Shining']:
                // return 'BrilliantShining';
                return 'Hoenn';
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
                        RibbonType = rank > ContestRank.Spectacular ? 'Twinkling Star' : 'Star';
                        break;
                }
                if (rank === ContestRank.Spectacular || type != ContestType.Balanced) {
                    return `${RibbonRank} ${RibbonType} Ribbon`;
                }
            }
            return badgeCase ? `${RibbonType} Ribbon` : `${RibbonRank} ${RibbonType} Ribbon`;
        } else {
            return 'Unavailable';
        }
    }
}
