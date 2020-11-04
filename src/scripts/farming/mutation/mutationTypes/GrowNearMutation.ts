/// <reference path="./GrowMutation.ts" />

/**
 * Mutation that requires a specific environment near an empty plot.
 */
abstract class GrowNearMutation extends GrowMutation {

    constructor(mutationChance: number, mutatedBerry: BerryType, options?: MutationOptions) {
        super(mutationChance, mutatedBerry, options);
    }

    /**
     * Determines which plots can mutate
     * @return The plot indices that can mutate
     */
    getMutationPlots(): number[] {
        const plots = super.getMutationPlots();

        return plots.filter((idx) => {
            const nearPlots = Plot.findNearPlots(idx);
            return this.nearPlotsFitRequirements(nearPlots);
        });
    }

    /**
     * Determines if the plots near fit the requirements
     * @param plots The list of nearby plots
     */
    abstract nearPlotsFitRequirements(plots: number[]): boolean;

}
