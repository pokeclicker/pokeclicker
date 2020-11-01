class DungeonBossPokemon {

    constructor(
        public name: PokemonNameType,
        public baseHealth: number,
        public level: number,
        public requirement?: MultiRequirement | OneFromManyRequirement | Requirement
    ) {}

    public isUnlocked(): boolean {
        return App.game && this.requirement ? this.requirement.isCompleted() : true;
    }
}
