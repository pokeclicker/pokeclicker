/// <reference path="./NearMutation.ts" />

/**
 * Mutation that requires specific flavored Berry plants near an empty plot
 */
class FlavorMutation extends NearMutation {

    flavorReqs: number[];
    moreOrEqual: number;

    /**
     * Constructor for a FlavorMutation
     * @param mutationChance The chance of the mutation occuring
     * @param mutatedBerry The mutated BerryType
     * @param flavorReqs The flavor requirements for the mutation to occur
     * @param moreOrEqual Whether we want at least the flavorReqs, or exactly. Set to 0 for more (default), Set to 1 for exact.
     */
    constructor(mutationChance: number, mutatedBerry: BerryType, flavorReqs: number[], moreOrEqual = 0, hint?: string, unlockReq?: (() => boolean)) {
        super(mutationChance, mutatedBerry, hint, unlockReq);
        this.flavorReqs = flavorReqs;
        this.moreOrEqual = moreOrEqual;
    }

    /**
     * Determines if the plots near fit the requirements
     * @param plots The list of nearby plots
     */
    plotsFitRequirements(plots: number[]) {
        const nearFlavors = [0, 0, 0, 0, 0];
        for (let i = 0;i < plots.length;i++) {
            const plot = App.game.farming.plotList[plots[i]];
            if (!plot.isUnlocked) {
                continue;
            }
            if (plot.isEmpty()) {
                continue;
            }
            if (plot.stage() === PlotStage.Seed) {
                continue;
            }
            const berryFlavors = App.game.farming.berryData[plot.berry].flavors.map(x => x.value);
            for (let j = 0;j < 5;j++) {
                nearFlavors[j] += berryFlavors[j];
            }
        }

        if (this.moreOrEqual) {
            return this.flavorReqs === nearFlavors;
        } else {
            return this.flavorReqs.every( (value, idx) => value <= nearFlavors[idx]);
        }
    }

}
