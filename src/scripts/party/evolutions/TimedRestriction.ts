function TimeRestricted<
        EvoClass extends MinimalEvo
    >(start: number, end: number, Base: EvoClass) {
    return class extends Base {
        startHour = start;
        endHour = end;

        constructor(...args: any[]) {
            super(...args);
            this.type.push(EvolutionType.Timed);
        }

        isWithinTime(): boolean {
            const currentHour = new Date().getHours();
            return this.startHour < this.endHour ?
                // If the start time is before the end time, both need to be true
                currentHour >= this.startHour && currentHour < this.endHour :
                // If the start time is after the end time, only 1 needs to be true
                currentHour >= this.startHour || currentHour < this.endHour;
        }

        isSatisfied(): boolean {
            // Check current time within evolution hours
            return this.isWithinTime()
                && super.isSatisfied();
        }

    };
}

function DayTimeRestricted<EvoClass extends MinimalEvo>(Base: EvoClass) {
    return TimeRestricted(6, 18, Base);
}

function NightTimeRestricted<EvoClass extends MinimalEvo>(Base: EvoClass) {
    return TimeRestricted(18, 6, Base);
}
