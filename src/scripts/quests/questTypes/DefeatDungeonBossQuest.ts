class DefeatDungeonBossQuest extends Quest implements QuestInterface {
    initialValue?: number;
    customReward?: () => void;
    target: PokemonNameType;
    targetEncountered: boolean;

    constructor(public dungeon: string, private tmpTarget : string, reward: (() => void) | number = 0, description?: string, onLoad?: (() => void)) {
        const qpReward = typeof reward == 'number' ? reward : 0;
        super(1, qpReward);
        this.customDescription = description ?? `Defeat ${this.tmpTarget} in ${this.dungeon}.`;
        this.customReward = typeof reward == 'function' ? reward : undefined;
        this._onLoad = typeof onLoad == 'function' ? onLoad : undefined;
        this.targetEncountered = false;

        // Target is undefined until onLoad is called. TmpTarget keeps track of raw data.
        this.focus = ko.pureComputed(() => {
            const enemyPokemon = Battle.enemyPokemon();
            const defeatedBoss = DungeonRunner.defeatedBoss();
            if (enemyPokemon) {
                if (enemyPokemon.name === this.target
                    && DungeonRunner.dungeon.name === this.dungeon
                    && App.game.gameState === GameConstants.GameState.dungeon) {
                    this.targetEncountered = true;
                    return 0;
                }
                this.targetEncountered = false;
                return 0;
            }
            if (defeatedBoss && this.targetEncountered) {
                return 1;
            }
            return 0;
        });
    }

    begin() {
        this.onLoad();
        super.begin();
    }

    onLoad() {
        super.onLoad();
        const dungeonObject = dungeonList[this.dungeon];
        const targetObject = dungeonObject.bossList.find(b => b.name == this.tmpTarget);
        if (targetObject instanceof DungeonTrainer) {
            // If target is a trainer, set his last pokémon as actual target.
            this.target = targetObject.getTeam().slice(-1)[0].name;
        } else {
            this.target = targetObject.name;
        }
    }

    claim(): boolean {
        if (this.customReward !== undefined) {
            this.customReward();
        }
        return super.claim();
    }
}
