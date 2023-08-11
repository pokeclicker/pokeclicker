class TalkToNPCQuest extends Quest implements QuestInterface {
    npc: NPC;

    constructor(npc: NPC, description: string, reward = 0) {
        super(1, reward);
        this.npc = npc;
        this.customDescription = description;
        this.focus = npc.talkedTo;
    }

    begin() {
        this.npc.talkedTo(false);
        super.begin();
    }
}
