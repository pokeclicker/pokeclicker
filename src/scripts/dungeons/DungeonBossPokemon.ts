class DungeonBossPokemon {

    constructor(
        public name: string,
        public baseHealth: number,
        public level: number,
        public requirement?: MultiRequirement | OneFromManyRequirement | Requirement
    ) {}

    public isUnlocked(): boolean {
        return this.requirement ? this.requirement.isCompleted() : true;
    }
}
