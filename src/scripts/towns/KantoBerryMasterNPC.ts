///<reference path="./NPC.ts"/>

class KantoBerryMasterNPC extends NPC {
    private static masteredText = 'The disciple has surpassed the master. I have nothing more to teach you.';
    private static roadblockText = 'It seems as though you have hit a roadblock in your Berry progress. Focus on other areas before returning.';

    constructor(
        public name: string,
        public dialog: string[]
    ) {
        super(name, dialog);
    }

    get dialogHTML(): string {
        // Before the player has unlocked the farm
        if (!App.game.farming.canAccess()) {
            return super.dialogHTML;
        }

        // After the farm is unlocked
        return `<p>${KantoBerryMasterNPC.generateMessage(GameHelper.today())}</p>`;
    }

    public static generateMessage(date: Date): string {
        if (App.game.farming.unlockedBerries.every(berry => berry())) {
            return App.translation.getHashed('npc.Berry Master.dialog', 'npcs', KantoBerryMasterNPC.masteredText)();
        }

        const possibleMutations = App.game.farming.mutations.filter((mut) => mut.unlocked && mut.showHint && !App.game.farming.unlockedBerries[mut.mutatedBerry]());

        if (possibleMutations.length === 0) {
            return App.translation.getHashed('npc.Berry Master.dialog', 'npcs', KantoBerryMasterNPC.roadblockText)();
        }

        SeededRand.seedWithDate(date);
        possibleMutations.forEach(b => SeededRand.boolean());
        const mutationToShow = SeededRand.fromArray(possibleMutations);
        mutationToShow.hintSeen = true;

        if (mutationToShow instanceof EnigmaMutation) {
            return mutationToShow.partialHint;
        }
        return mutationToShow.hint;
    }

    public loadTranslations(): void {
        super.loadTranslations();
        [KantoBerryMasterNPC.masteredText, KantoBerryMasterNPC.roadblockText].forEach(text => this.translate(text));
    }

}
