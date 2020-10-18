class Aura {

    auraType: AuraType;
    auraMultipliers: number[];

    constructor(auraType: AuraType, auraMultipliers: number[]) {
        this.auraType = auraType;
        this.auraMultipliers = auraMultipliers;
    }

    /**
     * Handles applying the berry's Aura to its neighbors
     */
    applyAura(index: number): void {
        const plot = App.game.farming.plotList[index];
        console.log(index, plot, plot.stage());
        if (plot.stage() < PlotStage.Taller) {
            return;
        }
        console.log(this);
        const multiplier = this.auraMultipliers[plot.stage() - 2];
        switch (this.auraType) {
            case AuraType.Attract:
            case AuraType.Egg:
                const currentMultiplier = App.game.farming.externalAuras[this.auraType]();
                App.game.farming.externalAuras[this.auraType](currentMultiplier * multiplier);
                break;
            default:
                const plots = Plot.findNearPlots(index);
                console.log(plots);
                for (const nearIdx of plots) {
                    const nearPlot = App.game.farming.plotList[nearIdx];
                    nearPlot.addAura(this.auraType, multiplier);
                }
                break;
        }
    }

}
