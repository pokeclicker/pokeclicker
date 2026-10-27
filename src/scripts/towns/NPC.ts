type NPCOptionalArgument = {
    requirement?: Requirement | MultiRequirement | OneFromManyRequirement,
    image?: string,
    saveKey?: string,
};

class NPC {
    public talkedTo = ko.observable<boolean>(false); // Used for custom quests
    public saveKey = 0;
    private cachedTranslations: Record<string, KnockoutComputed<string>> = {};

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

    get displayName(): string {
        return this.translate(this.name, 'name');
    }

    get translatedDialog(): string[] {
        return (this.dialog ?? []).map(line => this.translate(line));
    }

    get dialogHTML(): string {
        return this.translatedDialog.map(line => `<p>${TextMerger.mergeText(line)}</p>`).join('\n');
    }

    /**
     * Translates text spoken by this NPC, keyed by the NPC name so translators can see who is speaking.
     * Uses hashed keys so the translations are invalidated whenever the English text changes.
     */
    protected translate(text: string, key = 'dialog'): string {
        // Blank lines are used as spacing, nothing to translate
        if (!text?.trim()) {
            return text;
        }
        // Grouped under 'npc' so NPC names can't shadow pokemon names when nesting translations
        const fullKey = `npc.${this.name}.${key}`;
        if (!this.cachedTranslations[`${fullKey}:${text}`]) {
            this.cachedTranslations[`${fullKey}:${text}`] = App.translation.getHashed(fullKey, 'npcs', text);
        }
        return this.cachedTranslations[`${fullKey}:${text}`]();
    }

    /**
     * Loads every translatable text of this NPC, so it can be exported by TranslationHelper.
     * Subclasses with extra text should override this.
     */
    public loadTranslations(): void {
        // Reset cached translations so every text is passed to App.translation again
        this.cachedTranslations = {};
        this.displayName; // eslint-disable-line @typescript-eslint/no-unused-expressions
        this.translatedDialog; // eslint-disable-line @typescript-eslint/no-unused-expressions
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
