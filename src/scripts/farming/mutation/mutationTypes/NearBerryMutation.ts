/// <reference path="./NearMutation.ts" />

/**
 * Mutation that requires specific Berry plants near an empty plot
 */
class NearBerryMutation extends NearMutation {

    berryReqs: MutationReqInterface[];

    constructor(mutationChance: number, mutatedBerry: BerryType, berryReqs: MutationReqInterface[]) {
        super(mutationChance, mutatedBerry);
        this.berryReqs = berryReqs;
    }
    
    /**
     * Determines if the plots near fit the requirements
     * @param plots The list of nearby plots
     */
    plotsFitRequirements(plots: number[]) {
        return this.berryReqs.every(function(req) {
            return plots.some(function(plot) {
                return this.checkRequirement(plot,req);
            }, this);
        }, this);
    }

}
