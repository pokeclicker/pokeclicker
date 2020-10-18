/// <reference path="./NearMutation.ts" />

/**
 * Mutation that requires an external requirement to evolve a Berry plant
 */
class EvolutionMutation extends Mutation {

    originalBerry: BerryType;
    externalReq: (() => boolean);

    constructor(mutationChance: number, mutatedBerry: BerryType, originalBerry: BerryType, externalReq: (() => boolean), hint?: string, unlockReq?: (() => boolean), showHint = true) {
        super(mutationChance, mutatedBerry, hint, unlockReq, showHint);
        this.originalBerry = originalBerry;
        this.externalReq = externalReq;
    }

    /**
     * Determines whether this mutation can occur based on the status of the farm plots. Returns plot indices that fit requirements
     */
    checkRequirements(): number[] {
        if (!this.externalReq()) {
            return [];
        }
        const mutatePlots = [];
        for (let i = 0;i < App.game.farming.plotList.length;i++) {
            const plot = App.game.farming.plotList[i];
            if (!plot.isUnlocked) {
                continue;
            }
            if (plot.isEmpty()) {
                continue;
            }
            if (plot.berry !== this.originalBerry) {
                continue;
            }
            if (plot.stage() < PlotStage.Taller) {
                continue;
            }
            mutatePlots.push(i);
        }
        return mutatePlots;
    }

    /**
     * Handles updating the farm with the mutation
     * @param index The plot index to mutate
     */
    handleMutation(index: number): void {
        const plot = App.game.farming.plotList[index];
        const currentStage = plot.stage();
        let newAge = 0;
        if (currentStage !== PlotStage.Seed) {
            newAge = App.game.farming.berryData[this.mutatedBerry].growthTime[currentStage - 1] + 1;
        }
        plot.berry = this.mutatedBerry;
        plot.age = newAge;
        plot.notifications = [];
    }

}
