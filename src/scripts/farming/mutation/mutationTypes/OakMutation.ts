/// <reference path="./EvolveMutation.ts" />

/**
 * Mutation that applies to a current Berry plant based on the active state of Oak Items
 */
class OakMutation extends EvolveMutation {

    oakItem: OakItemType;

    constructor(mutationChance: number, mutatedBerry: BerryType, originalBerry: BerryType, oakItem: OakItemType, options?: MutationOptions) {
        super(mutationChance, mutatedBerry, originalBerry, options);
        this.oakItem = oakItem;
    }

    /**
     * Determines which plots can mutate
     * @return The plot indices that can mutate
     */
    getMutationPlots(): number[] {
        const plots = super.getMutationPlots();
        return plots.filter((idx) => {
            const plot = App.game.farming.plotList[idx];
            return this.plotFitRequirements(plot, idx);
        });
    }

    /**
     * Checks whether a plot fits the requirements for a mutation
     * @param plot The Plot
     * @param idx The Plot index
     */
    plotFitRequirements(plot: Plot, idx: number): boolean {
        if (!App.game.oakItems.isActive(this.oakItem)) {
            return false;
        }
        if (this.originalBerry && plot.berry !== this.originalBerry) {
            return false;
        }
        return true;
    }

    /**
     * Determines whether the player can even cause this mutation
     */
    get unlocked(): boolean {
        // Check Oak Item unlock status
        if (!App.game.oakItems.isUnlocked(this.oakItem)) {
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
        return `I've heard that using the ${App.game.oakItems.itemList[this.oakItem].displayName} can cause ${BerryType[this.originalBerry]} Berries to change!`;
    }
}
