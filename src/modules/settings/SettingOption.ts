import Requirement from '../requirements/Requirement';

export default class SettingOption<T> {
    constructor(public text: string, public value: T, public requirement? : Requirement) { }

    isUnlocked() : boolean {
        if (!this.requirement) {
            return true;
        }
        return this.requirement.isCompleted();
    }
}
