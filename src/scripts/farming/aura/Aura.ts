class Aura {

    constructor(
        public auraType: AuraType,
        public auraMultipliers: number[]
    ) { }

    /**
     * Handles applying the berry's Aura to its neighbors
     */
    applyAura(index: number): void {
        const plot = App.game.farming.plotList[index];
        if (plot.stage() < PlotStage.Taller) {
            return;
        }
        const multiplier = this.auraMultipliers[plot.stage() - 2];
        switch (this.auraType) {
            case AuraType.Attract:
            case AuraType.Egg:
            case AuraType.Shiny:
                const currentMultiplier = App.game.farming.externalAuras[this.auraType]();
                App.game.farming.externalAuras[this.auraType](currentMultiplier * multiplier);
                break;
            default:
                const plots = Plot.findNearPlots(index);
                for (const nearIdx of plots) {
                    const nearPlot = App.game.farming.plotList[nearIdx];
                    nearPlot.addAura(this.auraType, multiplier);
                }
                break;
        }
    }

    getLabel(stage: PlotStage): string {
        if (!stage || stage < PlotStage.Taller) {
            return '';
        }
        return `${AuraType[this.auraType]}: ${this.auraMultipliers[stage - 2]}x`;
    }

}
