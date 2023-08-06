/// <reference path="./GrowMutation.ts" />

type FieldMutationFieldBerry = {
    berry: BerryType,
    amountRequired: number
}

/**
 * Mutation that requires a number of Berry plants in the farm
 */
class FieldMutation extends GrowMutation {
    constructor(mutationChance: number, mutatedBerry: BerryType, private fieldBerries: FieldMutationFieldBerry[], options?: MutationOptions) {
        super(mutationChance, mutatedBerry, options);
    }

    /**
     * Determines which plots can mutate
     * @return The plot indices that can mutate
     */
    getMutationPlots(): number[] {
        const emptyPlots = super.getMutationPlots();
        const fieldPlots = Array<number>(this.fieldBerries.length).fill(0);
        App.game.farming.plotList.forEach((plot, idx) => {
            if (!plot.isUnlocked) {
                return;
            }
            if (plot.isEmpty()) {
                return;
            }
            this.fieldBerries.forEach((fb, index) => {
                if (plot.berry === fb.berry && plot.stage() === PlotStage.Berry) {
                    fieldPlots[index] += 1;
                }
            });
        });

        if (fieldPlots.every((fp, index) => fp >= this.fieldBerries[index].amountRequired)) {
            return emptyPlots;
        }
        return [];
    }

    /**
     * Determines whether the player can even cause this mutation
     */
    get unlocked(): boolean {
        // Check for Berry requirements
        if (this.fieldBerries.some((fb) => !App.game.farming.unlockedBerries[fb.berry]())) {
            return false;
        }
        return super.unlocked;
    }

    /**
     * Handles getting the hint for this mutation for the Kanto Berry Master
     */
    get hint(): string {
        if (super.hint) {
            return super.hint;
        }
        const berries = this.fieldBerries.map((fb) => BerryType[fb.berry]).join(', ');
        return `Legends tell of a mysterious Berry that only appears in a field of ${berries} Berries.`;
    }

}
