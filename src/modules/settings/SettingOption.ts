import { GameState } from '../GameConstants';
import Requirement from '../requirements/Requirement';

export default class SettingOption<T> {
    constructor(public text: string, public value: T, public requirement? : Requirement) { }

    isUnlocked() : boolean {
        if (!this.requirement) {
            return true;
        }
        if (!App.game || App.game.gameState === GameState.loading) {
            // Requirements will error, assume the value is fine
            return true;
        }
        return this.requirement.isCompleted();
    }
}
