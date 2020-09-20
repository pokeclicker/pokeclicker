class DungeonBossPokemon {

    constructor(
        public name: string,
        public baseHealth: number,
        public level: number,
        public requirement?: MultiRequirement | OneFromManyRequirement | Requirement
    ) {}

    public isUnlocked(): boolean {
        return App.game && this.requirement ? this.requirement.isCompleted() : true;
    }
}
