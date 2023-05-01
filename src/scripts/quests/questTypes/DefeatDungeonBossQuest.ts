class DefeatDungeonBossQuest extends Quest implements QuestInterface {
    customReward?: () => void;

    constructor(public dungeon: string, public dungeonBoss : PokemonNameType | string, reward: (() => void) | number = 0, description?: string, onLoad?: (() => void)) {
        const qpReward = typeof reward == 'number' ? reward : 0;
        super(1, qpReward);
        this.customDescription = description ?? `Defeat ${this.dungeonBoss} in ${this.dungeon}.`;
        this.customReward = typeof reward == 'function' ? reward : undefined;
        this._onLoad = typeof onLoad == 'function' ? onLoad : undefined;
        this.focus = ko.observable(0);
    }

    begin() {
        this.onLoad();
        super.begin();
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

    claim(): boolean {
        if (this.customReward !== undefined) {
            this.customReward();
        }
        return super.claim();
    }
}
