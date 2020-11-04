/// <reference path="../Mutation.ts" />

/**
 * Mutation that occurs on an empty Plot
 */
abstract class GrowMutation extends Mutation {

    constructor(mutationChance: number, mutatedBerry: BerryType, options?: MutationOptions) {
        super(mutationChance, mutatedBerry, options);
    }

    /**
     * Determines which plots can mutate
     * @return The plot indices that can mutate
     */
    getMutationPlots(): number[] {
        const plots = [];
        App.game.farming.plotList.forEach((plot, idx) => {
            if (!plot.isUnlocked) {
                return;
            }
            if (!plot.isEmpty()) {
                return;
            }
            plots.push(idx);
        });
        return plots;
    }

    /**
     * Handles updating the farm with the mutation
     * @param index The plot index to mutate
     */
    handleMutation(index: number): void {
        const plot = App.game.farming.plotList[index];
        plot.berry = this.mutatedBerry;
        plot.age = 0;
        plot.notifications = [];
        App.game.farming.unlockBerry(this.mutatedBerry);
    }

}
