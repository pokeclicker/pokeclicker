const HatcheryHelperSkills = [
    'energy',
    'efficiency',
    'accuracy',
    'cost',
];

class HatcheryHelper {
    public trainerSprite = 0;
    public hired: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
    public tooltip: KnockoutComputed<string>;
    public sortOption: KnockoutObservable<SortOptions> = ko.observable(SortOptions.id).extend({ numeric: 0 });
    public sortDirection: KnockoutObservable<boolean> = ko.observable(false).extend({ boolean: null });
    // public level: number;
    // public experience: number;

    constructor(
        public name: string,
        public cost: Amount,
        public stepEfficiency: number, // 1 - 200
        public attackEfficiency: number,
        public unlockRequirement?: Requirement | MultiRequirement | OneFromManyRequirement
    ) {
        SeededRand.seed(parseInt(this.name, 36));
        this.trainerSprite = SeededRand.intBetween(0, Profile.MAX_TRAINER - 1);

        this.tooltip = ko.pureComputed(() => `<strong>${this.name}</strong><br/>
            Cost: <img src="assets/images/currency/${GameConstants.Currency[this.cost.currency]}.svg" width="20px">&nbsp;${(this.cost.amount).toLocaleString('en-US')}/hatch<br/>
            Step Efficiency: ${this.stepEfficiency}%<br/>
            Attack Efficiency: ${this.attackEfficiency}%`
        );
    }

    isUnlocked(): boolean {
        return this.unlockRequirement?.isCompleted() ?? true;
    }

    hire(): void {

        // Check the player has enough Currency to hire this Hatchery Helper
        if (!App.game.wallet.hasAmount(this.cost)) {
            Notifier.notify({
                title: `[HATCHERY HELPER] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
                message: `You don't have enough ${GameConstants.camelCaseToString(GameConstants.Currency[this.cost.currency])} to hire me..\nCost: <img src="./assets/images/currency/${GameConstants.Currency[this.cost.currency]}.svg" height="24px"/> ${this.cost.amount.toLocaleString('en-US')}`,
                type: NotificationConstants.NotificationOption.warning,
                timeout: 30 * GameConstants.SECOND,
            });
            return;
        }
        // Hatchery helper is hired
        this.hired(true);
        Notifier.notify({
            title: `[HATCHERY HELPER] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
            message: 'Thanks for hiring me,\nI won\'t let you down!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 30 * GameConstants.SECOND,
        });
    }

    fire(): void {
        Notifier.notify({
            title: `[HATCHERY HELPER] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
            message: 'Thanks for the work,\nLet me know when you\'re hiring again!',
            type: NotificationConstants.NotificationOption.info,
            timeout: 30 * GameConstants.SECOND,
        });
        this.hired(false);
        return;
    }

    charge(): void {
        // Charge the player if they can afford it, otherwise notify that they cannot
        if (!App.game.wallet.loseAmount(this.cost)) {
            Notifier.notify({
                title: `[HATCHERY HELPER] <img src="assets/images/profile/trainer-${this.trainerSprite}.png" height="24px" class="pixelated"/> ${this.name}`,
                message: `It looks like you are a little short on ${GameConstants.camelCaseToString(GameConstants.Currency[this.cost.currency])} right now..\nLet me know when you're hiring again!\nCost: <img src="./assets/images/currency/${GameConstants.Currency[this.cost.currency]}.svg" height="24px"/> ${this.cost.amount.toLocaleString('en-US')}`,
                type: NotificationConstants.NotificationOption.danger,
                timeout: 30 * GameConstants.MINUTE,
            });
            this.hired(false);
            return;
        }
    }

    toJSON(): Record<string, any> {
        return ko.toJS(this);
    }

    fromJSON(json: Record<string, any>): void {
        if (!json) {
            return;
        }
        this.hired(json.hired || false);
        this.sortOption(json.sortOption || 0);
        this.sortDirection(json.sortDirection || false);
    }
}

class HatcheryHelpers {
    public static list: HatcheryHelper[] = [];

    public static add(helper: HatcheryHelper) {
        this.list.push(helper);
    }

    public MAX_HIRES = 3;
    public available: KnockoutComputed<HatcheryHelper[]>;
    public hired: KnockoutComputed<HatcheryHelper[]>;
    public canHire: KnockoutComputed<boolean>;
    public requirement = new HatchRequirement(100);

    constructor(public hatchery: Breeding) {
        this.available = ko.pureComputed(() => HatcheryHelpers.list.filter(f => f.isUnlocked()));
        this.hired = ko.pureComputed(() => HatcheryHelpers.list.filter(f => f.hired()));
        this.canHire =  ko.pureComputed(() => this.hired().length < Math.min(this.MAX_HIRES, this.hatchery.eggSlots));
    }

    public isUnlocked() {
        return this.requirement.isCompleted();
    }

    public addSteps(amount: number, multiplier: Multiplier): void {
        // Add steps and attack based on efficiency
        this.hired().forEach((helper, index) => {
            const steps = Math.max(1, Math.round(amount * (helper.stepEfficiency / 100)));
            const egg = this.hatchery.eggList[index]();
            egg.addSteps(steps, multiplier);
            if (egg.progress() >= 100 || egg.isNone()) {
                egg.hatch(helper.attackEfficiency);
                this.hatchery.eggList[index](new Egg());
                const pokemon = App.game.party.caughtPokemon
                    .sort(PartyController.compareBy(helper.sortOption(), helper.sortDirection()))
                    .find(p => BreedingController.visible(p)());
                if (pokemon) {
                    this.hatchery.gainPokemonEgg(pokemon);
                    // Charge the player when we put a pokemon in the hatchery
                    helper.charge();
                }
            }
        });
    }

    public toJSON(): Record<string, any>[] {
        return this.available().map(f => f.toJSON());
    }

    public fromJSON(json: Array<any>): void {
        if (!json || !json.length) {
            return;
        }

        HatcheryHelpers.list.forEach(f => {
            const data = json?.find(_f => _f.name == f.name);
            if (data) {
                f.fromJSON(data);
            }
        });
    }
}

// Note: Gender-neutral names used as the trainer sprite is (seeded) randomly generated
HatcheryHelpers.add(new HatcheryHelper('Sam', new Amount(1000, GameConstants.Currency.money), 10, 10, new HatchRequirement(100)));
HatcheryHelpers.add(new HatcheryHelper('Blake', new Amount(10000, GameConstants.Currency.money), 10, 15, new HatchRequirement(500)));
HatcheryHelpers.add(new HatcheryHelper('Parker', new Amount(1000, GameConstants.Currency.dungeonToken), 15, 25, new HatchRequirement(1000)));
HatcheryHelpers.add(new HatcheryHelper('Dakota', new Amount(10000, GameConstants.Currency.dungeonToken), 50, 50, new ItemOwnedRequirement('HatcheryHelperDakota')));
HatcheryHelpers.add(new HatcheryHelper('Justice', new Amount(10, GameConstants.Currency.questPoint), 100, 50, new QuestRequirement(200)));
HatcheryHelpers.add(new HatcheryHelper('Carey', new Amount(20, GameConstants.Currency.questPoint), 50, 125, new ItemOwnedRequirement('HatcheryHelperCarey')));
HatcheryHelpers.add(new HatcheryHelper('Aiden', new Amount(5, GameConstants.Currency.diamond), 100, 100, new UndergroundLayersMinedRequirement(100)));
HatcheryHelpers.add(new HatcheryHelper('Kris', new Amount(10, GameConstants.Currency.diamond), 150, 100, new ItemOwnedRequirement('HatcheryHelperKris')));
HatcheryHelpers.add(new HatcheryHelper('Noel', new Amount(50, GameConstants.Currency.battlePoint), 100, 200, new ItemOwnedRequirement('HatcheryHelperNoel')));
