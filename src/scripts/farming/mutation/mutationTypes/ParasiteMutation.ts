/// <reference path="../Mutation.ts" />

/**
 * Mutation that will take over specific plants near it
 * Specifically, the parasite plant must be in the Berry Stage, and the hosts must be in the Sprout stage or above.
 * If no host is defined, then any plant type can become a host, other than the berry type the host will mutate into, as well as the parasite type.
 */
class ParasiteMutation extends Mutation {

    parasite: BerryType;
    host: BerryType;

    /**
     * Constructor for the ParasiteMutation
     * @param mutationChance Chance this mutation occurs
     * @param mutatedBerry The resulting berry plant
     * @param parasite The berry plant that will cause the mutation
     * @param host The berry plant types that will be turned into the mutatedBerry. If not set, will mutate any berry plants near it (besides for the mutatedBerry and itself)
     */
    constructor(mutationChance: number, mutatedBerry: BerryType, parasite: BerryType, host?: BerryType, hint?: string, unlockReq?: (() => boolean)) {
        super(mutationChance, mutatedBerry, hint, unlockReq);
        this.parasite = parasite;
        this.host = host;
    }

    /**
     * Determines whether this mutation can occur based on the status of the farm plots.
     * Returns plot indices of host plants that can mutate
     */
    checkRequirements(): number[] {
        const hosts = new Set<number>();
        for (let i = 0;i < App.game.farming.plotList.length;i++) {
            const plot = App.game.farming.plotList[i];
            if (!plot.isUnlocked) {
                continue;
            }
            if (plot.isEmpty()) {
                continue;
            }
            if (plot.berry !== this.parasite) {
                continue;
            }
            if (plot.stage() !== PlotStage.Berry) {
                continue;
            }

            const newHosts = Plot.findNearPlots(i, function(i) {
                const plot = App.game.farming.plotList[i];
                if (!plot.isUnlocked) {
                    return false;
                }
                if (plot.isEmpty()) {
                    return false;
                }
                if (plot.stage() === PlotStage.Seed) {
                    return false;
                }
                if (this.host && plot.berry !== this.host) {
                    return false;
                }
                return true;
            });

            newHosts.forEach(function(x) {
                hosts.add(x);
            });

        }
        return Array.from(hosts);
    }

    /**
     * Handles updating the farm with the mutation
     * @param index The plot index to mutate
     */
    handleMutation(index: number): void {
        const plot = App.game.farming.plotList[index];
        plot.berry = this.mutatedBerry;
        plot.age = App.game.farming.berryData[this.mutatedBerry].growthTime[2];
        plot.notifications = [];
    }
}
