import type Requirement from '../requirements/Requirement';
import GameLoadState from '../utilities/GameLoadState';

export default class SettingOption<T> {
    constructor(public text: string, public value: T, public requirement? : Requirement) { }

    isUnlocked() : boolean {
        if (!this.requirement) {
            return true;
        }
        if (!GameLoadState.reachedLoadState(GameLoadState.states.initialized)) {
            // Requirements will error, assume the value is fine
            return true;
        }
        return this.requirement.isCompleted();
    }
}
