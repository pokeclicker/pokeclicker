abstract class Mutation {

    mutationChance: number;
    notified: boolean;

    constructor(mutationChance: number) {
        this.mutationChance = mutationChance;
        this.notified = false;
    }

    /**
     * Determines whether this mutation can occur based on the status of the farm plots
     */
    checkRequirements(): boolean {
        return false;
    }

    /**
     * Checks an individual plot for a MutationRequirement
     */
    checkRequirement(index: number, mutationRequirement: MutationReqInterface) {
        const plot = App.game.farming.plotList[index];
        if (!plot.isUnlocked) { return false; }
        if (plot.berry !== mutationRequirement.berryType) { return false; }
        if (mutationRequirement.berryStage !== PlotStage.Seed && plot.stage !== mutationRequirement.berryStage) { return false; }
        return true;
    }

    /**
     * Update tag for mutations. Returns true if this mutation will occur
     */
    mutate(): boolean {
        if (!this.checkRequirements()) { return false; }
        let willMutate =  Math.random() < this.mutationChance * App.game.farming.getMutationMultiplier();
        if (!willMutate) { return false; }
        
        this.handleMutation();

        return true;
    }

    /**
     * Handles updating the farm with the mutation
     */
    handleMutation(): void {

    }
}
