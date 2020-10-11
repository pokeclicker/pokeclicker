/// <reference path="../Mutation.ts" />

/**
 * Mutation that requires specific Berry plants near an empty plot
 */
class NearMutation extends Mutation {

    berrytypes: MutationReqInterface[];

    constructor(mutationChance: number, berryTypes: MutationReqInterface[]) {
        super(mutationChance);
        this.berrytypes = berryTypes;
    }

    /**
     * Determines whether this mutation can occur based on the status of the farm plots
     */
    checkRequirements(): boolean {
        for (let i = 0;i < App.game.farming.plotList.length;i++) {
            if (!App.game.farming.plotList[i].isUnlocked) { continue; }
            
        }
        return false;
    }

    findNearPlots(index: number): number[] {
        let plots = [];

        plots = [ index - 6, index - 5, index - 4, index - 1, index + 2, index + 4, index + 5, index + 6 ];

        // Edge indices
        if (index < 5 || index > 19 || index % 5 == 0 || index % 5 == 4) {

        } else {

        }

        return plots;
    }

    /**
     * Handles updating the farm with the mutation
     */
    handleMutation(): void {

    }
}
