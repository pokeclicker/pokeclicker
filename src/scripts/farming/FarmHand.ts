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
enum FarmHandBerryType {
    'Random' = -3,
    'Replant' = -2,
}

const FarmHandBerryTypes = {
    ...FarmHandBerryType,
    ...BerryType,
};
type FarmHandBerryTypes = (typeof FarmHandBerryTypes)[keyof typeof FarmHandBerryTypes];

class FarmHand {
    // Maximum Efficiency value
    public maxEfficiency = 50;
    // Negative value so they are charged on the first tick and work on the first tick
    public workTicks = -GameConstants.TICK_TIME;
    public costTicks = -GameConstants.TICK_TIME;
    // When to charge the player whatever the cost is, when to work
    public workTick;
    public costTick = GameConstants.HOUR;

    public cost = new Amount(+0, GameConstants.Currency.farmPoint);
    public trainerSprite = 0;
    public focus: KnockoutObservable<FarmHandBerryTypes> = ko.observable(BerryType.None);
    public shouldHarvest: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
    public energy: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });
    public hired: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
    // public level: number;
    // public experience: number;

    constructor(
        public name: string,
        public maxEnergy: number, // 10 - 100
        public efficiency: number, // 1 - 50?
        public speed: FarmHandSpeeds,
        public accuracy: number, // 0 - 10 (80% - 100%)
        cost: number, // 0 - 10? (can go higher if needed)
        public unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        SeededRand.seed(parseInt(this.name, 36));
        this.trainerSprite = SeededRand.intBetween(0, Profile.MAX_TRAINER - 1);
        // Negative value so they are charged on the first tick and work on the first tick
        this.workTicks = -GameConstants.TICK_TIME;
        this.costTicks = -GameConstants.TICK_TIME;
        // Set initial energy to maximum energy
        this.energy(this.maxEnergy);
        // Calculate how much to charge the player in farm points
        this.cost = new Amount(+Math.pow(100, 1 + cost * 0.08).toPrecision(2), GameConstants.Currency.farmPoint);
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

    hire(): void {
        // Negative value so they are charged on the first tick and work on the first tick
        this.workTicks = -GameConstants.TICK_TIME;
        this.costTicks = -GameConstants.TICK_TIME;

        // Check the player has enough Farm Points to hire this Farm Hand
        if (!App.game.wallet.hasAmount(this.cost)) {
            Notifier.notify({
                title: `Farm Hand ${this.name}`,
                message: `You don't have enough Farm Points to hire me..\nCost: ${this.cost.amount}`,
                type: NotificationConstants.NotificationOption.warning,
                timeout: 30 * GameConstants.SECOND,
            });
            return;
        }
        // Farm hand is hired
        this.hired(true);
        Notifier.notify({
            title: `Farm Hand ${this.name}`,
            message: 'Thanks for hiring me,\nI won\'t let you down!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 30 * GameConstants.SECOND,
        });
    }

    fire(): void {
        Notifier.notify({
            title: `Farm Hand ${this.name}`,
            message: 'Thanks for the work,\nLet me know when you\'re hiring again!',
            type: NotificationConstants.NotificationOption.info,
            timeout: 30 * GameConstants.SECOND,
        });
        this.hired(false);
        return;
    }

    tick(): void {
        if (!this.hired()) {
            return;
        }
        // Charge player when cost tick reached
        this.costTicks += GameConstants.TICK_TIME;
        if (this.costTicks % this.costTick < GameConstants.TICK_TIME && this.hired()) {
            this.costTicks = 0;
            this.charge();
        }
        // Work when work ticks reached
        this.workTicks += GameConstants.TICK_TIME;
        if (this.workTicks % this.workTick < GameConstants.TICK_TIME && this.hired()) {
            this.workTicks = 0;
            this.work();
        }
    }

    work(): void {
        // Out of energy cannot work right now..
        if (!this.energy()) {
            GameHelper.incrementObservable(this.energy, 1);
            return;
        }

        // flip this if they worked, otherwise restore energy points
        let worked = false;
        let workTimes = this.efficiency;

        // Harvesting berries
        let readyPlotIndex;
        do {
            readyPlotIndex = App.game.farming.plotList.findIndex(p => p.isUnlocked && p.berry !== BerryType.None && p.stage() >= PlotStage.Berry);
            if (readyPlotIndex >= 0 && workTimes > 0) {
                const berry = App.game.farming.plotList[readyPlotIndex].berry;
                App.game.farming.harvest(readyPlotIndex);
                workTimes--;
                worked = true;
                if (this.focus() == FarmHandBerryTypes.Replant) {
                    App.game.farming.plant(readyPlotIndex, berry);
                    workTimes--;
                    worked = true;
                }
            }
        } while (readyPlotIndex >= 0 && workTimes > 0);

        // Planting berries
        let emptyPlotIndex;
        do {
            // If they don't want to plant berries, don't do anything here
            if (this.focus() == FarmHandBerryTypes.None || this.focus() == FarmHandBerryTypes.Replant) {
                break;
            }
            // Plant the expected berry, or a random berry
            let berry = this.focus() != FarmHandBerryTypes.Random ? this.focus() : Rand.fromEnum(BerryType);
            berry = berry < 0 ? BerryType.Cheri : berry;
            // Find empty plots
            emptyPlotIndex = App.game.farming.plotList.findIndex(p => p.isUnlocked && p.berry == BerryType.None);
            // Plant the berry
            if (emptyPlotIndex >= 0 && workTimes > 0) {
                App.game.farming.plant(emptyPlotIndex, berry as BerryType);
                workTimes--;
                worked = true;
            }
        } while (emptyPlotIndex >= 0 && workTimes > 0);

        if (!worked) {
            GameHelper.incrementObservable(this.energy, 1);
        } else {
            GameHelper.incrementObservable(this.energy, -1);
        }
    }

    charge(): void {
        // Player cannot afford to pay for this hour
        if (!App.game.wallet.hasAmount(this.cost)) {
            Notifier.notify({
                title: `Farm Hand ${this.name}`,
                message: `It looks like you are a little short on Farm Points right now..\nLet me know when you're hiring again!\nCost: ${this.cost.amount}`,
                type: NotificationConstants.NotificationOption.danger,
                timeout: GameConstants.MINUTE,
            });
            this.hired(false);
            return;
        }
        // Charge the player for the hour
        Notifier.notify({
            title: `Farm Hand ${this.name}`,
            message: `Here's your bill for the hour!\nCost: ${this.cost.amount}`,
            type: NotificationConstants.NotificationOption.info,
            timeout: 30 * GameConstants.SECOND,
        });
        App.game.wallet.loseAmount(this.cost);
    }

    toJSON(): Record<string, any> {
        return ko.toJS(this);
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }
        this.focus(json.focus);
        this.shouldHarvest(json.shouldHarvest);
        this.workTicks = json.workTicks;
        this.costTicks = json.costTicks;
        this.energy(json.energy);
        this.hired(json.hired);
    }
}

class FarmHands {
    public static list: FarmHand[] = [];

    public static add(farmHand: FarmHand) {
        this.list.push(farmHand);
    }

    public hired: string[] = [];
    public available: KnockoutComputed<FarmHand[]>;

    constructor() {
        this.available = ko.pureComputed(() => FarmHands.list.filter(f => f.isUnlocked()));
    }

    public isUnlocked() {
        return player.highestRegion() >= GameConstants.Region.hoenn;
    }

    public tick() {
        // run game tick for all hired farmhands
        FarmHands.list.forEach(f => f.hired() && f.tick());
    }

    public toJSON(): Record<string, any>[] {
        return FarmHands.list.map(f => f.toJSON());
    }

    public fromJSON(json: Array<any>): void {
        if (!json || !json.length) {
            return;
        }

        FarmHands.list.forEach(f => {
            const data = json?.find(_f => _f.name == f.name);
            if (data) {
                f.fromJSON(data);
            }
        });
    }
}

FarmHands.add(new FarmHand('Jake', 10, 1, FarmHandSpeeds.SnailPaced, 1, 1));
FarmHands.add(new FarmHand('Paul', 15, 3, FarmHandSpeeds.Slowest, 1, 3));
FarmHands.add(new FarmHand('Fred', 100, 50, FarmHandSpeeds.Fastest, 10, 12));
