import Requirement from '../requirements/Requirement';

export default class SubRegion {
    constructor(
        public name: string,
        public id: number,
        public requirement?: Requirement,
        public startTown?: string,
        public startRoute?: number,
    ) {}

    public unlocked(): boolean {
        return this.requirement ? this.requirement.isCompleted() : true;
    }
}
