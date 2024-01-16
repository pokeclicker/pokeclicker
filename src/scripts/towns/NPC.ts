type NPCOptionalArgument = {
    requirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    image?: string,
    saveKey?: string,
};

class NPC {
    public talkedTo = ko.observable<boolean>(false); // Used for custom quests
    public saveKey = 0;

    constructor(
        public name: string,
        public dialog: string[],
        public options: NPCOptionalArgument = {},
        public type: NPCType = NPCType.Default
    ) {
        if (this.options.saveKey) {
            this.saveKey = GameHelper.hash(this.options.saveKey);
        }
    }

    get dialogHTML(): string {
        return this.dialog.map(line => `<p>${TextMerger.mergeText(line)}</p>`).join('\n');
    }

    public isVisible() {
        return this.options.requirement?.isCompleted() ?? true;
    }

    public setTalkedTo() {
        this.talkedTo(true);
        if (this.saveKey && !this.hasTalkedTo()) {
            GameHelper.incrementObservable(App.game.statistics.npcTalkedTo[this.saveKey]);
        }
    }

    public hasTalkedTo(): boolean {
        return this.saveKey ? App.game.statistics.npcTalkedTo[this.saveKey]() > 0 : false;
    }
}
