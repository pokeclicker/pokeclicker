import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import * as GameConstants from '../GameConstants';
import GameHelper from '../GameHelper';
import AchievementRequirement from './AchievementRequirement';

export default class ContestWonRequirement extends AchievementRequirement {
    public rank: ContestRank;
    public type?: ContestType;

    constructor(value: number, rank: ContestRank, type?: ContestType, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.None); // TODO?: Contest Achievements
        this.rank = rank;
        if (type != undefined) {
            this.type = type;
        }
    }

    public getProgress() {
        if (this.type != undefined) {
            return Math.min(App.game.statistics.contestRoundsWon[this.rank][this.type](), this.requiredValue);
        } else {
            const ct = GameHelper.enumNumbers(ContestType).find(t => App.game.statistics.contestRoundsWon[this.rank][t]() >= this.requiredValue);
            return Math.min(App.game.statistics.contestRoundsWon[this.rank][ct](), this.requiredValue);
        }
    }

    public hint(): string {
        if (this.requiredValue === 1) {
            return `Requires having won a ${ContestRank[this.rank]} ${ContestType[this.type] ?? 'Rank'} Contest.`;
        }
        return `Requires winning a total of ${this.requiredValue} rounds in a ${ContestRank[this.rank]} ${ContestType[this.type] ?? 'Rank'} Contest.`;
    }

    public toString(): string {
        return `${super.toString()} ${this.rank} ${this.type}`;
    }
}
