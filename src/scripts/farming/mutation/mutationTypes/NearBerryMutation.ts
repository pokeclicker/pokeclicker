/// <reference path="./NearMutation.ts" />

/**
 * Mutation that requires specific Berry plants near an empty plot
 */
class NearBerryMutation extends NearMutation {

    berryReqs: MutationReqInterface[];

    constructor(mutationChance: number, mutatedBerry: BerryType, berryReqs: MutationReqInterface[], hint?: string, unlockReq?: (() => boolean), showHint = true) {
        super(mutationChance, mutatedBerry, hint, unlockReq, showHint);
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

    checkUnlockReq(): boolean {
        return this.berryReqs.every(function(req) {
            return App.game.farming.unlockedBerries[req.berryType]();
        });
    }

    getHint(): string {
        if (this.berryReqs.length === 1) {
            return `I\'ve heard that growing ${BerryType[this.berryReqs[0].berryType]} Berries can spread a new Berry into nearby empty plots!`;
        }
        if (this.berryReqs.length === 2) {
            return `I\'ve heard that growing ${BerryType[this.berryReqs[0].berryType]} and ${BerryType[this.berryReqs[1].berryType]} Berries near each other will produce something interesting!`;
        }
        if (this.berryReqs.length === 3) {
            return `I\'ve heard that growing ${BerryType[this.berryReqs[0].berryType]}, ${BerryType[this.berryReqs[1].berryType]}, and ${BerryType[this.berryReqs[2].berryType]} Berries near each other will produce something interesting!`;
        }
        return super.getHint();
    }

}
