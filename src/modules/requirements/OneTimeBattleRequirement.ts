import Requirement from './Requirement';
import * as GameConstants from '../GameConstants';

export default class OneTimeBattleRequirement extends Requirement {
    public battleName: string;
    constructor(battleName: any, option: GameConstants.AchievementOption = GameConstants.AchievementOption.equal) {
        super(1, option);
        this.battleName = battleName;
    }

    public getProgress() {
        return App.game.oneTimeBattleList[this.battleName].completed ? 1 : 0;
    }

    public hint(): string {
        return `Requires beating ${App.game.oneTimeBattleList[this.battleName].name} badge.`;
    }
}
