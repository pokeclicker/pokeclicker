class DefeatDungeonBossQuest extends Quest implements QuestInterface {

    constructor(public dungeon: string, public dungeonBoss : PokemonNameType | string, reward = 0) {
        super(1, reward);
        this.focus = ko.observable(0);
    }

    get description() {
        return this.customDescription ?? `Defeat ${this.dungeonBoss} in ${this.dungeon}.`;
    }

    onLoad() {
        super.onLoad();
        // TODO : @types/knockout@3.4.66 → 3.5.1
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ko.when(
            () =>  DungeonRunner.defeatedBoss() === this.dungeonBoss && DungeonRunner.dungeon?.name === this.dungeon,
            () => this.focus(1)
        );
    }
}
