class RoamingPokemon {
    constructor(
        public pokemon: DataPokemon,
        public weight: number = 256,
        public unlockRequirement?: Requirement
    ) { }

    public isRoaming() {
        return this.unlockRequirement ? this.unlockRequirement.isCompleted() : true;
    }
}


