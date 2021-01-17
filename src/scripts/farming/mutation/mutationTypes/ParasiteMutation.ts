/// <reference path="./EvolveNearBerryMutation.ts" />

/**
 * Parasite Mutation
 */
class ParasiteMutation extends EvolveNearBerryMutation {

    constructor(mutationChance: number, berry: BerryType) {
        super(mutationChance, berry, undefined, [berry], { showHint: false });
    }

    /**
     * Determines which plots can mutate. Excludes the parasite berry
     * @return The plot indices that can mutate
     */
    getMutationPlots(): number[] {
        const plots = super.getMutationPlots();

        return plots.filter((idx) => {
            return App.game.farming.plotList[idx].berry !== this.mutatedBerry;
        });
    }

}
