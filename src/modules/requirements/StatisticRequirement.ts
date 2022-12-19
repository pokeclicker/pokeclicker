import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class StatisticRequirement extends Requirement {
    constructor(
        private statisticName: string,
        requiredAmount: number,
        private hintText: string,
        option = AchievementOption.more,
    ) {
        super(requiredAmount, option);
    }

    public getProgress(): number {
        return Math.min(App.game.statistics[this.statisticName](), this.requiredValue);
    }

    public hint(): string {
        return this.hintText;
    }
}
