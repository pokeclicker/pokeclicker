/// <reference path="./NearMutation.ts" />

/**
 * Mutation that requires specific Berry plants near an empty plot (and only those)
 */
class StrictNearMutation extends NearBerryMutation {

    allowDuplicate: boolean;

    constructor(mutationChance: number, mutatedBerry: BerryType, berryReqs: MutationReqInterface[], allowDuplicate = true, hint?: string, unlockReq?: (() => boolean), showHint = true) {
        super(mutationChance, mutatedBerry, berryReqs, hint, unlockReq, showHint);
        this.allowDuplicate = allowDuplicate;
    }

    /**
     * Determines if the plots near fit the requirements
     * @param plots The list of nearby plots
     */
    plotsFitRequirements(plots: number[]) {
        const reqs = Array<boolean>(this.berryReqs.length).fill(false);
        for (const idx of plots) {
            const plot = App.game.farming.plotList[idx];

            if (!plot.isUnlocked) {
                continue;
            }
            if (plot.isEmpty()) {
                continue;
            }
            let fitRequirement = false;
            for (let i = 0;i < this.berryReqs.length;i++) {
                if (this.checkRequirement(idx, this.berryReqs[i])) {
                    if (reqs[i] && !this.allowDuplicate) {
                        return false;
                    }
                    reqs[i] = true;
                    fitRequirement = true;
                    break;
                }
            }
            if (!fitRequirement) {
                return false;
            }
        }
        return reqs.every(req => req);
    }

    checkUnlockReq(): boolean {
        return this.berryReqs.every(function(req) {
            return App.game.farming.unlockedBerries[req.berryType]();
        });
    }

    getHint(): string {
        if (this.berryReqs.length === 1) {
            return `I\'ve heard that growing ${BerryType[this.berryReqs[0].berryType]} Berries by themselves can spread a new Berry into nearby empty plots!`;
        }
        if (this.berryReqs.length === 2) {
            return `I\'ve heard that growing ${BerryType[this.berryReqs[0].berryType]} and ${BerryType[this.berryReqs[1].berryType]} Berries near each other exclusively will produce something interesting!`;
        }
        if (this.berryReqs.length === 3) {
            return `I\'ve heard that growing ${BerryType[this.berryReqs[0].berryType]}, ${BerryType[this.berryReqs[1].berryType]}, and ${BerryType[this.berryReqs[2].berryType]} Berries near each other exclusively will produce something interesting!`;
        }
        if (this.berryReqs.length === 4) {
            return `I\'ve heard that growing ${BerryType[this.berryReqs[0].berryType]}, ${BerryType[this.berryReqs[1].berryType]},  ${BerryType[this.berryReqs[2].berryType]}, and ${BerryType[this.berryReqs[3].berryType]} Berries near each other exclusively will produce something interesting!`;
        }
        return super.getHint();
    }

}
