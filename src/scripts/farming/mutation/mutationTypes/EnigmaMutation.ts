/// <reference path="./GrowMutation.ts" />

/**
 * Mutation to produce the Enigma Berry
 */
class EnigmaMutation extends GrowMutation {

    constructor(mutationChance: number) {
        super(mutationChance, BerryType.Enigma, {
            unlockReq: function(): boolean {
                if (App.game.discord.ID === null) {
                    return false;
                }
                return EnigmaMutation.getReqs().every(req => App.game.farming.unlockedBerries[req]());
            },
        });
    }

    /**
     * Determines which plots can mutate
     * @return The plot indices that can mutate
     */
    getMutationPlots(): number[] {
        const plots = super.getMutationPlots();

        const reqs = EnigmaMutation.getReqs();

        return plots.filter((idx) => {
            const nearPlots = Plot.findPlusPlots(idx);
            if (nearPlots.length !== 4) {
                return false;
            }
            return nearPlots.every((idx, n) => {
                const plot = App.game.farming.plotList[idx];
                if (!plot.isUnlocked) {
                    return false;
                }
                if (plot.isEmpty()) {
                    return false;
                }
                if (plot.stage() !== PlotStage.Berry) {
                    return false;
                }
                if (plot.berry !== reqs[n]) {
                    return false;
                }
                return true;
            });
        });
    }

    /**
     * Returns a list of 4 Berry types to cause the mutation
     */
    static getReqs(): BerryType[] {
        SeededRand.seed(+App.game.discord.ID());
        const berryTypes = Array.from({length: GameHelper.enumLength(BerryType) - 1}, (_, i) => i + 1);
        return [...new Array(4)].map((_) => SeededRand.fromArray(berryTypes));
    }

    /**
     * Handles getting the hint for this mutation for the Kanto Berry Master
     */
    get hint(): string {
        if (App.game.discord.ID === null) {
            return 'There is a Berry that requires a linked <u>Discord</u> account to appear...';
        }
        SeededRand.seedWithDate(new Date());

        const idx = Math.floor(SeededRand.next() * 4);

        let direction = '';
        switch (idx) {
            case 0:
                direction = 'north';
                break;
            case 1:
                direction = 'west';
                break;
            case 2:
                direction = 'east';
                break;
            case 3:
                direction = 'south';
        }

        return `There's a mysterious berry that requires a ${BerryType[EnigmaMutation.getReqs()[idx]]} Berry to the ${direction}.`;
    }

}
