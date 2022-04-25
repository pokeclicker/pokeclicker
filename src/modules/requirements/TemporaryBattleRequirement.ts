import Requirement from './Requirement';
import * as GameConstants from '../GameConstants';

export default class TemporaryBattleRequirement extends Requirement {
    public battleName: string;
    constructor(battleName: any, defeatsRequired = 1) {
        super(defeatsRequired, GameConstants.AchievementOption.more);
        this.battleName = battleName;
    }

    public getProgress() {
        return App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(this.battleName)]();
    }

    public hint(): string {
        return `Requires beating ${this.battleName}.`;
    }
}
