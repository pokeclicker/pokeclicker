/// <reference path="../Mutation.ts" />

/**
 * Mutation that requires specific conditions near an empty plot
 */
abstract class NearMutation extends Mutation {

    constructor(mutationChance: number, mutatedBerry: BerryType) {
        super(mutationChance, mutatedBerry);
    }

    /**
     * Determines whether this mutation can occur based on the status of the farm plots.
     * Returns plot indices that can mutate
     */
    checkRequirements(): number[] {
        const plots = [];
        for (let i = 0;i < App.game.farming.plotList.length;i++) {
            if (!App.game.farming.plotList[i].isUnlocked) {
                continue;
            }
            if (!App.game.farming.plotList[i].isEmpty()) {
                continue;
            }
            const nearPlots = this.findNearPlots(i);
            if (this.plotsFitRequirements(nearPlots)) {
                plots.push(i);
            }
        }
        return plots;
    }
    
    /**
     * Determines if the plots near fit the requirements
     * @param plots The list of nearby plots
     */
    abstract plotsFitRequirements(plots: number[]): boolean;

    /**
     * Handles updating the farm with the mutation
     * @param index The plot index to mutate
     */
    handleMutation(index: number): void {
        const plot = App.game.farming.plotList[index];
        plot.berry = this.mutatedBerry;
        plot.age = 0;
        plot.notifications = [];
    }
}
