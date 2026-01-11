/// <reference path="./GrowMutation.ts" />

/**
 * Mutation to produce the Enigma Berry
 */
class EnigmaMutation extends GrowMutation {

    hintsSeen: KnockoutObservable<boolean>[];
    private lastIndex: KnockoutObservable<number>;

    constructor(mutationChance: number) {
        super(mutationChance, BerryType.Enigma, {
            unlockReq: function(): boolean {
                return EnigmaMutation.getReqs().every(req => App.game.farming.unlockedBerries[req]());
            },
        });

        this.hintsSeen = Array<boolean>(4).fill(false).map(val => ko.observable(val));
        this.lastIndex = ko.observable(null);
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
        SeededRand.seed(+player.trainerId);
        // Getting possible Berries
        // Only Gen 3 and 4 Berries so there isn't as big of a growth discrepancy (e.g. Cheri and Haban)
        let berryTypes = Farming.getGeneration(2).concat(Farming.getGeneration(3));
        // Remove parasite Berries, as having four sides for mutation requirements means parasite
        // mutations can make it difficult to have all four plants fully grown.
        // Also remove Babiri since they'll stop mutations
        berryTypes = berryTypes.filter(berry => {
            return ![BerryType.Occa, BerryType.Kebia, BerryType.Colbur, BerryType.Babiri].includes(berry);
        });
        return [...new Array(4)].map((_) => SeededRand.fromArray(berryTypes));
    }

    /**
     * Handles getting the hint for this mutation for the Kanto Berry Master
     */
    generateIndex(): void {
        if (this.lastIndex()) {
            return;
        }
        this.lastIndex(Rand.fromArray([...new Array(this.hintsSeen.length)].map((_, i) => i).filter(i => !this.hintsSeen[i]())));
    }

    resetIndex(): void {
        this.lastIndex(null);
    }

    get partialHint(): string {
        if (this.lastIndex() === null) {
            if (this.hintsSeen.every(s => s())) {
                return this.hint;
            }
            this.generateIndex();
            this.hintsSeen[this.lastIndex()](true);
        }
        return `There's a mysterious berry that requires ${this.getHint(this.lastIndex())}.`;
    }

    private getHint(idx: number) {
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

        return `a ${BerryType[EnigmaMutation.getReqs()[idx]]} Berry to the ${direction}`;
    }

    /**
     * Handles getting the full hint for the BerryDex
     */
    get hint(): string {
        const hints = [];
        const unlocked = App.game.farming.unlockedBerries[this.mutatedBerry]();
        this.hintsSeen.forEach((hintSeen, idx) => {
            if (!hintSeen() && !unlocked) {
                return false;
            }
            hints.push(this.getHint(idx));
        });

        let tempHint = `There's a mysterious berry that requires ${hints.join(', ').replace(/, ([\w\s]+)$/, ' and $1')}`;

        if (hints.length === 0) {
            tempHint += 'a specific configuration of Berries';
        }

        tempHint += (hints.length !== 4) ? '. However, there\'s still something missing...' : '.';

        return tempHint;
    }

    toJSON(): any {
        return {seen: this.hintsSeen.map(h => h()), last: this.lastIndex()};
    }

    fromJSON(hints: any): void {
        const hintsSeen = hints.seen;
        if (Array.isArray(hintsSeen)) {
            hintsSeen.forEach((value: boolean, index: number) => {
                if (value) {
                    this.hintSeen = true;
                }
                this.hintsSeen[index](value);
            });
        }
        if (hints.last !== null) {
            this.lastIndex(hints.last);
        }
    }

}
