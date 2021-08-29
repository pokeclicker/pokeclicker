const FarmHandSkills = [
    'energy',
    'efficiency',
    'accuracy',
    'cost',
];

enum FarmHandSpeeds {
    Fastest,
    Faster,
    Fast,
    AboveAverage,
    Average,
    BelowAverage,
    Slow,
    Slower,
    Slowest,
    SnailPaced,
    Lazy,
}

/*
TODO:
Make in game menu for hiring/firing/settings
Work in levels/experience somehow
Ability to hire multiple people?
Use accuracy to decide if they plant the right berry or plant a berry at all (still use up energy?)
Use accuracy to decide if they harvest a berry by accident? (still use up energy?)
*/
class FarmHand {
    private maxEfficiency = 10;
    // Negative value so they are charged on the first tick and work on the first tick
    public workTicks = -GameConstants.TICK_TIME;
    public costTicks = -GameConstants.TICK_TIME;
    // When to charge the player whatever the cost is
    public workTick;
    public costTick = GameConstants.HOUR;

    public focus: KnockoutObservable<BerryType> = ko.observable(BerryType.Cheri);
    public shouldHarvest: KnockoutObservable<boolean> = ko.observable(true).extend({ boolean: null });
    public level: number;
    public experience: number;
    public energy = 0;

    constructor(
        public name: string,
        public maxEnergy: number, // 10 - 100
        public efficiency: number, // 1 - 50?
        public speed: FarmHandSpeeds,
        public accuracy: number, // 0 - 10 (80% - 100%)
        public cost: number, // 0 - 10
        public unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        this.workTicks = -GameConstants.TICK_TIME;
        this.costTicks = -GameConstants.TICK_TIME;
        // Set initial energy to maximum energy
        this.energy = this.maxEnergy;
        // Calculate how much to charge the player in farm points
        this.cost = +Math.pow(100, 1 + this.cost * 0.08).toPrecision(2);
        // Calculate how often they work
        this.workTick = this.calcWorkTick(this.speed);
    }

    private calcWorkTick(speed: FarmHandSpeeds): number {
        speed = ((speed + 1) * 0.03) + 1;
        let time = Math.pow(GameConstants.MINUTE, speed);
        time -= time > 5 * GameConstants.MINUTE ? time % GameConstants.MINUTE : time % (30 * GameConstants.SECOND);
        return time;
    }

    isUnlocked(): boolean {
        return this.unlockRequirement?.isCompleted() ?? true;
    }

    tick(): void {
        // Work when work ticks reached
        this.workTicks += GameConstants.TICK_TIME;
        if (this.workTicks % this.workTick < GameConstants.TICK_TIME) {
            this.work();
        }
        // Charge player when cost tick reached
        this.costTicks += GameConstants.TICK_TIME;
        if (this.costTicks % this.costTick < GameConstants.TICK_TIME) {
            this.costTicks = 0;
        }
    }

    work(): void {
        // Out of energy cannot work right now..
        if (!this.energy) {
            this.energy++;
            return;
        }

        // flip this is they worked, otherwise restore energy points
        let worked = false;
        let workTimes = this.efficiency;
        let readyPlotIndex;
        do {
            readyPlotIndex = App.game.farming.plotList.findIndex(p => p.isUnlocked && p.berry !== BerryType.None && p.stage() >= PlotStage.Berry);
            if (readyPlotIndex >= 0 && workTimes) {
                App.game.farming.harvest(readyPlotIndex);
                workTimes--;
                worked = true;
            }
        } while (readyPlotIndex >= 0 && workTimes);
        let emptyPlotIndex;
        do {
            emptyPlotIndex = App.game.farming.plotList.findIndex(p => p.isUnlocked && p.berry == BerryType.None);
            if (emptyPlotIndex && workTimes) {
                App.game.farming.plant(emptyPlotIndex, this.focus());
                workTimes--;
                worked = true;
            }
        } while (emptyPlotIndex >= 0 && workTimes);

        if (!worked) {
            this.energy++;
        } else {
            this.energy--;
        }
    }
}

const FarmHands: FarmHand[] = [
    new FarmHand('Jake', 10, 1, FarmHandSpeeds.SnailPaced, 1, 1),
    new FarmHand('Paul', 15, 3, FarmHandSpeeds.Slowest, 1, 3),
    new FarmHand('Fred', 100, 10, FarmHandSpeeds.Fastest, 10, 10),
];
