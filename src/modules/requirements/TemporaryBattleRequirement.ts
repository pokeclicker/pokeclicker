import Requirement from './Requirement';
import * as GameConstants from '../GameConstants';

export default class TemporaryBattleRequirement extends Requirement {
    constructor(public battleName: string, defeatsRequired = 1, option = GameConstants.AchievementOption.more) {
        super(defeatsRequired, option);
    }

    public getProgress() {
        return App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(this.battleName)]();
    }

    public hint(): string {
        return `Requires beating ${this.battleName.replace(/\s(?=[\d])\d/g, '')}.`;
    }
}
