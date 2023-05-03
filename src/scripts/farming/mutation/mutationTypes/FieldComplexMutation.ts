/// <reference path="./GrowMutation.ts" />

/**
 * Mutation that requires a number of mUltiple different Berry plants in the farm
 */
class FieldComplexMutation extends GrowMutation {

    fieldBerries: BerryType[];
    fieldAmounts: number;

    constructor(mutationChance: number, mutatedBerry: BerryType, fieldBerries: BerryType[], fieldAmounts, options?: MutationOptions) {
        super(mutationChance, mutatedBerry, options);
        this.fieldBerries = fieldBerries;
        this.fieldAmounts = fieldAmounts;
    }

    /**
     * Determines which plots can mutate
     * @return The plot indices that can mutate
     */
    getMutationPlots(): number[] {
        const emptyPlots = super.getMutationPlots();
        let fieldPlots = 0;
        App.game.farming.plotList.forEach((plot, idx) => {
            if (!plot.isUnlocked) {
                return;
            }
            if (plot.isEmpty()) {
                return;
            }
            if (plot.berry === this.fieldBerries && plot.stage() === PlotStage.Berry) {
                fieldPlots += 1;
            }
        });

        if (fieldPlots > this.fieldAmounts) {
            return emptyPlots;
        }
        return [];
    }

    /**
     * Determines whether the player can even cause this mutation
     */
    get unlocked(): boolean {
        // Check for Berry requirements
        if (!App.game.farming.unlockedBerries[this.fieldBerries]()) {
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
        return `Legends tell of a mythical Berry that only appears in a field of cool Berries.`;
    }

}
