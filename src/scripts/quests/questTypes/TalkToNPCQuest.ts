class TalkToNPCQuest extends Quest implements QuestInterface {
    initialValue?: number;
    customReward?: () => void;
    npc: NPC;

    constructor(npc: NPC, description: string, reward: (() => void) | number = 0, onLoad?: (() => void)) {
        const qpReward = typeof reward == 'number' ? reward : 0;
        super(1, qpReward);
        this.npc = npc;
        this.customDescription = description;
        this.customReward = typeof reward == 'function' ? reward : undefined;
        this._onLoad = typeof onLoad == 'function' ? onLoad : undefined;
        this.focus = npc.talkedTo;
    }

    begin() {
        this.onLoad();
        this.npc.talkedTo(false);
        super.begin();
    }

    claim(): boolean {
        if (this.customReward !== undefined) {
            this.customReward();
        }
        return super.claim();
    }
}
