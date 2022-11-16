import { AchievementOption, camelCaseToString, GameState } from '../GameConstants';
import Requirement from './Requirement';

export default class GameStateRequirement extends Requirement {
    constructor(public gameState: GameState, expect = true) {
        super(1, expect ? AchievementOption.more : AchievementOption.less);
    }

    public getProgress() {
        return Number(App.game.gameState === this.gameState);
    }

    public hint(): string {
        return `The game must be in the ${
            camelCaseToString(GameState[this.gameState])
        } state`;
    }
}
