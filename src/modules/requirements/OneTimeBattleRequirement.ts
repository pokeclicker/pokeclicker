import Requirement from './Requirement';
import * as GameConstants from '../GameConstants';

export default class OneTimeBattleRequirement extends Requirement {
    public battleName: string;
    constructor(battleName: any) {
        super(1, GameConstants.AchievementOption.equal);
        this.battleName = battleName;
    }

    public getProgress() {
        return App.game.oneTimeBattleList[this.battleName].defeated ? 1 : 0;
    }

    public hint(): string {
        return `Requires beating ${App.game.oneTimeBattleList[this.battleName].name}.`;
    }
}
