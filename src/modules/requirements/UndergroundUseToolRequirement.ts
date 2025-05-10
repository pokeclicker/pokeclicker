import AchievementRequirement from './AchievementRequirement';
import UndergroundToolType from '../underground/tools/UndergroundToolType';
import { humanifyString } from '../GameConstants';
import * as GameConstants from '../GameConstants';

export default class UndergroundUseToolRequirement extends AchievementRequirement {
    constructor(public toolType: UndergroundToolType, amount: number) {
        super(amount, GameConstants.AchievementOption.more, GameConstants.AchievementType.Underground);
    }

    public getProgress(): number {
        if (this.toolType !== null) {
            return Math.min(App.game.statistics.undergroundToolsUsed[this.toolType](), this.requiredValue);
        }

        return Math.min(Object.values(App.game.statistics.undergroundToolsUsed).map(tool => tool()).reduce((prev, curr) => prev + curr, 0), this.requiredValue);
    }

    public hint(): string {
        return `Requires using ${this.toolType ? humanifyString(UndergroundToolType[this.toolType]) : 'any tool'} ${this.requiredValue.toLocaleString('en-US')} times.`;
    }
}
