class Aura {

    constructor(
        public auraType: AuraType,
        public auraMultipliers: number[]
    ) { }

    /**
     * Handles applying the berry's Aura to its neighbors
     */
    emitAura(index: number): void {
        const plot = App.game.farming.plotList[index];
        if (plot.stage() < PlotStage.Taller) {
            return;
        }
        const berryAura = this.auraMultipliers[plot.stage() - 2];
        const lumBoost = plot._auras[AuraType.Boost]();
        const multiplier = (berryAura >= 1) ? (berryAura * lumBoost) : (berryAura / lumBoost);
        const plots = Plot.findNearPlots(index);
        switch (this.auraType) {
            // External Auras
            case AuraType.Attract:
            case AuraType.Egg:
            case AuraType.Shiny:
            case AuraType.Roaming:
                const currentMultiplier = App.game.farming.externalAuras[this.auraType]();
                App.game.farming.externalAuras[this.auraType](currentMultiplier * multiplier);
                break;
            // Auras that are the max magnitude of surroundings
            case AuraType.Death:
            case AuraType.Boost:
                for (const nearIdx of plots) {
                    const nearPlot = App.game.farming.plotList[nearIdx];
                    const currentMultiplier = nearPlot._auras[this.auraType]();
                    nearPlot.setAura(this.auraType, Math.max(currentMultiplier, multiplier));
                }
                break;
            // Default auras are multiplicative
            default:
                for (const nearIdx of plots) {
                    const nearPlot = App.game.farming.plotList[nearIdx];
                    nearPlot.addAura(this.auraType, multiplier);
                }
                break;
        }
    }

    getAuraValue(stage: PlotStage): number {
        if (!stage || stage < PlotStage.Taller) {
            return 1;
        }
        return this.auraMultipliers[stage - 2];
    }

}
