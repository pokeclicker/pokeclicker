class KantoBerryMasterNPC extends NPC {

    constructor(
        public name: string,
        public dialog: string[],
        public image?: string
    ) {
        super(name,dialog,image);
    }

    get dialogHTML(): string {
        // Before the player has unlocked the farm
        if (!App.game.farming.canAccess()) {
            return super.dialogHTML;
        }

        // After the farm is unlocked
        return `<p>${KantoBerryMasterNPC.generateMessage(new Date())}</p>`;
    }

    public static generateMessage(date: Date): string {
        SeededRand.seedWithDate(date);

        const possibleMutations = App.game.farming.mutations.filter((mut) => mut.checkUnlockReq());

        const idx = Math.floor(possibleMutations.length * SeededRand.next());

        return possibleMutations[idx].getHint();
    }

}
