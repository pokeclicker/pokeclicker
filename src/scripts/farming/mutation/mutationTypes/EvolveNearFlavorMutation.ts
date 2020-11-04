/// <reference path="./EvolveNearMutation.ts" />

/**
 * Mutation that requires specific flavored Berry plants near a Berry plot
 * Will check the surround plots for the flavors of the nearby Berry plants. Must be greater or equal to the required flavorReqs.
 * Must also be less than the error given. The error is calculated as the sum of squared residuals.
 */
class EvolveNearFlavorMutation extends EvolveNearMutation {

    flavorReqs: number[];
    error: number;

    readonly flavorRatio = [0.5, 0.75, 1];  // Determines how much flavor a Berry plant has before fully mature.

    /**
     * Constructor for a FlavorMutation
     * @param mutationChance The chance of the mutation occuring
     * @param mutatedBerry The mutated BerryType
     * @param flavorReqs The flavor requirements for the mutation to occur
     * @param error The max error of the residual between the required flavorReqs and the surrounding plots.
     * Set to 1 if we only care about being above the flavorReqs. Set to 0 to match the requirements exactly.
     * @param options The additional MutationOptions
     */
    constructor(mutationChance: number, mutatedBerry: BerryType, originalBerry: BerryType, flavorReqs: number[], error = 1, options?: MutationOptions) {
        super(mutationChance, mutatedBerry, originalBerry, options);
        this.flavorReqs = flavorReqs;
        this.error = error;
    }

    /**
     * Determines if the plots near fit the requirements
     * @param plots The list of nearby plots
     */
    nearPlotsFitRequirements(plots: number[]) {
        const nearFlavors = [0, 0, 0, 0, 0];
        plots.forEach(idx => {
            const plot = App.game.farming.plotList[idx];
            if (!plot.isUnlocked) {
                return;
            }
            if (plot.isEmpty()) {
                return;
            }
            if (plot.stage() < PlotStage.Taller) {
                return;
            }
            const berryFlavors = App.game.farming.berryData[plot.berry].flavors.map(x => x.value * this.flavorRatio[plot.stage() - 2]);
            for (let j = 0;j < 5;j++) {
                nearFlavors[j] += berryFlavors[j];
            }
        });

        const reqMatched = this.flavorReqs.every((value, idx) => value <= nearFlavors[idx]);

        // Normalizing flavors
        const reqSum = this.flavorReqs.reduce((a,b) => a + b, 0);
        const normReqs = this.flavorReqs.map(f => f / reqSum);
        const nearSum = nearFlavors.reduce((a,b) => a + b, 0);
        const normNear = nearFlavors.map(f => f / nearSum);
        const errorMatched = normReqs.map((req, idx) => Math.pow(req - normNear[idx], 2)).reduce((a, b) => a + b, 0) <= this.error;

        return reqMatched && errorMatched;
    }

}
