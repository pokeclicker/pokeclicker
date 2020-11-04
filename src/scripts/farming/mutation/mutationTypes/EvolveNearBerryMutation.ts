/// <reference path="./EvolveNearMutation.ts" />

/**
 * Mutation that requires specific Berry plants near a Berry plot.
 * The required Berry plants must be in the Berry stage for mutations to occur.
 */
class EvolveNearBerryMutation extends EvolveNearMutation {

    berryReqs: BerryType[];

    constructor(mutationChance: number, mutatedBerry: BerryType, originalBerry: BerryType, berryReqs: BerryType[], options?: MutationOptions) {
        super(mutationChance, mutatedBerry, originalBerry, options);
        this.berryReqs = berryReqs;
    }

    /**
     * Determines if the plots near fit the requirements
     * @param plots The list of nearby plots
     */
    nearPlotsFitRequirements(plots: number[]) {
        return this.berryReqs.every((req) => {
            return plots.some((plot) => {
                return this.checkRequirement(plot,req);
            });
        });
    }

    /**
     * Checks an individual plot for a Berry requirement
     */
    checkRequirement(index: number, berryReq: BerryType) {
        const plot = App.game.farming.plotList[index];
        if (!plot.isUnlocked) {
            return false;
        }
        if (plot.berry !== berryReq) {
            return false;
        }
        if (plot.stage() !== PlotStage.Berry) {
            return false;
        }
        return true;
    }

    get hint(): string {
        if (super.hint) {
            return super.hint;
        }

        const str = [];
        str.push('I\'ve heard that growing');
        str.push(`${BerryType[this.originalBerry]} Berries`);

        if (this.berryReqs.length === 0) {
            return `I've heard that ${BerryType[this.originalBerry]} Berries will spontaneously change!`;
        }
        if (this.berryReqs.length === 1) {
            str.push(`near ${BerryType[this.berryReqs[0]]} Berries`);
        }
        if (this.berryReqs.length === 2) {
            str.push(`near ${BerryType[this.berryReqs[0]]} and ${BerryType[this.berryReqs[1]]} Berries`);
        }
        if (this.berryReqs.length === 3) {
            str.push(`near ${BerryType[this.berryReqs[0]]}, ${BerryType[this.berryReqs[1]]}, and ${BerryType[this.berryReqs[2]]} Berries`);
        }
        if (this.berryReqs.length === 4) {
            str.push(`near ${BerryType[this.berryReqs[0]]}, ${BerryType[this.berryReqs[1]]}, ${BerryType[this.berryReqs[2]]}, and ${BerryType[this.berryReqs[3]]} Berries`);
        }
        str.push('will cause it to change!');
        return str.join(' ');
    }

    /**
     * Determines whether the player can even cause this mutation
     */
    get unlocked(): boolean {
        // Check for Berry requirements
        if (!this.berryReqs.every(req => App.game.farming.unlockedBerries[req]())) {
            return false;
        }
        return super.unlocked;
    }

}
