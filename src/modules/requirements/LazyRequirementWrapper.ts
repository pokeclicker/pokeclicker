import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class LazyRequirementWrapper<T extends Requirement> extends Requirement {
    private req: T;
    constructor(private reqCreator: () => T) {
        super(1, AchievementOption.more);
    }

    public getProgress() {
        return this.unwrap().getProgress();
    }

    public hint(): string {
        return this.unwrap().hint();
    }

    private unwrap(): T {
        if (!this.req) {
            this.req = this.reqCreator();
            this.requiredValue = this.req.requiredValue;
            this.option = this.req.option;
        }
        return this.req;
    }
}
