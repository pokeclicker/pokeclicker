import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import * as GameConstants from '../GameConstants';
import GameHelper from '../GameHelper';
import AchievementRequirement from './AchievementRequirement';

export default class ContestWonRequirement extends AchievementRequirement {
    public rank: ContestRank;
    public type?: ContestType;

    constructor(value: number, rank: ContestRank, type?: ContestType) {
        super(value, GameConstants.AchievementOption.more, GameConstants.AchievementType.None);
        this.rank = rank;
        if (type != undefined) {
            this.type = type;
        }
    }

    public getProgress() {
        if (this.type != undefined) {
            return Math.min(App.game.statistics.contestsWon[this.rank][this.type](), this.requiredValue);
        } else {
            const ct = GameHelper.enumNumbers(ContestType).find(t => App.game.statistics.contestsWon[this.rank][t]() >= this.requiredValue);
            return Math.min(App.game.statistics.contestsWon[this.rank][ct](), this.requiredValue);
        }
    }

    public hint(): string {
        if (this.requiredValue === 1) {
            return `Requires having won a ${ContestRank[this.rank]} ${ContestType[this.type] ?? 'Rank'} Contest.`;
        }
        return `Requires having reached ${this.requiredValue} or more consecutive encores in a ${ContestRank[this.rank]} ${ContestType[this.type] ?? 'Rank'} Contest.`;
    }

    public toString(): string {
        return `${super.toString()} ${this.rank} ${this.type}`;
    }
}
