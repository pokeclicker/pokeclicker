import Requirement from '../requirements/Requirement';

export default class SubRegion {
    public id = 0;

    constructor(
        public name: string,
        public requirement?: Requirement,
        public startTown?: string,
        public startRoute?: number,
    ) {}

    public unlocked(): boolean {
        return this.requirement ? this.requirement.isCompleted() : true;
    }
}
