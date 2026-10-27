class ProfNPC extends NPC {
    private static championText = 'Hello, new Champion, you\'ve come a long way!';
    private static eliteFourText = 'Come see me once you\'ve beat the Elite Four!';
    private static requireCompleteDexText = 'To progress to the next region, you need to catch all Pokémon native to this region.';
    private static remainingText = 'You still have {{amount}} left to catch in this region! You\'re almost there!';

    constructor(
        public name: string,
        public region: GameConstants.Region,
        public pokedexCompleteText: string,
        public nextRegionUnlockedText: string,
        image: string = undefined,
        requirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        super(name, undefined, { image: image, requirement: requirement});
    }

    get dialogHTML(): string {
        const requiresCompleteDex = App.game.challenges.list.requireCompletePokedex.active();
        const nextRegionUnlocked = TownList[GameConstants.StartingTowns[this.region + 1]]?.isUnlocked() ?? false;
        const completeDexAchievement = AchievementHandler.findByName(`${GameConstants.camelCaseToString(GameConstants.Region[this.region])} Master`);


        if (!nextRegionUnlocked) {
            return `<p>${ProfNPC.translateCommon(ProfNPC.championText)}</p>
                    <p>${ProfNPC.translateCommon(ProfNPC.eliteFourText)}</p>`;
        }

        let html = '';

        if (completeDexAchievement.isCompleted()) {
            html += `<p>${this.translate(this.pokedexCompleteText)}</p>`;
        } else {
            if (requiresCompleteDex) {
                html += `<p>${ProfNPC.translateCommon(ProfNPC.requireCompleteDexText)}</p>`;
            }
            html += `<p>${ProfNPC.translateCommon(ProfNPC.remainingText, { amount: completeDexAchievement.property.requiredValue - completeDexAchievement.getProgress() })}</p>`;
        }

        if (nextRegionUnlocked && (completeDexAchievement.isCompleted() || !requiresCompleteDex)) {
            html += `<p>${this.translate(this.nextRegionUnlockedText)}</p>`;
        }

        return html;
    }

    public loadTranslations(): void {
        super.loadTranslations();
        this.translate(this.pokedexCompleteText);
        this.translate(this.nextRegionUnlockedText);
        [ProfNPC.championText, ProfNPC.eliteFourText, ProfNPC.requireCompleteDexText, ProfNPC.remainingText].forEach(text => ProfNPC.translateCommon(text));
    }

    // Text shared by every professor
    private static translateCommon(text: string, vars?: Record<string, string | number>): string {
        return App.translation.getHashed('common.professor', 'npcs', text, vars)();
    }
}
