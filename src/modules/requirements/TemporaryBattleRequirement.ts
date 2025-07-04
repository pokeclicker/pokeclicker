import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class TemporaryBattleRequirement extends AchievementRequirement {
    constructor(public battleName: string, defeatsRequired = 1, option = GameConstants.AchievementOption.more) {
        super(defeatsRequired, option);
    }

    public getProgress() {
        return App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(this.battleName)]();
    }

    public hint(): string {
        const tempBattle = TemporaryBattleList[this.battleName];
        let locationHint = '';
        if (tempBattle.getTown()) {
            locationHint = ` ${tempBattle.parent ? 'in' : 'near'} ${tempBattle.getTown().name}`;
            locationHint.replace(/\.$/, ''); // remove trailing period since the hint text adds one
        }
        const hint = `Requires beating ${tempBattle.getDisplayName()}${locationHint}.`;
        return hint;
    }
}
